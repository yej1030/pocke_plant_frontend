import React, { useState } from 'react';
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
import { IconCameraPlus, IconX } from '@tabler/icons-react-native';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/PlantDiary.style';
import { usePlantDiary, MOODS } from '../context/PlantDiaryContext';

const MAX_PHOTOS = 3;

// TODO: 실제 센서 API 연동 전까지 사용하는 임시 값
function getTodaySensorSnapshot() {
	return { temp: '24.8°C', humidity: '58%', soil: '양호' };
}

// 등록일(adoptDate) 기준 며칠째인지 계산. 정보 없으면 null
function calcDayCount(plant, existingDay) {
	if (existingDay) return existingDay;
	if (!plant?.adoptDate) return null;

	const adopted = new Date(plant.adoptDate);
	if (isNaN(adopted.getTime())) return null;

	const diffMs = Date.now() - adopted.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
	return diffDays > 0 ? diffDays : 1;
}

export default function PlantDiaryWrite({ navigation, route }) {
	const { plantId, plant, entry: editingEntry } = route?.params ?? {};
	const { addDiaryEntry, updateDiaryEntry } = usePlantDiary();
	const { alertConfig, showAlert, closeAlert } = useCustomAlert();

	const [photoUris, setPhotoUris] = useState(editingEntry?.photoUris ?? []);
	const [mood, setMood] = useState(editingEntry?.mood ?? null);
	const [note, setNote] = useState(editingEntry?.note ?? '');

	const isEditing = !!editingEntry;

	const handleAddPhoto = () => {
		if (photoUris.length >= MAX_PHOTOS) {
			showAlert({
				title: '최대 개수 초과',
				message: `사진은 최대 ${MAX_PHOTOS}장까지 첨부할 수 있어요.`,
				variant: 'warning',
			});
			return;
		}

		const remaining = MAX_PHOTOS - photoUris.length;

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
									setPhotoUris((prev) => [...prev, res.assets[0].uri]);
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
									setPhotoUris((prev) =>
										[...prev, ...newUris].slice(0, MAX_PHOTOS)
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

	const handleRemovePhoto = (index) => {
		setPhotoUris((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = () => {
		if (!note.trim()) {
			showAlert({
				title: '메모 필요',
				message: '오늘의 메모를 입력해주세요.',
				variant: 'warning',
			});
			return;
		}

		const entryData = {
			id: editingEntry?.id ?? String(Date.now()),
			plantId: editingEntry?.plantId ?? plantId,
			date: editingEntry?.date ?? new Date().toISOString(),
			day: calcDayCount(plant, editingEntry?.day),
			mood: mood ?? 'sprout',
			photoUris,
			note: note.trim(),
			sensorSnapshot: editingEntry?.sensorSnapshot ?? getTodaySensorSnapshot(),
		};

		if (isEditing) {
			updateDiaryEntry(entryData);
			navigation.goBack(); // 상세화면으로 복귀 (스택에 안 쌓임)
		} else {
			addDiaryEntry(entryData);
			navigation.replace('PlantDiaryDetail', {
				entryId: entryData.id,
				plantId,
				plant,
			});
		}
	};

	const isValid = note.trim().length > 0;

	return (
		<>
			<Header
				title={isEditing ? '일지 수정하기' : '일지 작성하기'}
				navigation={navigation}
				type="full"
			/>

			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
			>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.formContent}
					keyboardShouldPersistTaps="handled"
				>
					<Text style={styles.formLabel}>
						사진 <Text style={styles.formLabelOpt}>선택, 최대 {MAX_PHOTOS}장</Text>
					</Text>

					<View style={styles.photoRow}>
						{photoUris.map((uri, index) => (
							<View key={uri + index} style={styles.photoThumbWrap}>
								<Image source={{ uri }} style={styles.photoThumb} />
								<TouchableOpacity
									style={styles.photoRemoveBtn}
									onPress={() => handleRemovePhoto(index)}
									activeOpacity={0.8}
								>
									<IconX size={12} color="#FFFFFF" strokeWidth={2.5} />
								</TouchableOpacity>
							</View>
						))}

						{photoUris.length < MAX_PHOTOS && (
							<TouchableOpacity
								style={styles.photoAddBox}
								onPress={handleAddPhoto}
								activeOpacity={0.85}
							>
								<IconCameraPlus size={20} color="#7fc77c" strokeWidth={1.5} />
								<Text style={styles.photoAddBoxText}>
									{photoUris.length}/{MAX_PHOTOS}
								</Text>
							</TouchableOpacity>
						)}
					</View>

					<Text style={styles.formLabel}>
						오늘 기분 <Text style={styles.formLabelOpt}>선택</Text>
					</Text>

					<View style={styles.moodPickRow}>
						{MOODS.map((m) => {
							const isActive = mood === m.key;
							return (
								<TouchableOpacity
									key={m.key}
									style={[styles.moodChip, isActive && styles.moodChipActive]}
									activeOpacity={0.85}
									onPress={() => setMood(isActive ? null : m.key)}
								>
									<Text style={styles.moodChipEmoji}>{m.emoji}</Text>
									<Text
										style={[
											styles.moodChipText,
											isActive && styles.moodChipTextActive,
										]}
									>
										{m.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<Text style={styles.formLabel}>
						메모 <Text style={styles.formLabelOpt}>필수</Text>
					</Text>

					<TextInput
						value={note}
						onChangeText={setNote}
						placeholder="오늘 식물은 어땠나요? 잎 상태, 물 준 시간, 느낀 점을 자유롭게 적어보세요."
						placeholderTextColor="#B8B8B8"
						style={styles.noteInput}
						multiline
						textAlignVertical="top"
						maxLength={300}
					/>
					<Text style={styles.noteCount}>{note.length}/300</Text>

					<View style={styles.sensorInfoCard}>
						<Text style={styles.sensorInfoText}>
							오늘의 센서 스냅샷이 자동으로 함께 저장돼요.{'\n'}
							🌡️ {getTodaySensorSnapshot().temp} · 💧{' '}
							{getTodaySensorSnapshot().humidity} · 🌱{' '}
							{getTodaySensorSnapshot().soil}
						</Text>
					</View>

					<TouchableOpacity
						style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
						activeOpacity={0.85}
						onPress={handleSubmit}
					>
						<Text style={styles.submitButtonText}>
							{isEditing ? '저장하기' : '등록하기'}
						</Text>
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

			<Bottom
				type="detail"
				active="diary"
				navigation={navigation}
				params={{ plantId, plant }}
			/>
		</>
	);
}