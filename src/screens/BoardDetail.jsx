import React, {
	useMemo,
	useState,
	useEffect,
} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
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
} = useBoard();

const [myUserId, setMyUserId] =
	useState('');

	useEffect(() => {
	const loadUser = async () => {
		const id =
			await AsyncStorage.getItem(
				'userId'
			);

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

const isMine =
	post?.userId === myUserId;

	useEffect(() => {
	if (post) {
		increaseView(post.id);
	}
}, []);

const handleDelete = () => {
	deletePost(post.id);

	navigation.goBack();
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
							<Text style={styles.metaCount}>{post.commentsCount}</Text>
						</View>
					</View>

					{post.imageUri ? (
						<Image source={{ uri: post.imageUri }} style={styles.detailImage} />
					) : (
						<View style={styles.detailImagePlaceholder} />
					)}

					<Text style={styles.detailText}>{post.content}</Text>

{isMine ? (
	<>
		{/* 수정 */}
		<TouchableOpacity
			style={styles.detailActionButton}
			activeOpacity={0.85}
			onPress={() =>
				navigation.navigate(
					'BoardWrite',
					{
						category:
							post.category,
						post,
					}
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
				이 글 수정하기
			</Text>
		</TouchableOpacity>

		{/* 삭제 */}
		<TouchableOpacity
			style={[
				styles.detailActionButton,
				{
					backgroundColor:
						'#E74C3C',
					marginTop: 10,
				},
			]}
			activeOpacity={0.85}
			onPress={handleDelete}
		>
			<Text
				style={
					styles.detailActionText
				}
			>
				삭제하기
			</Text>
		</TouchableOpacity>
	</>
) : (
	<>
		<Text
			style={{
				fontSize: 18,
				fontWeight: '700',
				marginTop: 30,
				marginBottom: 15,
			}}
		>
			댓글
		</Text>

		<View
			style={{
				paddingVertical: 15,
				borderBottomWidth: 1,
				borderColor: '#eee',
			}}
		>
		</View>

		<View
			style={{
				flexDirection: 'row',
				marginTop: 20,
			}}
		>
			<TextInput
				placeholder="댓글을 입력하세요."
				style={{
					flex: 1,
					borderWidth: 1,
					borderColor: '#ddd',
					borderRadius: 10,
					paddingHorizontal: 15,
				}}
			/>

			<TouchableOpacity
				style={{
					marginLeft: 10,
					backgroundColor:
						'#5C7F46',
					borderRadius: 10,
					paddingHorizontal: 18,
					justifyContent:
						'center',
				}}
			>
				<Text
					style={{
						color: '#fff',
						fontWeight: '700',
					}}
				>
					등록
				</Text>
			</TouchableOpacity>
		</View>
	</>
)}
				</View>
			</ScrollView>

			<Bottom type="main" active="board" navigation={navigation} />
		</>
	);
}
