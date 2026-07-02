import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { IconEye, IconMessageCircle, IconEdit } from '@tabler/icons-react-native';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/Board.style';

const CATEGORIES = [
	{ key: 'all', label: '전체' },
	{ key: 'free', label: '자유 게시판' },
	{ key: 'adopt', label: '분양 게시판' },
	{ key: 'disease', label: '질병 게시판' },
];

const BOARD_POSTS = [
	{
		id: '1',
		category: 'free',
		title: '몬스테라 새 잎이 나왔어요',
		content:
			'드디어 새 잎이 갈라지면서 나왔는데 너무 신기하네요. 다들 몬스테라 키우실 때 물은 얼마나 자주 주시나요?',
		imageUri: null,
		date: '2026-06-28T09:12:00.000Z',
		views: 132,
		commentsCount: 8,
	},
	{
		id: '2',
		category: 'adopt',
		title: '스투키 번식한 아이 분양합니다',
		content:
			'집에서 번식시킨 스투키 3개체 분양해요. 튼튼하게 잘 자란 아이들입니다. 관심 있으신 분 댓글 남겨주세요.',
		imageUri: null,
		date: '2026-06-27T14:30:00.000Z',
		views: 341,
		commentsCount: 15,
	},
	{
		id: '3',
		category: 'disease',
		title: '잎에 갈색 반점이 생겼는데 병일까요?',
		content:
			'며칠 전부터 잎 가장자리에 갈색 반점이 번지고 있어요. 탄저병인지 그냥 마른건지 구분이 안 가서 여쭤봅니다.',
		imageUri: null,
		date: '2026-06-25T11:05:00.000Z',
		views: 89,
		commentsCount: 4,
	},
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
	const post = useMemo(() => {
		if (route?.params?.post) {
			return route.params.post;
		}

		if (route?.params?.postId) {
			return BOARD_POSTS.find((item) => item.id === route.params.postId) ?? BOARD_POSTS[0];
		}

		return BOARD_POSTS[0];
	}, [route]);

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

					<TouchableOpacity
						style={styles.detailActionButton}
						activeOpacity={0.85}
						onPress={() => navigation.navigate('BoardWrite', { category: post.category, post })}
					>
						<IconEdit size={18} color="#FFFFFF" strokeWidth={2} />
						<Text style={styles.detailActionText}>이 글 수정하기</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<Bottom type="main" active="board" navigation={navigation} />
		</>
	);
}
