import React, {
	useMemo,
	useState,
	useEffect,
} from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { IconEye, IconMessageCircle, IconEdit } from '@tabler/icons-react-native';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/Board.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBoard } from '../context/BoardContext';

const CATEGORIES = [
	{ key: 'all', label: '전체' },
	{ key: 'free', label: '자유 게시판' },
	{ key: 'adopt', label: '분양 게시판' },
	{ key: 'disease', label: '질병 게시판' },
];

function formatDate(isoString) {
	const date = new Date(isoString);
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${month}월 ${day}일`;
}

function CategoryBadge({ categoryKey }) {
	const label = CATEGORIES.find((category) => category.key === categoryKey)?.label ?? '';

	return (
		<View style={styles.categoryBadge}>
			<Text style={styles.categoryBadgeText}>{label}</Text>
		</View>
	);
}

export default function BoardDetail({ navigation, route }) {
	const {
		getPost,
		deletePost,
		increaseView,
		getCommentsByPost,
		addComment,
		deleteComment,
	} = useBoard();

	const [myUserId, setMyUserId] = useState('');
	const [commentText, setCommentText] = useState('');
	const [replyTarget, setReplyTarget] = useState(null); // 답글 작성 중인 댓글 id
	const [replyText, setReplyText] = useState('');

	useEffect(() => {
		const loadUser = async () => {
			const id = await AsyncStorage.getItem('userId');
			setMyUserId(id || '');
		};

		loadUser();
	}, []);

	const post = useMemo(() => {
		if (route?.params?.post) {
			return route.params.post;
		}

		if (route?.params?.postId) {
			return getPost(route.params.postId);
		}

		return null;
	}, [route, getPost]);

	const isMine = post?.userId === myUserId;

	useEffect(() => {
		if (!post) return;

		const markAsViewed = async () => {
			try {
				const raw = await AsyncStorage.getItem('viewedPostIds');
				const viewedIds = raw ? JSON.parse(raw) : [];

				if (viewedIds.includes(post.id)) return;

				increaseView(post.id);

				const updated = [...viewedIds, post.id];
				await AsyncStorage.setItem('viewedPostIds', JSON.stringify(updated));
			} catch (e) {
				console.log('조회수 처리 실패:', e.message);
			}
		};

		markAsViewed();
	}, [post?.id]);

	if (!post) {
		return (
			<>
				<Header title="게시판" navigation={navigation} type="full" />
				<View style={styles.container}>
					<Text style={styles.emptyText}>게시글을 찾을 수 없습니다.</Text>
				</View>
				<Bottom type="main" active="board" navigation={navigation} />
			</>
		);
	}

	const allComments = getCommentsByPost(post.id);
	const topLevelComments = allComments.filter((c) => !c.parentId);
	const repliesByParent = (parentId) =>
		allComments.filter((c) => c.parentId === parentId);

	const handleDelete = () => {
		deletePost(post.id);
		navigation.goBack();
	};

	const handleSubmitComment = () => {
		if (!commentText.trim()) return;

		addComment({
			postId: post.id,
			userId: myUserId,
			content: commentText.trim(),
		});

		setCommentText('');
	};

	const handleSubmitReply = (parentId) => {
		if (!replyText.trim()) return;

		addComment({
			postId: post.id,
			parentId,
			userId: myUserId,
			content: replyText.trim(),
		});

		setReplyText('');
		setReplyTarget(null);
	};

	return (
		<>
			<Header title="게시판" navigation={navigation} type="full" />

			<ScrollView style={styles.container} contentContainerStyle={styles.detailContent}>
				<View style={styles.detailCard}>
					<CategoryBadge categoryKey={post.category} />

					<Text style={styles.detailTitle}>{post.title}</Text>

					<View style={styles.detailMetaRow}>
						<Text style={styles.metaDate}>{formatDate(post.date)}</Text>

						<View style={styles.metaIconGroup}>
							<IconEye size={13} color="#A7A7A7" strokeWidth={1.75} />
							<Text style={styles.metaCount}>{post.views}</Text>

							<IconMessageCircle size={13} color="#A7A7A7" strokeWidth={1.75} />
							<Text style={styles.metaCount}>{allComments.length}</Text>
						</View>
					</View>

					{post.imageUri && (
						<Image source={{ uri: post.imageUri }} style={styles.detailImage} />
					)}

					<Text style={styles.detailText}>{post.content}</Text>

					{/* 내 글일 때만: 수정/삭제 */}
					{isMine && (
						<>
							<TouchableOpacity
								style={styles.detailActionButton}
								activeOpacity={0.85}
								onPress={() =>
									navigation.navigate('BoardWrite', {
										category: post.category,
										post,
									})
								}
							>
								<IconEdit size={18} color="#FFFFFF" strokeWidth={2} />
								<Text style={styles.detailActionText}>이 글 수정하기</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.detailActionButton,
									{ backgroundColor: '#E74C3C', marginTop: 10 },
								]}
								activeOpacity={0.85}
								onPress={handleDelete}
							>
								<Text style={styles.detailActionText}>삭제하기</Text>
							</TouchableOpacity>
						</>
					)}

					{/* 댓글 섹션: 내 글/남의 글 상관없이 항상 표시 */}
					<Text style={styles.commentSectionTitle}>
						댓글 {allComments.length}
					</Text>

					{topLevelComments.length === 0 ? (
						<Text style={styles.commentEmptyText}>
							아직 댓글이 없습니다.
						</Text>
					) : (
						topLevelComments.map((comment) => (
							<View key={comment.id} style={styles.commentItem}>
								<View style={styles.commentHeaderRow}>
									<Text style={styles.commentAuthor}>
										{comment.userId || '익명'}
									</Text>
									<Text style={styles.commentDate}>
										{formatDate(comment.date)}
									</Text>
								</View>

								<Text style={styles.commentContent}>{comment.content}</Text>

								<View style={styles.commentActionRow}>
									<TouchableOpacity
										onPress={() =>
											setReplyTarget(
												replyTarget === comment.id ? null : comment.id
											)
										}
									>
										<Text style={styles.commentReplyBtn}>답글</Text>
									</TouchableOpacity>

									{comment.userId === myUserId && (
										<TouchableOpacity
											onPress={() => deleteComment(post.id, comment.id)}
										>
											<Text style={styles.commentDeleteBtn}>삭제</Text>
										</TouchableOpacity>
									)}
								</View>

								{/* 답글 입력창 */}
								{replyTarget === comment.id && (
									<View style={styles.replyInputRow}>
										<TextInput
											value={replyText}
											onChangeText={setReplyText}
											placeholder="답글을 입력하세요"
											placeholderTextColor="#B8B8B8"
											style={styles.replyInput}
										/>
										<TouchableOpacity
											style={styles.commentSubmitBtn}
											onPress={() => handleSubmitReply(comment.id)}
										>
											<Text style={styles.commentSubmitBtnText}>등록</Text>
										</TouchableOpacity>
									</View>
								)}

								{/* 답글 목록 (들여쓰기) */}
								{repliesByParent(comment.id).map((reply) => (
									<View key={reply.id} style={styles.replyItem}>
										<View style={styles.commentHeaderRow}>
											<Text style={styles.commentAuthor}>
												{reply.userId || '익명'}
											</Text>
											<Text style={styles.commentDate}>
												{formatDate(reply.date)}
											</Text>
										</View>

										<Text style={styles.commentContent}>{reply.content}</Text>

										{reply.userId === myUserId && (
											<TouchableOpacity
												onPress={() => deleteComment(post.id, reply.id)}
											>
												<Text style={styles.commentDeleteBtn}>삭제</Text>
											</TouchableOpacity>
										)}
									</View>
								))}
							</View>
						))
					)}

					{/* 새 댓글 입력 */}
					<View style={styles.commentInputRow}>
						<TextInput
							value={commentText}
							onChangeText={setCommentText}
							placeholder="댓글을 입력하세요."
							placeholderTextColor="#B8B8B8"
							style={styles.commentInput}
						/>

						<TouchableOpacity
							style={styles.commentSubmitBtn}
							onPress={handleSubmitComment}
						>
							<Text style={styles.commentSubmitBtnText}>등록</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			<Bottom type="main" active="board" navigation={navigation} />
		</>
	);
}