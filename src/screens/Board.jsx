import React, { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { IconEye, IconMessageCircle, IconPlus, IconPhoto } from '@tabler/icons-react-native';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/Board.style';

const CATEGORIES = [
	{ key: 'all', label: '전체' },
	{ key: 'free', label: '자유 게시판' },
	{ key: 'adopt', label: '분양 게시판' },
	{ key: 'disease', label: '질병 게시판' },
];

const SORT_OPTIONS = [
	{ key: 'latest', label: '최신순' },
	{ key: 'popular', label: '인기순' },
];

// 더미 데이터 (백엔드 연동 전까지 사용, 추후 getBoardPostsApi로 교체)
const DUMMY_POSTS = [
	{
		id: '1',
		category: 'free',
		title: '몬스테라 새 잎이 나왔어요',
		content: '드디어 새 잎이 갈라지면서 나왔는데 너무 신기하네요. 다들 몬스테라 키우실 때 물은 얼마나 자주 주시나요?',
		imageUri: null,
		date: '2026-06-28T09:12:00.000Z',
		views: 132,
		commentsCount: 8,
	},
	{
		id: '2',
		category: 'adopt',
		title: '스투키 번식한 아이 분양합니다',
		content: '집에서 번식시킨 스투키 3개체 분양해요. 튼튼하게 잘 자란 아이들입니다. 관심 있으신 분 댓글 남겨주세요.',
		imageUri: null,
		date: '2026-06-27T14:30:00.000Z',
		views: 341,
		commentsCount: 15,
	},
	{
		id: '3',
		category: 'disease',
		title: '잎에 갈색 반점이 생겼는데 병일까요?',
		content: '며칠 전부터 잎 가장자리에 갈색 반점이 번지고 있어요. 탄저병인지 그냥 마른건지 구분이 안 가서 여쭤봅니다.',
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
	const label = CATEGORIES.find((c) => c.key === categoryKey)?.label ?? '';
	return (
		<View style={styles.categoryBadge}>
			<Text style={styles.categoryBadgeText}>{label}</Text>
		</View>
	);
}

export default function Board({ navigation }) {
	const [posts] = useState(DUMMY_POSTS);
	const [activeCategory, setActiveCategory] = useState('all');
	const [sortType, setSortType] = useState('latest');

	const visiblePosts = useMemo(() => {
		const filtered =
			activeCategory === 'all'
				? posts
				: posts.filter((p) => p.category === activeCategory);

		const sorted = [...filtered].sort((a, b) => {
			if (sortType === 'popular') {
				return b.views - a.views;
			}
			return new Date(b.date) - new Date(a.date);
		});

		return sorted;
	}, [posts, activeCategory, sortType]);

	const renderPost = ({ item }) => (
		<TouchableOpacity
			style={styles.postCard}
			activeOpacity={0.85}
			onPress={() => navigation.navigate('BoardDetail', { postId: item.id, post: item })}
		>
			{item.imageUri ? (
				<Image source={{ uri: item.imageUri }} style={styles.postImage} />
			) : (
				<View style={styles.postImagePlaceholder}>
					<IconPhoto size={22} color="#C4C4C4" strokeWidth={1.5} />
				</View>
			)}

			<View style={styles.postTextWrap}>
				<CategoryBadge categoryKey={item.category} />

				<Text style={styles.postTitle} numberOfLines={1}>
					{item.title}
				</Text>

				<Text style={styles.postPreview} numberOfLines={2}>
					{item.content}
				</Text>

				<View style={styles.metaRow}>
					<Text style={styles.metaDate}>{formatDate(item.date)}</Text>

					<View style={styles.metaIconGroup}>
						<IconEye size={13} color="#A7A7A7" strokeWidth={1.75} />
						<Text style={styles.metaCount}>{item.views}</Text>

						<IconMessageCircle size={13} color="#A7A7A7" strokeWidth={1.75} />
						<Text style={styles.metaCount}>{item.commentsCount}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<>
			<Header title="게시판" navigation={navigation} type="full" />

			<View style={styles.container}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoryScroll}
					contentContainerStyle={styles.categoryScrollContent}
				>
					{CATEGORIES.map((cat) => {
						const isActive = activeCategory === cat.key;
						return (
							<TouchableOpacity
								key={cat.key}
								style={[styles.categoryPill, isActive && styles.categoryPillActive]}
								activeOpacity={0.8}
								onPress={() => setActiveCategory(cat.key)}
							>
								<Text style={[styles.categoryPillText, isActive && styles.categoryPillTextActive]}>
									{cat.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>

				<View style={styles.sortRow}>
					{SORT_OPTIONS.map((opt) => {
						const isActive = sortType === opt.key;
						return (
							<TouchableOpacity
								key={opt.key}
								onPress={() => setSortType(opt.key)}
								style={styles.sortOption}
							>
								<Text style={[styles.sortText, isActive && styles.sortTextActive]}>
									{opt.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<FlatList
					data={visiblePosts}
					keyExtractor={(item) => item.id}
					renderItem={renderPost}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={
						<Text style={styles.emptyText}>등록된 게시글이 없습니다.</Text>
					}
				/>

				<TouchableOpacity
					style={styles.writeButton}
					activeOpacity={0.85}
					onPress={() => navigation.navigate('BoardWrite')}
				>
					<IconPlus size={24} color="#FFFFFF" strokeWidth={2} />
				</TouchableOpacity>
			</View>

			<Bottom type="main" active="board" navigation={navigation} />
		</>
	);
}