import React, {
	useContext,
	useCallback,
	useRef,
	useEffect,
} from 'react';

import {
	useFocusEffect,
} from '@react-navigation/native';

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
	Easing,
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
	toggleBookmarkApi,
	deletePlantApi,
} from '../api/api';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const characterImages = {
	1: require('../assets/Plant/plant_01_happy.png'),
	2: require('../assets/Plant/plant_03_happy.png'),
	3: require('../assets/Plant/plant_05_happy.png'),
	4: require('../assets/Plant/plant_07_happy.png'),
	5: require('../assets/Plant/plant_09_happy.png'),
	6: require('../assets/Plant/plant_11_happy.png'),
	7: require('../assets/Plant/plant_13_happy.png'),
	8: require('../assets/Plant/plant_15_happy.png'),
	9: require('../assets/Plant/plant_17_happy.png'),
	10: require('../assets/Plant/plant_19_happy.png'),
};

// 카드가 한 줄씩 아래에서 위로 스며들 듯 등장
function AnimatedPlantCard({ index, children }) {
	const enterAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(enterAnim, {
			toValue: 1,
			duration: 420,
			delay: index * 80,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<Animated.View
			style={{
				opacity: enterAnim,
				transform: [
					{
						translateY: enterAnim.interpolate({
							inputRange: [0, 1],
							outputRange: [16, 0],
						}),
					},
				],
			}}
		>
			{children}
		</Animated.View>
	);
}

function BookmarkButton({ bookmarked, onPress, style, iconStyle }) {
	return (
		<TouchableOpacity
			style={style}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Image
				source={
					bookmarked
						? require('../assets/icon/bookmarked.png')
						: require('../assets/icon/unbookmarked.png')
				}
				style={iconStyle}
			/>
		</TouchableOpacity>
	);
}


export default function Main({
	navigation,
}) {
	// 식물 데이터 (use context as single source of truth)
	const {
		plants,
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

	const renderRightActions = (plant) => {
	return (
		<View style={styles.swipeActionContainer}>
			<TouchableOpacity style={styles.editAction}
				onPress={() => {
					navigation.navigate(
						'PlantRegister',
						{
							plant,
							plantId: plant.id,
						}
					);
				}}
			>
				<Text style={styles.swipeActionText}
				>
					수정
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.deleteAction}
				onPress={() => {

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
										await deletePlantApi(
											plant.id
										);

										await loadPlants();

									} catch (error) {

										console.log(
											error
										);
									}
								},
							},
						],
					});
				}}
			>
				<Text
					style={styles.swipeActionText}
				>
					삭제
				</Text>
			</TouchableOpacity>
		</View>
	);
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
					sortedPlants.map(({ plant: p }, idx) => (
<AnimatedPlantCard key={p.id} index={idx}>

	<Swipeable
		renderRightActions={() =>
			renderRightActions(p)
		}
		overshootRight={false}
	>

		<TouchableOpacity
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
							>

								{/* 식물 이미지 */}
								<Image
									source={
										characterImages[
										p.character_id
										]
									}
									style={styles.plantImage}
								/>

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
								<BookmarkButton
									bookmarked={p.bookmarked}
									style={styles.settingsButton}
									iconStyle={styles.settingsIcon}
									onPress={async () => {

										console.log('북마크 클릭:', p.id);


										try {
											const result = await toggleBookmarkApi(p.id);

											console.log('북마크 성공:', result);
											await loadPlants();
										} catch (error) {
											console.log('북마크 실패:', error.response?.data);
											console.log('상태코드:', error.response?.status);
											console.log(error);

										}
									}}
								/>

							</TouchableOpacity>
							</Swipeable>

						</AnimatedPlantCard>
					)
					)
				)}

			</View>

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