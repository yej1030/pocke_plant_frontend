import React, { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);
	const [comments, setComments] = useState([]);

	// 게시글 추가
	const addPost = (post) => {
		setPosts((prev) => [post, ...prev]);
	};

	// 게시글 수정
	const updatePost = (updatedPost) => {
		setPosts((prev) =>
			prev.map((post) =>
				post.id === updatedPost.id ? updatedPost : post
			)
		);
	};

	// 게시글 삭제
	const deletePost = (postId) => {
		setPosts((prev) => prev.filter((post) => post.id !== postId));

		// 게시글 삭제 시 해당 게시글의 댓글도 함께 삭제
		setComments((prev) =>
			prev.filter((comment) => comment.postId !== postId)
		);
	};

	// 게시글 찾기
	const getPost = (postId) => {
		return posts.find((post) => post.id === postId);
	};

	// 조회수 증가
	const increaseView = (postId) => {
		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? { ...post, views: (post.views ?? 0) + 1 }
					: post
			)
		);
	};

	// 특정 게시글의 댓글 목록 조회
	const getCommentsByPost = (postId) => {
		return comments.filter((comment) => comment.postId === postId);
	};

	// 댓글/답글 추가
	// parentId가 없으면 최상위 댓글, 있으면 그 댓글의 답글
	const addComment = ({ postId, parentId = null, userId, content }) => {
		const newComment = {
			id: String(Date.now()),
			postId,
			parentId,
			userId,
			content,
			date: new Date().toISOString(),
		};

		setComments((prev) => [...prev, newComment]);

		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							commentsCount: (post.commentsCount ?? 0) + 1,
					  }
					: post
			)
		);
	};

	// 댓글/답글 삭제
	// 최상위 댓글을 삭제하면 그에 딸린 답글도 함께 삭제
	// (state setter 안에서 다른 state의 setter를 호출하지 않도록,
	//  삭제 대상 계산은 밖에서 먼저 끝내고 각 setter는 한 번씩만 호출)
	const deleteComment = (postId, commentId) => {
		const target = comments.find((comment) => comment.id === commentId);
		if (!target) return;

		const idsToRemove = [commentId];

		if (!target.parentId) {
			comments.forEach((comment) => {
				if (comment.parentId === commentId) {
					idsToRemove.push(comment.id);
				}
			});
		}

		setComments((prev) =>
			prev.filter((comment) => !idsToRemove.includes(comment.id))
		);

		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							commentsCount: Math.max(
								(post.commentsCount ?? 0) - idsToRemove.length,
								0
							),
					  }
					: post
			)
		);
	};

	return (
		<BoardContext.Provider
			value={{
				posts,
				addPost,
				updatePost,
				deletePost,
				getPost,
				increaseView,
				comments,
				getCommentsByPost,
				addComment,
				deleteComment,
			}}
		>
			{children}
		</BoardContext.Provider>
	);
};

export const useBoard = () => useContext(BoardContext);