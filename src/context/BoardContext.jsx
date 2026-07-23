import React, { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

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
		setPosts((prev) =>
			prev.filter((post) => post.id !== postId)
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
					? {
							...post,
							views: post.views + 1,
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
			}}
		>
			{children}
		</BoardContext.Provider>
	);
};

export const useBoard = () => useContext(BoardContext);