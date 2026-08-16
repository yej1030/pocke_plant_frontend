import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  getBoardsApi,
  getBoardApi,
  createBoardApi,
  updateBoardApi,
  deleteBoardApi,
  getCommentsApi,
  createCommentApi,
  deleteCommentApi,
} from '../api/api';

const BoardContext =
  createContext(null);

export const BoardProvider = ({
  children,
}) => {
  const [
    posts,
    setPosts,
  ] = useState([]);

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    isLoadingPosts,
    setIsLoadingPosts,
  ] = useState(false);

  /*
   * 전체 게시글을 서버에서 조회합니다.
   */
  const loadPosts =
    useCallback(async () => {
      try {
        setIsLoadingPosts(true);

        const response =
          await getBoardsApi();

        const loadedPosts =
          Array.isArray(response)
            ? response
            : [];

        setPosts(loadedPosts);

        return loadedPosts;
      } finally {
        setIsLoadingPosts(false);
      }
    }, []);

  /*
   * 게시글 하나를 서버에서 조회합니다.
   * 백엔드에서 상세 조회 시 조회수가 증가합니다.
   */
  const loadPost =
    useCallback(
      async postId => {
        const loadedPost =
          await getBoardApi(
            postId,
          );

        setPosts(previous => {
          const exists =
            previous.some(
              post =>
                String(post.id) ===
                String(
                  loadedPost.id,
                ),
            );

          if (!exists) {
            return [
              loadedPost,
              ...previous,
            ];
          }

          return previous.map(
            post =>
              String(post.id) ===
              String(
                loadedPost.id,
              )
                ? loadedPost
                : post,
          );
        });

        return loadedPost;
      },
      [],
    );

  /*
   * Context에 저장된 게시글 조회
   */
  const getPost =
    useCallback(
      postId =>
        posts.find(
          post =>
            String(post.id) ===
            String(postId),
        ),
      [posts],
    );

  /*
   * 게시글 작성
   */
  const addPost =
    useCallback(
      async postData => {
        const savedPost =
          await createBoardApi(
            postData,
          );

        setPosts(previous => [
          savedPost,
          ...previous,
        ]);

        return savedPost;
      },
      [],
    );

  /*
   * 게시글 수정
   */
  const updatePost =
    useCallback(
      async updatedPost => {
        if (!updatedPost?.id) {
          throw new Error(
            '수정할 게시글 ID가 없습니다.',
          );
        }

        const savedPost =
          await updateBoardApi(
            updatedPost.id,
            updatedPost,
          );

        setPosts(previous =>
          previous.map(post =>
            String(post.id) ===
            String(savedPost.id)
              ? savedPost
              : post,
          ),
        );

        return savedPost;
      },
      [],
    );

  /*
   * 게시글 삭제
   */
  const deletePost =
    useCallback(
      async postId => {
        await deleteBoardApi(
          postId,
        );

        setPosts(previous =>
          previous.filter(
            post =>
              String(post.id) !==
              String(postId),
          ),
        );

        setComments(previous =>
          previous.filter(
            comment =>
              String(
                comment.postId,
              ) !==
              String(postId),
          ),
        );
      },
      [],
    );

  /*
   * 기존 화면 코드와의 호환을 위해 남겨둡니다.
   * 실제 조회수는 백엔드 상세 조회 API에서 증가합니다.
   */
  const increaseView =
    useCallback(
      async postId =>
        loadPost(postId),
      [loadPost],
    );

  /*
   * 특정 게시글 댓글 조회
   */
  const loadComments =
    useCallback(
      async postId => {
        const response =
          await getCommentsApi(
            postId,
          );

        const loadedComments =
          Array.isArray(response)
            ? response
            : [];

        setComments(previous => [
          ...previous.filter(
            comment =>
              String(
                comment.postId,
              ) !==
              String(postId),
          ),
          ...loadedComments,
        ]);

        return loadedComments;
      },
      [],
    );

  /*
   * Context에 저장된 특정 게시글 댓글 조회
   */
  const getCommentsByPost =
    useCallback(
      postId =>
        comments.filter(
          comment =>
            String(
              comment.postId,
            ) ===
            String(postId),
        ),
      [comments],
    );

  /*
   * 댓글 또는 답글 작성
   */
  const addComment =
    useCallback(
      async ({
        postId,
        parentId = null,
        content,
      }) => {
        const savedComment =
          await createCommentApi({
            postId,
            parentId,
            content,
          });

        setComments(previous => [
          ...previous,
          savedComment,
        ]);

        setPosts(previous =>
          previous.map(post =>
            String(post.id) ===
            String(postId)
              ? {
                  ...post,
                  commentsCount:
                    (post.commentsCount ||
                      0) + 1,
                }
              : post,
          ),
        );

        return savedComment;
      },
      [],
    );

  /*
   * 댓글 또는 답글 삭제
   *
   * 부모 댓글을 삭제하면 백엔드에서 답글도 함께 삭제될 수 있으므로
   * 삭제 후 댓글 목록과 게시글 목록을 다시 조회합니다.
   */
  const deleteComment =
    useCallback(
      async (
        postId,
        commentId,
      ) => {
        await deleteCommentApi(
          commentId,
        );

        await Promise.all([
          loadComments(postId),
          loadPosts(),
        ]);
      },
      [
        loadComments,
        loadPosts,
      ],
    );

  return (
    <BoardContext.Provider
      value={{
        posts,
        comments,
        isLoadingPosts,

        loadPosts,
        loadPost,
        getPost,

        addPost,
        updatePost,
        deletePost,
        increaseView,

        loadComments,
        getCommentsByPost,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context =
    useContext(BoardContext);

  if (!context) {
    throw new Error(
      'useBoard는 BoardProvider 내부에서 사용해야 합니다.',
    );
  }

  return context;
};