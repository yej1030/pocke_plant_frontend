import React, { useCallback, useMemo } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconPlus, IconChevronRight } from '@tabler/icons-react-native';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/PlantDiary.style';
import { usePlantDiary, MOODS } from '../context/PlantDiaryContext';
import { formatDate } from './boardUtils';

function moodInfo(key) {
	return MOODS.find((m) => m.key === key) ?? MOODS[0];
}

export default function PlantDiary({ navigation, route }) {
	const { plantId, plant } = route?.params ?? {};
	const { getDiaryEntriesByPlant } = usePlantDiary();

	const entries = useMemo(
		() => getDiaryEntriesByPlant(plantId),
		[getDiaryEntriesByPlant, plantId]
	);

	const handleBackToHome = useCallback(() => {
		navigation.navigate('Main');
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

	const renderEntry = ({ item, index }) => {
		const isLast = index === entries.length - 1;
		const mood = moodInfo(item.mood);
		const thumb = item.photoUris?.[0];

		return (
			<TouchableOpacity
				style={styles.entryRow}
				activeOpacity={0.85}
				onPress={() =>
					navigation.navigate('PlantDiaryDetail', {
						entryId: item.id,
						plantId,
						plant,
					})
				}
			>
				<View style={styles.dotCol}>
					<View style={styles.dot} />
					{!isLast && <View style={styles.dotLine} />}
				</View>

				<View style={styles.entryContent}>
					<Text style={styles.entryDate}>
						{formatDate(item.date)}
						{item.day ? ` · ${item.day}일째` : ''}
					</Text>

					{thumb ? (
						<Image source={{ uri: thumb }} style={styles.entryImage} />
					) : (
						<View style={styles.entryImagePlaceholder} />
					)}

					<View style={styles.entryNoteRow}>
						<Text style={styles.entryMoodEmoji}>{mood.emoji}</Text>
						<Text style={styles.entryNote} numberOfLines={2}>
							{item.note}
						</Text>
					</View>
				</View>

				<IconChevronRight size={16} color="#C4C4C4" strokeWidth={1.75} />
			</TouchableOpacity>
		);
	};

	return (
		<>
			<Header
				title={plant?.name ? `${plant.name}의 일지` : '성장일지'}
				navigation={navigation}
				type="full"
				onBackPress={handleBackToHome}
			/>

			<View style={styles.container}>
				<Text style={styles.countBadge}>
					{plant?.name ? `${plant.name}의 성장 기록` : '성장 기록'} · 총{' '}
					{entries.length}개
				</Text>

				<FlatList
					style={styles.listFlex}
					data={entries}
					keyExtractor={(item) => item.id}
					renderItem={renderEntry}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={
						<View style={styles.emptyWrap}>
							<Text style={styles.emptyEmoji}>🌱</Text>
							<Text style={styles.emptyText}>
								아직 작성된 일지가 없어요.{'\n'}오늘 있었던 일을 기록해보세요!
							</Text>
						</View>
					}
				/>

				<TouchableOpacity
					style={styles.writeButton}
					activeOpacity={0.85}
					onPress={() =>
						navigation.navigate('PlantDiaryWrite', { plantId, plant })
					}
				>
					<IconPlus size={24} color="#FFFFFF" strokeWidth={2} />
				</TouchableOpacity>
			</View>

			<Bottom
				type="detail"
				active="diary"
				navigation={navigation}
				params={{ plantId, plant }}
			/>
		</>
	);
}