import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import { PlantsContext } from '../context/PlantsContext';
import styles from './style/PlantFriendship.style';
import { getAllPlantsAffinity } from '../api/api';

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

const TIER_NAMES = {
	1: '새친구',
	2: '친구',
	3: '좋은친구',
	4: '단짝',
};

function getTierName(level) {
	return TIER_NAMES[level] ?? TIER_NAMES[4];
}

// 친밀도 올리는 방법
const AFFINITY_GUIDE = [
	{ icon: '💬', label: 'AI와 대화하기', points: 2 },
	{ icon: '💧', label: '물주기 완료', points: 3 },
	{ icon: '📔', label: '일지 작성', points: 5 },
];

// ============================================================
// 친밀도 더미 데이터
// 등록된 식물 수만큼 자동으로 생성
// ============================================================
function buildMockAffinityList(plants) {
	return (plants || []).map((plant, index) => {
		const dummyData = [
			{
				level: 1,
				currentExp: 35,
				expForNextLevel: 100,
				todayEarned: 2,
			},
			{
				level: 2,
				currentExp: 68,
				expForNextLevel: 100,
				todayEarned: 5,
			},
			{
				level: 3,
				currentExp: 82,
				expForNextLevel: 100,
				todayEarned: 3,
			},
			{
				level: 4,
				currentExp: 95,
				expForNextLevel: 100,
				todayEarned: 0,
			},
		];

		return {
			plantId: plant.id,
			...dummyData[index % dummyData.length],
		};
	});
}

export default function PlantFriendship({ navigation }) {
	const { plants } = useContext(PlantsContext) || {};
	const plantList = Array.isArray(plants) ? plants : [];

	const [loading, setLoading] = useState(true);
	const [affinityList, setAffinityList] = useState([]);

	useEffect(() => {
		let isMounted = true;

		const load = async () => {
			setLoading(true);

			try {
				// 서버 API가 있으면 서버 데이터를 사용
				const data = await getAllPlantsAffinity();

				if (!isMounted) return;

				if (Array.isArray(data) && data.length > 0) {
					setAffinityList(data);
				} else {
					// 서버 데이터가 아직 없으면 더미 데이터 사용
					setAffinityList(buildMockAffinityList(plantList));
				}
			} catch (error) {
				console.log(
					'친밀도 API 조회 실패 → 더미 데이터를 사용합니다.',
					error?.message || error
				);

				if (!isMounted) return;

				// API 연결 전에는 더미 데이터 사용
				setAffinityList(buildMockAffinityList(plantList));
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		load();

		return () => {
			isMounted = false;
		};
	}, [plantList.length]);

	const getAffinityFor = plantId => {
		return affinityList.find(item => item.plantId === plantId);
	};

	return (
		<>
			<Header
				title="친밀도"
				navigation={navigation}
				type="full"
			/>

			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
			>
				<Text style={styles.sectionBadge}>
					전체 식물 친밀도
				</Text>

				{loading ? (
					<View style={styles.loadingWrap}>
						<ActivityIndicator color="#7FC77C" />
					</View>
				) : plantList.length === 0 ? (
					<View style={styles.emptyWrap}>
						<Text style={styles.emptyText}>
							아직 등록된 식물이 없습니다.
						</Text>

						<Text style={styles.emptySubText}>
							식물을 등록하면 친밀도를 확인할 수 있어요.
						</Text>
					</View>
				) : (
					plantList.map(plant => {
						const affinity = getAffinityFor(plant.id);

						const level = affinity?.level ?? 1;
						const currentExp = affinity?.currentExp ?? 0;
						const expForNextLevel =
							affinity?.expForNextLevel ?? 100;
						const todayEarned =
							affinity?.todayEarned ?? 0;

						const percent = Math.min(
							100,
							Math.round(
								(currentExp / expForNextLevel) * 100
							)
						);

						return (
							<View
								key={plant.id}
								style={styles.affCard}
							>
								<View style={styles.affCardTop}>
									<View style={styles.affPlantInfo}>
										<Image
											source={
												characterImages[
													plant.character_id
												]
											}
											style={styles.affPlantImage}
										/>

										<Text style={styles.affPlantName}>
											{plant.name}
										</Text>
									</View>

									<View style={styles.tierBadge}>
										<Text style={styles.tierBadgeText}>
											⭐ Lv.{level}{' '}
											{getTierName(level)}
										</Text>
									</View>
								</View>

								<View style={styles.gaugeTrack}>
									<View
										style={[
											styles.gaugeFill,
											{
												width: `${percent}%`,
											},
										]}
									/>
								</View>

								<View style={styles.affCardBottom}>
									<Text style={styles.affExpText}>
										{currentExp} / {expForNextLevel}
									</Text>

									{todayEarned > 0 ? (
										<Text style={styles.affTodayUp}>
											▲ +{todayEarned} 오늘
										</Text>
									) : (
										<Text style={styles.affTodayNone}>
											오늘 활동 없음
										</Text>
									)}
								</View>
							</View>
						);
					})
				)}

				{plantList.length > 0 && (
					<View style={styles.guideCard}>
						<Text style={styles.guideTitle}>
							친밀도 올리는 방법
						</Text>

						{AFFINITY_GUIDE.map(item => (
							<View
								key={item.label}
								style={styles.guideRow}
							>
								<Text style={styles.guideIcon}>
									{item.icon}
								</Text>

								<Text style={styles.guideLabel}>
									{item.label}
								</Text>

								<Text style={styles.guidePoints}>
									+{item.points}pt
								</Text>
							</View>
						))}
					</View>
				)}
			</ScrollView>

			<Bottom
				type="main"
				active="friend"
				navigation={navigation}
			/>
		</>
	);
}