import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  IconEye,
  IconMessageCircle,
  IconEdit,
} from '@tabler/icons-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/Board.style';

import {
  useBoard,
} from '../context/BoardContext';

import {
  formatDate,
  CategoryBadge,
} from './boardUtils';

export default function BoardDetail({
  navigation,
  route,
}) {
  const {
    getPost,
    loadPost,
    deletePost,
    loadComments,
    getCommentsByPost,
    addComment,
    deleteComment,
  } = useBoard();

  const postId =
    route?.params?.postId ||
    route?.params?.post?.id;

  const [
    remotePost,
    setRemotePost,
  ] = useState(
    route?.params?.post || null,
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(
    !route?.params?.post,
  );

  const [
    myUserId,
    setMyUserId,
  ] = useState('');

  const [
    commentText,
    setCommentText,
  ] = useState('');

  const [
    replyTarget,
    setReplyTarget,
  ] = useState(null);

  const [
    replyText,
    setReplyText,
  ] = useState('');

  const {
    alertConfig,
    showAlert,
    closeAlert,
  } = useCustomAlert();

  useEffect(() => {
    const loadUser = async () => {
      const id =
        await AsyncStorage.getItem(
          'userId',
        );

      setMyUserId(id || '');
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }

    let active = true;

    const loadData = async () => {
      try {
        setIsLoading(true);

        const [
          loadedPost,
        ] = await Promise.all([
          loadPost(postId),
          loadComments(postId),
        ]);

        if (active) {
          setRemotePost(
            loadedPost,
          );
        }
      } catch (error) {
        console.log(
          '게시글 상세 조회 실패:',
          error.response?.data ||
          error.message,
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [
    postId,
    loadPost,
    loadComments,
  ]);

  const post = useMemo(
    () =>
      remotePost ||
      getPost(postId),
    [
      remotePost,
      getPost,
      postId,
    ],
  );

  const allComments =
    postId
      ? getCommentsByPost(postId)
      : [];

  const topLevelComments =
    allComments.filter(
      comment =>
        !comment.parentId,
    );

  const repliesByParent =
    parentId =>
      allComments.filter(
        comment =>
          String(
            comment.parentId,
          ) ===
          String(parentId),
      );

  const isMine =
    post &&
    String(post.userId) ===
      String(myUserId);

  const confirmDelete = ({
    title,
    message,
    onConfirm,
  }) => {
    showAlert({
      title,
      message,
      variant: 'error',
      actions: [
        {
          text: '취소',
          kind: 'cancel',
        },
        {
          text: '삭제',
          kind: 'destructive',
          onPress: onConfirm,
        },
      ],
    });
  };

  const handleDeletePost = () => {
    confirmDelete({
      title: '게시글 삭제',
      message:
        '작성한 게시글을 삭제하시겠습니까?',
      onConfirm: async () => {
        try {
          await deletePost(
            post.id,
          );

          navigation.goBack();
        } catch (error) {
          showAlert({
            title: '삭제 실패',
            message:
              error.response?.data ||
              '게시글 삭제에 실패했습니다.',
            variant: 'error',
          });
        }
      },
    });
  };

  const handleDeleteComment =
    commentId => {
      confirmDelete({
        title: '댓글 삭제',
        message:
          '이 댓글을 삭제하시겠습니까?',
        onConfirm: async () => {
          try {
            await deleteComment(
              post.id,
              commentId,
            );
          } catch (error) {
            showAlert({
              title: '삭제 실패',
              message:
                error.response
                  ?.data ||
                '댓글 삭제에 실패했습니다.',
              variant: 'error',
            });
          }
        },
      });
    };

  const handleSubmitComment =
    async () => {
      const content =
        commentText.trim();

      if (!content) {
        return;
      }

      try {
        await addComment({
          postId: post.id,
          content,
        });

        setCommentText('');
      } catch (error) {
        showAlert({
          title: '댓글 등록 실패',
          message:
            error.response?.data ||
            '댓글 등록에 실패했습니다.',
          variant: 'error',
        });
      }
    };

  const handleToggleReply =
    commentId => {
      setReplyTarget(
        replyTarget === commentId
          ? null
          : commentId,
      );

      setReplyText('');
    };

  const handleSubmitReply =
    async parentId => {
      const content =
        replyText.trim();

      if (!content) {
        return;
      }

      try {
        await addComment({
          postId: post.id,
          parentId,
          content,
        });

        setReplyText('');
        setReplyTarget(null);
      } catch (error) {
        showAlert({
          title: '답글 등록 실패',
          message:
            error.response?.data ||
            '답글 등록에 실패했습니다.',
          variant: 'error',
        });
      }
    };

  if (isLoading && !post) {
    return (
      <>
        <Header
          title="게시판"
          navigation={navigation}
          type="full"
        />

        <View
          style={styles.container}
        >
          <Text
            style={styles.emptyText}
          >
            게시글을 불러오는 중입니다.
          </Text>
        </View>

        <Bottom
          type="main"
          active="board"
          navigation={navigation}
        />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header
          title="게시판"
          navigation={navigation}
          type="full"
        />

        <View
          style={styles.container}
        >
          <Text
            style={styles.emptyText}
          >
            게시글을 찾을 수 없습니다.
          </Text>
        </View>

        <Bottom
          type="main"
          active="board"
          navigation={navigation}
        />
      </>
    );
  }

  return (
    <>
      <Header
        title="게시판"
        navigation={navigation}
        type="full"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? 90
            : 0
        }
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={
            styles.detailContent
          }
        >
          <View
            style={styles.detailCard}
          >
            <CategoryBadge
              categoryKey={
                post.category
              }
            />

            <Text
              style={
                styles.detailTitle
              }
            >
              {post.title}
            </Text>

            <View
              style={
                styles.detailMetaRow
              }
            >
              <Text
                style={
                  styles.metaDate
                }
              >
                {formatDate(
                  post.date,
                )}
              </Text>

              <View
                style={
                  styles.metaIconGroup
                }
              >
                <IconEye
                  size={13}
                  color="#A7A7A7"
                  strokeWidth={1.75}
                />

                <Text
                  style={
                    styles.metaCount
                  }
                >
                  {post.views || 0}
                </Text>

                <IconMessageCircle
                  size={13}
                  color="#A7A7A7"
                  strokeWidth={1.75}
                />

                <Text
                  style={
                    styles.metaCount
                  }
                >
                  {allComments.length}
                </Text>
              </View>
            </View>

            {post.imageUris
              ?.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={
                  false
                }
                style={
                  styles.detailImageScroll
                }
              >
                {post.imageUris.map(
                  (uri, index) => (
                    <Image
                      key={`${uri}-${index}`}
                      source={{ uri }}
                      style={
                        styles.detailImageMulti
                      }
                    />
                  ),
                )}
              </ScrollView>
            ) : post.imageUri ? (
              <Image
                source={{
                  uri: post.imageUri,
                }}
                style={
                  styles.detailImage
                }
              />
            ) : null}

            <Text
              style={
                styles.detailText
              }
            >
              {post.content}
            </Text>

            {isMine ? (
              <View
                style={
                  styles.detailActionRow
                }
              >
                <TouchableOpacity
                  style={[
                    styles.detailActionButton,
                    styles.detailActionButtonHalf,
                  ]}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate(
                      'BoardWrite',
                      {
                        category:
                          post.category,
                        post,
                      },
                    )
                  }
                >
                  <IconEdit
                    size={18}
                    color="#FFFFFF"
                    strokeWidth={2}
                  />

                  <Text
                    style={
                      styles.detailActionText
                    }
                  >
                    수정하기
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.detailActionButton,
                    styles.detailActionButtonHalf,
                    {
                      backgroundColor:
                        '#E74C3C',
                    },
                  ]}
                  activeOpacity={0.85}
                  onPress={
                    handleDeletePost
                  }
                >
                  <Text
                    style={
                      styles.detailActionText
                    }
                  >
                    삭제하기
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View
              style={
                styles.sectionDivider
              }
            />

            <Text
              style={
                styles.commentSectionTitle
              }
            >
              댓글 {allComments.length}
            </Text>

            {topLevelComments.length ===
            0 ? (
              <Text
                style={
                  styles.commentEmptyText
                }
              >
                아직 댓글이 없습니다.
              </Text>
            ) : (
              topLevelComments.map(
                comment => (
                  <View
                    key={String(
                      comment.id,
                    )}
                    style={
                      styles.commentItem
                    }
                  >
                    <View
                      style={
                        styles.commentHeaderRow
                      }
                    >
                      <Text
                        style={
                          styles.commentAuthor
                        }
                      >
                        {comment.writer ||
                          '사용자'}
                      </Text>

                      <Text
                        style={
                          styles.commentDate
                        }
                      >
                        {formatDate(
                          comment.date,
                        )}
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.commentContent
                      }
                    >
                      {comment.content}
                    </Text>

                    <View
                      style={
                        styles.commentActionRow
                      }
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleToggleReply(
                            comment.id,
                          )
                        }
                      >
                        <Text
                          style={
                            styles.commentReplyBtn
                          }
                        >
                          답글
                        </Text>
                      </TouchableOpacity>

                      {String(
                        comment.userId,
                      ) ===
                      String(
                        myUserId,
                      ) ? (
                        <TouchableOpacity
                          onPress={() =>
                            handleDeleteComment(
                              comment.id,
                            )
                          }
                        >
                          <Text
                            style={
                              styles.commentDeleteBtn
                            }
                          >
                            삭제
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    {String(
                      replyTarget,
                    ) ===
                    String(
                      comment.id,
                    ) ? (
                      <View
                        style={
                          styles.replyInputRow
                        }
                      >
                        <TextInput
                          value={
                            replyText
                          }
                          onChangeText={
                            setReplyText
                          }
                          placeholder="답글을 입력하세요"
                          placeholderTextColor="#B8B8B8"
                          style={
                            styles.replyInput
                          }
                        />

                        <TouchableOpacity
                          style={
                            styles.commentSubmitBtn
                          }
                          onPress={() =>
                            handleSubmitReply(
                              comment.id,
                            )
                          }
                        >
                          <Text
                            style={
                              styles.commentSubmitBtnText
                            }
                          >
                            등록
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    {repliesByParent(
                      comment.id,
                    ).map(reply => (
                      <View
                        key={String(
                          reply.id,
                        )}
                        style={
                          styles.replyItem
                        }
                      >
                        <View
                          style={
                            styles.commentHeaderRow
                          }
                        >
                          <Text
                            style={
                              styles.commentAuthor
                            }
                          >
                            {reply.writer ||
                              '사용자'}
                          </Text>

                          <Text
                            style={
                              styles.commentDate
                            }
                          >
                            {formatDate(
                              reply.date,
                            )}
                          </Text>
                        </View>

                        <Text
                          style={
                            styles.commentContent
                          }
                        >
                          {reply.content}
                        </Text>

                        {String(
                          reply.userId,
                        ) ===
                        String(
                          myUserId,
                        ) ? (
                          <TouchableOpacity
                            onPress={() =>
                              handleDeleteComment(
                                reply.id,
                              )
                            }
                          >
                            <Text
                              style={
                                styles.commentDeleteBtn
                              }
                            >
                              삭제
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ),
              )
            )}

            <View
              style={
                styles.commentInputRow
              }
            >
              <TextInput
                value={commentText}
                onChangeText={
                  setCommentText
                }
                placeholder="댓글을 입력하세요."
                placeholderTextColor="#B8B8B8"
                style={
                  styles.commentInput
                }
              />

              <TouchableOpacity
                style={
                  styles.commentSubmitBtn
                }
                onPress={
                  handleSubmitComment
                }
              >
                <Text
                  style={
                    styles.commentSubmitBtnText
                  }
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        {...alertConfig}
        onRequestClose={
          closeAlert
        }
      />

      <Bottom
        type="main"
        active="board"
        navigation={navigation}
      />
    </>
  );
}