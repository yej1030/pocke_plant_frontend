import React, {
	useContext,
	useState,
	useCallback,
} from 'react';

import {
	useFocusEffect,
} from '@react-navigation/native';

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Modal,
	Pressable,
} from 'react-native';
import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/Main.style';
import {
	PlantsContext,
} from '../context/PlantsContext';
import {
	getMyPlants,
	toggleBookmarkApi,
	deletePlantApi,
} from '../api/api';

export default function Main({
	navigation,
}) {
	// 식물 데이터 (use context as single source of truth)
	const {
		plants,
		removePlant,
		toggleBookmark,
		loadPlants,
	} = useContext(PlantsContext);

	useFocusEffect(
		useCallback(() => {
			loadPlants();
		}, [loadPlants])
	);

	// 커스텀 알림
	const {
		alertConfig,
		showAlert,
		closeAlert,
	} = useCustomAlert();

	// 액션 시트 상태
	const [
		actionVisible,
		setActionVisible,
	] = useState(false);

	const [
		selectedPlant,
		setSelectedPlant,
	] = useState(null);

	const [
		selectedPlantId,
		setSelectedPlantId,
	] = useState(null);

	// 수정 / 삭제 메뉴 열기
	const openActionSheet = (p) => {

		setSelectedPlant(p);

		setSelectedPlantId(p.id);

		setActionVisible(true);
	};

	// 수정 / 삭제 메뉴 닫기
	const closeActionSheet = () => {

		setActionVisible(false);

		setSelectedPlant(null);

		setSelectedPlantId(null);
	};

	// 수정 화면 이동
	const onEdit = () => {

		closeActionSheet();

		if (
			selectedPlant ||
			selectedPlantId
		) {

			navigation.navigate(
				'PlantRegister',
				{
					plant: selectedPlant,
					plantId: selectedPlantId,
				}
			);
		}
	};

	// 식물 삭제
	const onDelete = () => {

		const id =
			selectedPlantId;

		closeActionSheet();

		showAlert({
			title: '삭제',
			message: '삭제하시겠습니까?',
			variant: 'error',
			actions: [
				{
					text: '취소',
					kind: 'cancel',
				},
				{
					text: '삭제',
					kind: 'destructive',

					onPress: async () => {

	try {

		await deletePlantApi(id);

		console.log(
			'삭제 성공'
		);

		await loadPlants();

	} catch (error) {

		console.log(
			'삭제 실패:',
			error.response?.data
		);
	}
},
				},
			],
		});
	};

	// 북마크 식물 상단 정렬
	const sortedPlants = [...(plants || [])]

		.map((plant, index) => ({
			plant,
			index,
		}))

		.sort((left, right) => {

			const leftBookmarked =
				left.plant.bookmarked
					? 1
					: 0;

			const rightBookmarked =
				right.plant.bookmarked
					? 1
					: 0;

			if (
				leftBookmarked !==
				rightBookmarked
			) {
				return (
					rightBookmarked -
					leftBookmarked
				);
			}
			return (
				left.index -
				right.index
			);
		});

	return (
		<>
			<Header
				title="Pocket Plants"
				navigation={navigation}
				type="main"
			/>

			<View style={styles.container}>

				{/* 등록된 식물 없음 */}
				{plants.length === 0 ? (
					<Text
						style={{
							color: '#888',
							textAlign: 'center',
							marginTop: 20,
						}}
					>
						등록된 식물이 없습니다.
					</Text>
				) : (
					sortedPlants.map(
						({ plant: p }) => (

							<TouchableOpacity
								key={p.id}
								style={styles.plantCard}
								activeOpacity={0.85}
								onPress={() =>
									navigation.navigate(
										'PlantDetail',
										{
											plant: p,
											plantId: p.id,
										}
									)
								}
								onLongPress={() => {
									openActionSheet(p);
								}}
							>
								{/* 식물 이미지 */}
								{p.imageUri ? (
									<Image
										source={{
											uri: p.imageUri,
										}}
										style={
											styles.plantImage
										}
									/>
								) : (
									<Image
										source={require('../assets/persona.png')}
										style={
											styles.plantImage
										}
									/>
								)}

								{/* 식물 정보 */}
								<View
									style={styles.plantTextWrap}
								>

									<Text
										style={styles.plantName}
									>
										{p.name}
										{p.species
											? ` (${p.species})`
											: ''}
									</Text>

									<Text
										style={styles.plantMeta}
									>
										{p.adoptDate
											? p.adoptDate
											: ''}
										{p.age
											? ` / ${p.age}세`
											: ''}
									</Text>

								</View>

								{/* 북마크 */}
								<TouchableOpacity
									style={styles.settingsButton}
									onPress={async () => {

									console.log('북마크 클릭:', p.id);

									// optimistic update
									setPlants(prev =>
										prev.map(item =>
											item.id === p.id
												? { ...item, bookmarked: !item.bookmarked }
												: item
											)
										);

									try {
										const result = await toggleBookmarkApi(p.id);

										console.log('북마크 성공:', result);
									} catch (error) {
										console.log('북마크 실패:', error.response?.data);
										console.log('상태코드:', error.response?.status);
										console.log(error);

										// revert optimistic update
										setPlants(prev =>
											prev.map(item =>
												item.id === p.id
													? { ...item, bookmarked: !item.bookmarked }
													: item
											)
										);
									}
									} }
									activeOpacity={0.8}
								>

									<Image
										source={
											p.bookmarked
												? require('../assets/bookmarked.png')
												: require('../assets/unbookmarked.png')
										}
										style={styles.settingsIcon}
									/>

								</TouchableOpacity>

							</TouchableOpacity>
						)
					)
				)}

			</View>

			{/* 수정 / 삭제 액션 시트 */}
			<Modal
				visible={actionVisible}
				animationType="slide"
				transparent
				onRequestClose={
					closeActionSheet
				}
			>

				<Pressable
					style={styles.actionOverlay}
					onPress={closeActionSheet}
				/>

				<View style={styles.actionContainer}>

					<View
						style={styles.actionHandleWrap}
					>

						<View
							style={styles.actionHandle}
						/>

					</View>

					{/* 수정 */}
					<Pressable
						style={styles.actionItem}
						onPress={onEdit}
					>

						<Text style={styles.actionIcon}>
							✏️
						</Text>

						<Text style={styles.actionText}>
							수정
						</Text>

					</Pressable>

					<View
						style={styles.actionDivider}
					/>

					{/* 삭제 */}
					<Pressable
						style={styles.actionItem}
						onPress={onDelete}
					>

						<Text
							style={[
								styles.actionIcon,
								{
									color: '#B85C5C',
								},
							]}
						>
							🗑️
						</Text>

						<Text
							style={[
								styles.actionText,
								{
									color: '#B85C5C',
								},
							]}
						>
							삭제
						</Text>

					</Pressable>

					<View
						style={styles.actionSpacing}
					/>

					{/* 취소 */}
					<Pressable
						style={styles.actionCancel}
						onPress={closeActionSheet}
					>

						<Text
							style={styles.actionCancelText}
						>
							취소
						</Text>

					</Pressable>

				</View>

			</Modal>

			{/* 커스텀 알림 */}
			<CustomAlert
				visible={alertConfig.visible}
				title={alertConfig.title}
				message={alertConfig.message}
				buttonText={alertConfig.buttonText}
				onPress={alertConfig.onPress}
				secondaryButtonText={
					alertConfig.secondaryButtonText
				}
				onSecondaryPress={
					alertConfig.onSecondaryPress
				}
				actions={alertConfig.actions}
				variant={alertConfig.variant}
				onRequestClose={closeAlert}
			/>

			{/* 등록 버튼 */}
			<BottomButton
				title="식물 등록하기"
				onPress={() =>
					navigation.navigate(
						'PlantRegister'
					)
				}
			/>
		</>
	);
}