import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/PlantFriendship.style';
import { getMyPlants } from '../api/api';

// 캐릭터 이미지 매핑
const characterImages = {
  1: { happy: require('../assets/Plant/plant_01_happy.png') },
  2: { happy: require('../assets/Plant/plant_03_happy.png') },
  3: { happy: require('../assets/Plant/plant_05_happy.png') },
  4: { happy: require('../assets/Plant/plant_07_happy.png') },
  5: { happy: require('../assets/Plant/plant_09_happy.png') },
  6: { happy: require('../assets/Plant/plant_11_happy.png') },
  7: { happy: require('../assets/Plant/plant_13_happy.png') },
  8: { happy: require('../assets/Plant/plant_15_happy.png') },
  9: { happy: require('../assets/Plant/plant_17_happy.png') },
  10: { happy: require('../assets/Plant/plant_19_happy.png') },
};

// 5단계 아가 성장 레벨 계산 함수
function getGrowthLevelInfo(score = 0) {
  if (score <= 20) {
    return { level: 'Lv.1', name: '씨앗 아가 🌱', color: '#8EA798', bgColor: '#F1F5F3' };
  } else if (score <= 45) {
    return { level: 'Lv.2', name: '꼬꼬마 새싹 🌿', color: '#2E6D32', bgColor: '#E8F7EF' };
  } else if (score <= 70) {
    return { level: 'Lv.3', name: '무럭무럭 줄기 🪴', color: '#2563EB', bgColor: '#EFF6FF' };
  } else if (score <= 90) {
    return { level: 'Lv.4', name: '꽃봉오리 단짝 🌷', color: '#DB2777', bgColor: '#FDF2F8' };
  } else {
    return { level: 'Lv.5', name: '만개한 소울메이트 🌸', color: '#D97706', bgColor: '#FFFBEB' };
  }
}

// 친밀도 미션 안내 목록
const INTIMACY_GUIDES = [
  { icon: '📅', label: '매일 첫 접속', points: '+1점', sub: '(하루 1회)' },
  { icon: '💧', label: '물 주기', points: '+3점', sub: '' },
  { icon: '💬', label: 'AI 식물과 대화', points: '+2점', sub: '(하루 1회)' },
  { icon: '📝', label: '식물 일지 작성', points: '+3점', sub: '' },
  { icon: '❤️', label: '식물 쓰다듬기(관심)', points: '+1점', sub: '(하루 1회)' },
  { icon: '🔎', label: '식물 질병 진단하기', points: '+4점', sub: '' },
];

export default function PlantFriendship({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const data = await getMyPlants();
        setPlants(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('식물 친밀도 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <>
      <Header title="친밀도 관리" navigation={navigation} type="full" />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.sectionBadge}>내 반려식물 성장도</Text>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color="#7FC77C" />
          </View>
        ) : plants.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>등록된 반려식물이 없습니다.</Text>
            <Text style={styles.emptySubText}>먼저 홈에서 식물을 등록해주세요!</Text>
          </View>
        ) : (
          plants.map(plant => {
            const currentIntimacy = Number(plant.intimacy || 0);
            const growth = getGrowthLevelInfo(currentIntimacy);

            return (
              <TouchableOpacity
                key={plant.id}
                style={styles.affCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('PlantDetail', { plantId: plant.id })}
              >
                {/* 상단: 이미지, 이름, 레벨 뱃지 */}
                <View style={styles.affCardTop}>
                  <View style={styles.affPlantInfo}>
                    <Image
                      source={characterImages[plant.character_id || 1]?.happy}
                      style={styles.affPlantImage}
                    />
                    <View>
                      <Text style={styles.affPlantName}>{plant.name}</Text>
                    </View>
                  </View>

                  {/* 성장 레벨 뱃지 */}
                  <View style={[styles.tierBadge, { backgroundColor: growth.bgColor }]}>
                    <Text style={[styles.tierBadgeText, { color: growth.color }]}>
                      {growth.level} {growth.name}
                    </Text>
                  </View>
                </View>

                {/* 게이지 바 (0~100점) */}
                <View style={styles.gaugeTrack}>
                  <View
                    style={[
                      styles.gaugeFill,
                      {
                        width: `${Math.min(100, Math.max(0, currentIntimacy))}%`,
                        backgroundColor: growth.color,
                      },
                    ]}
                  />
                </View>

                {/* 하단 점수 안내 */}
                <View style={styles.affCardBottom}>
                  <Text style={styles.affExpText}>친밀도 {currentIntimacy} / 100</Text>
                  <Text style={[styles.affTodayUp, { color: growth.color }]}>
                    {currentIntimacy >= 100 ? '최고 레벨 도달! 🎉' : '쑥쑥 자라는 중 🌱'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* 하단: 친밀도 올리는 방법 가이드 카드 */}
        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>친밀도 올리는 방법 (총 100점)</Text>

          {INTIMACY_GUIDES.map(item => (
            <View key={item.label} style={styles.guideRow}>
              <Text style={styles.guideIcon}>{item.icon}</Text>
              <Text style={styles.guideLabel}>
                {item.label}{' '}
                {item.sub ? (
                  <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{item.sub}</Text>
                ) : null}
              </Text>
              <Text style={styles.guidePoints}>{item.points}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Bottom active="friendship" navigation={navigation} />
    </>
  );
}