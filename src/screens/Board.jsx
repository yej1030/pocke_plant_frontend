import React, { useState, useMemo, useCallback } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	ScrollView,
	TextInput,
	BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconEye, IconMessageCircle, IconPlus, IconSearch, IconX } from '@tabler/icons-react-native';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/Board.style';
import { useBoard } from '../context/BoardContext';
import { CATEGORIES, formatDate, CategoryBadge } from './boardUtils';

const SORT_OPTIONS = [
	{ key: 'latest', label: '최신순' },
	{ key: 'popular', label: '인기순' },
];

export default function Board({ navigation }) {
	const { posts } = useBoard();

	const [activeCategory, setActiveCategory] = useState('all');
	const [sortType, setSortType] = useState('latest');
	const [searchText, setSearchText] = useState('');

	const handleBackToHome = useCallback(() => {
		navigation.navigate('Main'); // 실제 홈 화면 라우트 이름 확인!
	}, [navigation]);

	// 안드로이드 하드웨어 뒤로가기 버튼 대응
	useFocusEffect(
		useCallback(() => {
			const onHardwareBackPress = () => {
				handleBackToHome();
				return true;
			};

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onHardwareBackPress
			);

			return () => subscription.remove();
		}, [handleBackToHome])
	);

	const visiblePosts = useMemo(() => {
		const filtered =
			activeCategory === 'all'
				? posts
				: posts.filter((post) => post.category === activeCategory);

		const query = searchText.trim().toLowerCase();

		const searched = query
			? filtered.filter((post) => {
					const title = (post.title ?? '').toLowerCase();
					const content = (post.content ?? '').toLowerCase();
					return title.includes(query) || content.includes(query);
			  })
			: filtered;

		const sorted = [...searched].sort((a, b) => {
			if (sortType === 'popular') {
				return (b.views ?? 0) - (a.views ?? 0);
			}

			return new Date(b.date) - new Date(a.date);
		});

		return sorted;
	}, [posts, activeCategory, sortType, searchText]);

	const renderPost = ({ item }) => (
		<TouchableOpacity
			style={styles.postCard}
			activeOpacity={0.85}
			onPress={() =>
				navigation.navigate('BoardDetail', { postId: item.id })
			}
		>
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
						<IconEye size={13} color="#C4C4C4" strokeWidth={1.75} />
						<Text style={styles.metaCount}>{item.views ?? 0}</Text>

						<IconMessageCircle size={13} color="#C4C4C4" strokeWidth={1.75} />
						<Text style={styles.metaCount}>{item.commentsCount ?? 0}</Text>
					</View>
				</View>
			</View>

			{item.imageUri && (
				<Image source={{ uri: item.imageUri }} style={styles.postImage} />
			)}
		</TouchableOpacity>
	);

	return (
		<>
			<Header
				title="게시판"
				navigation={navigation}
				type="full"
				onBackPress={handleBackToHome}
			/>

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
								style={[
									styles.categoryPill,
									isActive && styles.categoryPillActive,
								]}
								activeOpacity={0.8}
								onPress={() => setActiveCategory(cat.key)}
							>
								<Text
									style={[
										styles.categoryPillText,
										isActive && styles.categoryPillTextActive,
									]}
								>
									{cat.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>

				<View style={styles.searchBar}>
					<IconSearch size={17} color="#C4C4C4" strokeWidth={1.75} />

					<TextInput
						value={searchText}
						onChangeText={setSearchText}
						placeholder="제목 또는 내용 검색"
						placeholderTextColor="#C4C4C4"
						style={styles.searchInput}
					/>

					{searchText.length > 0 && (
						<TouchableOpacity
							onPress={() => setSearchText('')}
							activeOpacity={0.7}
						>
							<IconX size={16} color="#C4C4C4" strokeWidth={1.75} />
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.sortRow}>
					{SORT_OPTIONS.map((opt) => {
						const isActive = sortType === opt.key;

						return (
							<TouchableOpacity
								key={opt.key}
								style={styles.sortOption}
								onPress={() => setSortType(opt.key)}
							>
								<Text
									style={[
										styles.sortText,
										isActive && styles.sortTextActive,
									]}
								>
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
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={
						<Text style={styles.emptyText}>
							{searchText.trim()
								? '검색 결과가 없습니다.'
								: '등록된 게시글이 없습니다.'}
						</Text>
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