import React, { useMemo, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import {
	launchCamera,
	launchImageLibrary,
} from 'react-native-image-picker';
import { IconPhoto, IconX, IconPlus } from '@tabler/icons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/Board.style';
import { useBoard } from '../context/BoardContext';
import { WRITE_CATEGORIES } from './boardUtils';

const MAX_IMAGES = 5;

export default function BoardWrite({ navigation, route }) {
	const { addPost, updatePost } = useBoard();
	const { alertConfig, showAlert, closeAlert } = useCustomAlert();

	const editingPost = route?.params?.post ?? null;

	const initialCategory = useMemo(() => {
		const matched = WRITE_CATEGORIES.find(
			(category) =>
				category.key ===
				(editingPost?.category ?? route?.params?.category)
		);
		return matched?.key ?? 'free';
	}, [route, editingPost]);

	const [category, setCategory] = useState(initialCategory);
	const [title, setTitle] = useState(editingPost?.title ?? '');
	const [content, setContent] = useState(editingPost?.content ?? '');

	const [imageUris, setImageUris] = useState(() => {
		if (editingPost?.imageUris?.length > 0) return editingPost.imageUris;
		if (editingPost?.imageUri) return [editingPost.imageUri];
		return [];
	});

	const [userId, setUserId] = useState('');
	const [nickname, setNickname] = useState('');

	useEffect(() => {
		const loadUser = async () => {
			const id = await AsyncStorage.getItem('userId');
			const name = await AsyncStorage.getItem('nickname');

			setUserId(id || '');
			setNickname(name || '');
		};

		loadUser();
	}, []);

	const handleAddImage = () => {
		if (imageUris.length >= MAX_IMAGES) {
			showAlert({
				title: '최대 개수 초과',
				message: `사진은 최대 ${MAX_IMAGES}장까지 첨부할 수 있어요.`,
				variant: 'warning',
			});
			return;
		}

		const remaining = MAX_IMAGES - imageUris.length;

		showAlert({
			title: '이미지 선택',
			message: '이미지 선택 방법을 골라주세요.',
			actions: [
				{
					text: '카메라로 촬영',
					kind: 'primary',
					onPress: () => {
						launchCamera(
							{ mediaType: 'photo', cameraType: 'back' },
							(res) => {
								if (res.didCancel || res.errorCode) return;
								if (res.assets?.length > 0) {
									setImageUris((prev) => [...prev, res.assets[0].uri]);
								}
							}
						);
					},
				},
				{
					text: '갤러리에서 선택',
					kind: 'primary',
					onPress: () => {
						launchImageLibrary(
							{ mediaType: 'photo', selectionLimit: remaining },
							(res) => {
								if (res.didCancel || res.errorCode) return;
								if (res.assets?.length > 0) {
									const newUris = res.assets.map((asset) => asset.uri);
									setImageUris((prev) =>
										[...prev, ...newUris].slice(0, MAX_IMAGES)
									);
								}
							}
						);
					},
				},
				{ text: '취소', kind: 'cancel' },
			],
		});
	};

	const handleRemoveImage = (index) => {
		setImageUris((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = () => {
		const missing = [];
		if (!title || title.trim() === '') missing.push('제목');
		if (!content || content.trim() === '') missing.push('내용');
		if (!category) missing.push('카테고리');

		if (missing.length > 0) {
			showAlert({
				title: '필수 입력',
				message: `${missing.join(', ')}을(를) 입력해주세요.`,
				variant: 'warning',
			});
			return;
		}

		const postData = {
			id: editingPost?.id ?? String(Date.now()),

			userId: editingPost?.userId ?? userId,
			writer: editingPost?.writer ?? nickname,

			category,
			title: title.trim(),
			content: content.trim(),
			imageUris,
			imageUri: imageUris[0] ?? null,
			date: editingPost?.date ?? new Date().toISOString(),
			views: editingPost?.views ?? 0,
			commentsCount: editingPost?.commentsCount ?? 0,
		};

		if (editingPost) {
			updatePost(postData);
			navigation.goBack(); // 수정: 원래 있던 상세화면으로 복귀 (스택에 쌓이지 않음)
		} else {
			addPost(postData);
			navigation.replace('BoardDetail', {
				post: postData,
				postId: postData.id,
			});
		}
	};

	const isValid =
		title.trim() !== '' && content.trim() !== '' && !!category;

	return (
		<>
			<Header title="글 작성" navigation={navigation} type="full" />

			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
			>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.writeContent}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.writeRow}>
						<Text style={styles.writeLabel}>제목</Text>
						<View style={styles.writeContentWrap}>
							<TextInput
								value={title}
								onChangeText={setTitle}
								placeholder="제목을 입력하세요"
								placeholderTextColor="#B8B8B8"
								style={styles.writeInput}
							/>
						</View>
					</View>

					<View style={styles.writeRow}>
						<Text style={styles.writeLabel}>내용</Text>
						<View style={styles.writeContentWrap}>
							<TextInput
								value={content}
								onChangeText={setContent}
								placeholder="내용을 입력하세요"
								placeholderTextColor="#B8B8B8"
								style={[styles.writeInput, styles.writeTextarea]}
								multiline
								textAlignVertical="top"
							/>
						</View>
					</View>

					<View style={styles.writeRow}>
						<Text style={styles.writeLabel}>카테고리</Text>
						<View style={styles.writeContentWrap}>
							<View style={styles.categoryWrap}>
								{WRITE_CATEGORIES.map((item) => {
									const isActive = category === item.key;

									return (
										<TouchableOpacity
											key={item.key}
											style={[
												styles.writeCategoryPill,
												isActive && styles.writeCategoryPillActive,
											]}
											activeOpacity={0.85}
											onPress={() => setCategory(item.key)}
										>
											<Text
												style={[
													styles.writeCategoryText,
													isActive && styles.writeCategoryTextActive,
												]}
											>
												{item.label}
											</Text>
										</TouchableOpacity>
									);
								})}
							</View>
						</View>
					</View>

					<View style={styles.writeRow}>
						<Text style={styles.writeLabel}>사진</Text>
						<View style={styles.writeContentWrap}>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.imageListContent}
							>
								{imageUris.map((uri, index) => (
									<View key={uri + index} style={styles.imageThumbWrap}>
										<Image source={{ uri }} style={styles.imageThumb} />

										<TouchableOpacity
											style={styles.imageRemoveBtn}
											onPress={() => handleRemoveImage(index)}
											activeOpacity={0.8}
										>
											<IconX size={12} color="#FFFFFF" strokeWidth={2.5} />
										</TouchableOpacity>
									</View>
								))}

								{imageUris.length < MAX_IMAGES && (
									<TouchableOpacity
										style={styles.imageAddBox}
										onPress={handleAddImage}
										activeOpacity={0.85}
									>
										<IconPlus size={22} color="#C4C4C4" strokeWidth={1.5} />
										<Text style={styles.imageAddBoxText}>
											{imageUris.length}/{MAX_IMAGES}
										</Text>
									</TouchableOpacity>
								)}
							</ScrollView>
						</View>
					</View>

					<TouchableOpacity
						style={[
							styles.writeSubmitButton,
							!isValid && styles.writeSubmitButtonDisabled,
						]}
						activeOpacity={0.85}
						onPress={handleSubmit}
					>
						<Text style={styles.writeSubmitText}>게시하기</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>

			<CustomAlert
				visible={alertConfig.visible}
				title={alertConfig.title}
				message={alertConfig.message}
				buttonText={alertConfig.buttonText}
				onPress={alertConfig.onPress}
				secondaryButtonText={alertConfig.secondaryButtonText}
				onSecondaryPress={alertConfig.onSecondaryPress}
				actions={alertConfig.actions}
				variant={alertConfig.variant}
				onRequestClose={closeAlert}
			/>

			<Bottom type="main" active="board" navigation={navigation} />
		</>
	);
}