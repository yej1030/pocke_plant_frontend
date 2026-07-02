import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/Board.style';

const CATEGORIES = [
	{ key: 'free', label: '자유 게시판' },
	{ key: 'adopt', label: '분양 게시판' },
	{ key: 'disease', label: '질병 게시판' },
];

export default function BoardWrite({ navigation, route }) {
	const initialCategory = useMemo(() => {
		const matched = CATEGORIES.find((category) => category.key === route?.params?.category);
		return matched?.key ?? 'free';
	}, [route]);

	const [category, setCategory] = useState(initialCategory);
	const [title, setTitle] = useState(route?.params?.post?.title ?? '');
	const [content, setContent] = useState(route?.params?.post?.content ?? '');

	const handleSubmit = () => {
		const createdPost = {
			id: route?.params?.post?.id ?? String(Date.now()),
			category,
			title: title.trim() || '새 게시글',
			content: content.trim() || '내용이 없습니다.',
			imageUri: route?.params?.post?.imageUri ?? null,
			date: new Date().toISOString(),
			views: route?.params?.post?.views ?? 0,
			commentsCount: route?.params?.post?.commentsCount ?? 0,
		};

		navigation.navigate('BoardDetail', { post: createdPost, postId: createdPost.id });
	};

	return (
		<>
			<Header title="글 작성" navigation={navigation} type="full" />

			<ScrollView style={styles.container} contentContainerStyle={styles.writeContent}>
				<Text style={styles.writeLabel}>카테고리</Text>
				<View style={styles.categoryWrap}>
					{CATEGORIES.map((item) => {
						const isActive = category === item.key;

						return (
							<TouchableOpacity
								key={item.key}
								style={[styles.writeCategoryPill, isActive && styles.writeCategoryPillActive]}
								activeOpacity={0.85}
								onPress={() => setCategory(item.key)}
							>
								<Text style={[styles.writeCategoryText, isActive && styles.writeCategoryTextActive]}>
									{item.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<Text style={styles.writeLabel}>제목</Text>
				<TextInput
					value={title}
					onChangeText={setTitle}
					placeholder="제목을 입력하세요"
					placeholderTextColor="#B8B8B8"
					style={styles.writeInput}
				/>

				<Text style={styles.writeLabel}>내용</Text>
				<TextInput
					value={content}
					onChangeText={setContent}
					placeholder="내용을 입력하세요"
					placeholderTextColor="#B8B8B8"
					style={[styles.writeInput, styles.writeTextarea]}
					multiline
					textAlignVertical="top"
				/>

				<TouchableOpacity style={styles.writeSubmitButton} activeOpacity={0.85} onPress={handleSubmit}>
					<Text style={styles.writeSubmitText}>게시하기</Text>
				</TouchableOpacity>
			</ScrollView>

			<Bottom type="main" active="board" navigation={navigation} />
		</>
	);
}
