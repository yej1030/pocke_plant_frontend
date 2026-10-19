import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

import { LineChart } from 'react-native-gifted-charts';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import { PlantsContext } from '../context/PlantsContext';
import styles from './style/PlantDetail.style';

import {
  createAiChatRoom,
  sendAiMessage,
  getLatestSensorData,
  getSensorHistory,
  getPlantEnv,
  increasePlantIntimacy,
} from '../api/api';

const screenWidth = Dimensions.get('window').width;

const characterImages = {
  1: {
    happy: require('../assets/Plant/plant_01_happy.png'),
    sad: require('../assets/Plant/plant_02_sad.png'),
  },
  2: {
    happy: require('../assets/Plant/plant_03_happy.png'),
    sad: require('../assets/Plant/plant_04_sad.png'),
  },
  3: {
    happy: require('../assets/Plant/plant_05_happy.png'),
    sad: require('../assets/Plant/plant_06_sad.png'),
  },
  4: {
    happy: require('../assets/Plant/plant_07_happy.png'),
    sad: require('../assets/Plant/plant_08_sad.png'),
  },
  5: {
    happy: require('../assets/Plant/plant_09_happy.png'),
    sad: require('../assets/Plant/plant_10_sad.png'),
  },
  6: {
    happy: require('../assets/Plant/plant_11_happy.png'),
    sad: require('../assets/Plant/plant_12_sad.png'),
  },
  7: {
    happy: require('../assets/Plant/plant_13_happy.png'),
    sad: require('../assets/Plant/plant_14_sad.png'),
  },
  8: {
    happy: require('../assets/Plant/plant_15_happy.png'),
    sad: require('../assets/Plant/plant_16_sad.png'),
  },
  9: {
    happy: require('../assets/Plant/plant_17_happy.png'),
    sad: require('../assets/Plant/plant_18_sad.png'),
  },
  10: {
    happy: require('../assets/Plant/plant_19_happy.png'),
    sad: require('../assets/Plant/plant_20_sad.png'),
  },
};

export default function PlantDetail({ navigation, route }) {
  const { plants } = useContext(PlantsContext);

  const plant = useMemo(() => {
    if (route?.params?.plant) {
      return route.params.plant;
    }
    if (route?.params?.plantId) {
      return plants.find(item => item.id === route.params.plantId);
    }
    return null;
  }, [plants, route]);

  const title = plant?.name || '식물 상세';

  const [isHardwareConnected, setIsHardwareConnected] = useState(
    route?.params?.hardwareConnected || !!route?.params?.plant?.macAddress
  );

  const [speechMessage, setSpeechMessage] = useState('오늘은\n기분이 좋아요!');
  const [roomId, setRoomId] = useState(null);
  const [isRoomCreating, setIsRoomCreating] = useState(false);
  const [mood, setMood] = useState('happy');

  const [sensorData, setSensorData] = useState(null);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [plantEnv, setPlantEnv] = useState(null);

  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;
  const [showHeart, setShowHeart] = useState(false);

  // 친밀도 상태
  const [intimacy, setIntimacy] = useState(plant?.intimacy || 0);

  const getAiText = answer => {
    if (typeof answer === 'string') {
      return answer;
    }
    return (
      answer?.answer ??
      answer?.choices?.[0]?.message?.content ??
      '응답 없음'
    );
  };

  function getGrowthLevelInfo(score = 0) {
  if (score <= 20) {
    return { level: 'Lv.1', name: '씨앗 아가 🌱', title: '새싹 트는 중', color: '#8EA798' };
  } else if (score <= 45) {
    return { level: 'Lv.2', name: '꼬꼬마 새싹 🌿', title: '호기심 가득', color: '#7FC77C' };
  } else if (score <= 70) {
    return { level: 'Lv.3', name: '무럭무럭 줄기 🪴', title: '주인님 바라기', color: '#4CAF50' };
  } else if (score <= 90) {
    return { level: 'Lv.4', name: '꽃봉오리 단짝 🌷', title: '마음을 나눈 친구', color: '#FF70A6' };
  } else {
    return { level: 'Lv.5', name: '만개한 소울메이트 🌸', title: '평생 반려식물', color: '#FF9F43' };
  }
}

  useEffect(() => {
    if (route?.params?.hardwareConnected || plant?.macAddress) {
      setIsHardwareConnected(true);
    }
  }, [route?.params?.hardwareConnected, plant?.macAddress]);

  // 캐릭터 둥둥 떠 있는 애니메이션
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  // [친밀도] 1. 매일 최초 접속 (+1점)
  useEffect(() => {
    if (plant?.id) {
      increasePlantIntimacy(plant.id, 'DAILY_LOGIN')
        .then(updatedPlant => {
          if (updatedPlant?.intimacy != null) {
            setIntimacy(updatedPlant.intimacy);
          }
        })
        .catch(err => console.log('접속 친밀도 처리 실패', err));
    }
  }, [plant?.id]);

  // AI 채팅방 생성
  useEffect(() => {
    const createRoom = async () => {
      if (!plant?.id) {
        console.log('plant.id가 없어 채팅방을 생성할 수 없습니다.');
        return;
      }
      try {
        setIsRoomCreating(true);
        const room = await createAiChatRoom(plant.id);
        console.log('식물 상세 채팅방 생성:', room);
        setRoomId(room.id);
      } catch (error) {
        console.log('채팅방 생성 실패', error.response?.data || error.message);
      } finally {
        setIsRoomCreating(false);
      }
    };
    createRoom();
  }, [plant?.id]);

  // 최신 센서 데이터 및 히스토리 조회 (5초 주기)
  useEffect(() => {
    if (!isHardwareConnected) return;
    if (!plant?.macAddress) {
      console.log('MAC 주소가 없어 센서 데이터를 조회할 수 없습니다.');
      return;
    }

    let isMounted = true;

    const fetchSensorData = async () => {
      try {
        const latest = await getLatestSensorData(plant.macAddress);
        const history = await getSensorHistory(plant.macAddress);

        if (isMounted) {
          setSensorData(latest);
          setSensorHistory(Array.isArray(history) ? history : []);

          // 식물별 임계치(waterThreshold) 기반 목마름 판별
          const threshold = plantEnv?.waterThreshold ?? 30;

          if (typeof latest?.soil === 'number' && latest.soil <= threshold) {
            setMood('sad');
            setSpeechMessage('목이 말라요.\n물을 조금 주세요 💧');
          } else {
            setMood('happy');
          }
        }
      } catch (error) {
        console.log('센서 조회 실패', error.response?.data || error.message);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isHardwareConnected, plant?.macAddress, plantEnv?.waterThreshold]);

  // 식물 적정 환경 데이터 조회
  useEffect(() => {
    if (!isHardwareConnected) return;

    const searchName = plant?.species || plant?.name;
    if (!searchName) return;

    const fetchEnv = async () => {
      try {
        const env = await getPlantEnv(searchName);
        console.log('식물 환경 데이터:', env);
        setPlantEnv(env);
      } catch (error) {
        console.log(
          '식물 환경 데이터 조회 실패',
          error.response?.data || error.message
        );
        setPlantEnv(null);
      }
    };

    fetchEnv();
  }, [plant?.species, plant?.name, isHardwareConnected]);

  if (!plant) {
    return (
      <>
        <Header title={title} navigation={navigation} type="full" />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>식물 정보를 찾을 수 없습니다.</Text>
        </View>
      </>
    );
  }

  // [친밀도] 2. 식물 터치/관심 주기 (+1점)
  const petPlant = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setShowHeart(true);
    heartAnim.setValue(0);
    Animated.timing(heartAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setShowHeart(false);
    });

    try {
      if (!plant?.id) return;
      const updatedPlant = await increasePlantIntimacy(plant.id, 'CARE_ATTENTION');
      setIntimacy(updatedPlant.intimacy);
    } catch (error) {
      console.log('친밀도 증가 실패', error.response?.data || error.message);
    }
  };

  // [친밀도] 3. 물 주기 버튼 클릭 시 (+3점)
  const handleWatering = async () => {
    if (!plant?.id) return;
    try {
      const updatedPlant = await increasePlantIntimacy(plant.id, 'WATERING');
      setIntimacy(updatedPlant.intimacy);
      setSpeechMessage('시원해요! 물을 줘서 고마워요 💧');
      setMood('happy');
    } catch (error) {
      console.log('물주기 친밀도 처리 실패', error);
    }
  };

  // [친밀도] 4. AI 질문 및 대화 완료 시 (+2점)
  const askPlant = async question => {
    if (isRoomCreating) {
      setSpeechMessage('잠깐만요, 대화 준비 중이에요 🌱');
      return;
    }
    if (!roomId) {
      setSpeechMessage('아직 대화방이 준비되지 않았어요 😢');
      return;
    }

    setSpeechMessage('생각중...');

    try {
      const answer = await sendAiMessage(roomId, question);
      const content = getAiText(answer);
      setSpeechMessage(content);

      if (
        content.includes('좋') ||
        content.includes('행복') ||
        content.includes('고마') ||
        content.includes('괜찮') ||
        content.includes('기뻐')
      ) {
        setMood('happy');
      } else if (
        content.includes('목말') ||
        content.includes('부족') ||
        content.includes('힘들') ||
        content.includes('아파') ||
        content.includes('싫') ||
        content.includes('시들')
      ) {
        setMood('sad');
      } else {
        setMood('happy');
      }

      // 대화 성공 시 친밀도 +2점 가산
      if (plant?.id) {
        const updatedPlant = await increasePlantIntimacy(plant.id, 'AI_CHAT');
        setIntimacy(updatedPlant.intimacy);
      }
    } catch (error) {
      console.log('AI 응답 실패:', error.response?.data || error.message);
      setSpeechMessage('지금은 대답할 수 없어요 😢');
      setMood('sad');
    }
  };

  // 센서 지표 및 적정 수치 매핑 (토양수분 % 및 조도 lx)
  const stats = [
    {
      type: 'soil',
      label: '토양 수분',
      value: sensorData?.soil != null ? Math.round(sensorData.soil) : '-',
      target:
        plantEnv?.targetMoistureMin && plantEnv?.targetMoistureMax
          ? `${plantEnv.targetMoistureMin}~${plantEnv.targetMoistureMax}`
          : (plantEnv?.waterCycleSpring ?? '-'),
      unit: '%',
      icon: require('../assets/sensor/sensor_soil.png'),
      max: 100, // 백분율 기준 100%
    },
    {
      type: 'temperature',
      label: '온도',
      value:
        sensorData?.temperature != null
          ? Number(sensorData.temperature).toFixed(1)
          : '-',
      target: plantEnv?.growhTp ?? '-',
      unit: '°C',
      icon: require('../assets/sensor/sensor_temp.png'),
      max: 50,
    },
    {
      type: 'humidity',
      label: '습도',
      value: sensorData?.humidity != null ? Math.round(sensorData.humidity) : '-',
      target: plantEnv?.humidity ?? '-',
      unit: '%',
      icon: require('../assets/sensor/sensor_humidity.png'),
      max: 100,
    },
    {
      type: 'light',
      label: '조도',
      value: sensorData?.light != null ? Math.round(sensorData.light) : '-',
      target:
        plantEnv?.minLux && plantEnv?.maxLux
          ? `${plantEnv.minLux}~${plantEnv.maxLux}`
          : '-',
      unit: 'lx',
      icon: require('../assets/sensor/sensor_light.png'),
      max: 10000,
    },
  ];

  const sampledHistory =
    sensorHistory.length > 120
      ? sensorHistory.filter((_, index) => {
          const step = Math.ceil(sensorHistory.length / 120);
          return index % step === 0;
        })
      : sensorHistory;

  const chartConfigs = [
    {
      type: 'soil',
      title: '토양 수분 전체 변화',
      unit: '%',
      color: '#7fc77c',
    },
    {
      type: 'temperature',
      title: '온도 전체 변화',
      unit: '°C',
      color: '#FF9F43',
    },
    {
      type: 'humidity',
      title: '습도 전체 변화',
      unit: '%',
      color: '#4D96FF',
    },
    {
      type: 'light',
      title: '조도 전체 변화',
      unit: 'lx',
      color: '#F6C343',
    },
  ];

  const getChartValues = type => {
    return sampledHistory
      .map(item => Number(item?.[type]))
      .filter(value => Number.isFinite(value));
  };

  const makeSingleChartData = type => {
    const values = getChartValues(type);
    const min = values.length > 0 ? Math.min(...values) : 0;
    const max = values.length > 0 ? Math.max(...values) : 1;
    const range = max - min;
    const padding =
      range <= 0 ? Math.max(max * 0.05, 1) : Math.max(range * 0.25, 1);
    const graphMin = Math.max(0, min - padding);
    const graphMax = max + padding;
    const graphMaxValue = Math.max(graphMax - graphMin, 1);

    const data = sampledHistory.map((item, index) => {
      const rawValue = Number(item?.[type]);
      const safeValue = Number.isFinite(rawValue) ? rawValue : min;
      const isFirst = index === 0;
      const isLast = index === sampledHistory.length - 1;

      return {
        value: safeValue - graphMin,
        rawValue: safeValue,
        label: isFirst || isLast ? formatTimeShort(item?.regDate) : '',
      };
    });

    return {
      data,
      graphMaxValue,
      min,
      max,
    };
  };

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const latestUpdatedText = sensorData?.regDate
    ? formatDateTime(sensorData.regDate)
    : '아직 데이터 없음';

  return (
    <>
      <Header title={title} navigation={navigation} type="full" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroBlobTopRight} />
          <View style={styles.heroBlobBottomLeft} />

          {showHeart && (
            <Animated.Text
              style={{
                position: 'absolute',
                top: 100,
                zIndex: 999,
                fontSize: 20,
                opacity: heartAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    translateY: heartAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                ],
              }}
            >
              ❤️
            </Animated.Text>
          )}

          {/* 🍼 [교체된 부분] 아가 성장 레벨 카드 */}
          {(() => {
            const growth = getGrowthLevelInfo(intimacy);
            return (
              <View style={styles.growthCard}>
                <View style={styles.growthHeader}>
                  <View style={styles.growthLevelBadge}>
                    <Text style={[styles.growthLevelText, { color: growth.color }]}>
                      {growth.level} {growth.name}
                    </Text>
                  </View>
                  <Text style={styles.growthScoreText}>
                    {intimacy} / 100
                  </Text>
                </View>

                {/* 성장 게이지 바 */}
                <View style={styles.growthBarTrack}>
                  <View
                    style={[
                      styles.growthBarFill,
                      {
                        width: `${Math.min(100, Math.max(0, intimacy))}%`,
                        backgroundColor: growth.color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })()}

          {/* 말풍선 */}
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{speechMessage}</Text>
          </View>

          {/* 캐릭터 이미지 (터치 시 관심 주기 친밀도 +1) */}
          <TouchableOpacity activeOpacity={1} onPress={petPlant}>
            <Animated.Image
              source={
                characterImages[plant.character_id || 1]?.[mood]
              }
              style={[
                styles.heroImage,
                {
                  transform: [
                    { translateY: floatTranslate },
                    { scale: scaleAnim },
                  ],
                },
              ]}
            />
          </TouchableOpacity>

          {/* 빠른 질문 리스트 */}
          <View style={styles.quickReplyWrap}>
            {['물 줄까?', '햇빛은 안 부족해?', '기분이 어때?'].map(text => (
              <TouchableOpacity
                key={text}
                style={styles.quickReplyButton}
                activeOpacity={0.85}
                onPress={() => askPlant(text)}
              >
                <Text style={styles.quickReplyText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate('Chat', { plant });
            }}
          >
            <Text style={styles.actionText}>💬 대화하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionPrimary]}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate('DiseasePredict', { plant });
            }}
          >
            <Text style={styles.actionPrimaryText}>🔎 진단하기</Text>
          </TouchableOpacity>
        </View>

        {!isHardwareConnected && (
          <TouchableOpacity
            style={styles.hardwareButton}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate('HardwareConnect', { plant });
            }}
          >
            <Text style={styles.hardwareText}>+ 하드웨어 연결하기</Text>
          </TouchableOpacity>
        )}

        {isHardwareConnected ? (
          <>
            <View style={styles.summaryCard}>
              <View>
                <Text style={styles.summaryTitle}>실시간 환경 상태</Text>
                <Text style={styles.summarySubText}>
                  마지막 업데이트 {latestUpdatedText}
                </Text>
              </View>

              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>

            {/* 4분할 센서 요약 카드 */}
            <View style={styles.statsGrid}>
              {stats.map(item => {
                const numericValue =
                  typeof item.value === 'number'
                    ? item.value
                    : Number(item.value);

                const barValue = Number.isFinite(numericValue)
                  ? Math.min(
                      Math.max((numericValue / item.max) * 100, 0),
                      100
                    )
                  : 0;

                return (
                  <TouchableOpacity
                    key={item.label}
                    style={styles.miniSensorCard}
                    activeOpacity={0.85}
                  >
                    <View style={styles.miniSensorHeader}>
                      <Image source={item.icon} style={styles.miniSensorIcon} />
                      <Text style={styles.miniSensorLabel}>{item.label}</Text>
                    </View>

                    <Text style={styles.miniSensorValue}>
                      {item.value}
                      <Text style={styles.miniSensorUnit}>{item.unit}</Text>
                    </Text>

                    <Text style={styles.miniSensorTarget}>
                      적정 {item.target}
                      {item.unit}
                    </Text>

                    <View style={styles.miniBarTrack}>
                      <View
                        style={[
                          styles.miniBarFill,
                          { width: `${barValue}%` },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 꺾은선 그래프 영역 */}
            <View style={styles.chartsSection}>
              <Text style={styles.sectionTitle}>센서 전체 변화</Text>
              <Text style={styles.sectionSubText}>
                처음부터 현재까지 전체 {sensorHistory.length}개 데이터
              </Text>

              {chartConfigs.map(config => {
                const chart = makeSingleChartData(config.type);
                const latestValue = sensorData?.[config.type];

                return (
                  <View key={config.type} style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.chartTitle}>{config.title}</Text>
                        <Text style={styles.chartSubText}>
                          최저{' '}
                          {formatSensorValue(chart.min, config.type)}
                          {config.unit} · 최고{' '}
                          {formatSensorValue(chart.max, config.type)}
                          {config.unit}
                        </Text>
                      </View>

                      <Text style={styles.chartCurrentValue}>
                        {formatSensorValue(latestValue, config.type)}
                        <Text style={styles.chartCurrentUnit}>
                          {config.unit}
                        </Text>
                      </Text>
                    </View>

                    {chart.data.length >= 2 ? (
                      <LineChart
                        data={chart.data}
                        areaChart
                        curved
                        hideDataPoints={chart.data.length > 20}
                        thickness={3}
                        color={config.color}
                        startFillColor={config.color}
                        endFillColor="#FFFFFF"
                        startOpacity={0.25}
                        endOpacity={0.02}
                        height={150}
                        width={screenWidth - 80}
                        spacing={chart.data.length > 40 ? 8 : 34}
                        initialSpacing={8}
                        endSpacing={18}
                        noOfSections={4}
                        yAxisColor="transparent"
                        xAxisColor="#E9EFEA"
                        rulesColor="#EEF4F0"
                        yAxisTextStyle={styles.chartAxisText}
                        xAxisLabelTextStyle={styles.chartAxisText}
                        maxValue={chart.graphMaxValue}
                        animateOnDataChange
                        animationDuration={500}
                        pointerConfig={{
                          pointerStripHeight: 130,
                          pointerStripColor: '#A6DDB9',
                          pointerStripWidth: 2,
                          pointerColor: config.color,
                          radius: 5,
                          pointerLabelWidth: 100,
                          pointerLabelHeight: 45,
                          activatePointersOnLongPress: true,
                          autoAdjustPointerLabelPosition: true,
                          pointerLabelComponent: items => {
                            const rawValue = items?.[0]?.rawValue;
                            return (
                              <View style={styles.pointerLabel}>
                                <Text style={styles.pointerLabelText}>
                                  {formatSensorValue(rawValue, config.type)}
                                  {config.unit}
                                </Text>
                              </View>
                            );
                          },
                        }}
                      />
                    ) : (
                      <View style={styles.chartEmpty}>
                        <Text style={styles.chartEmptyText}>
                          그래프를 그리려면 센서 데이터가 2개 이상 필요합니다.
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            {/* 물주기 액션 버튼 (+3점 가산) */}
            <TouchableOpacity
              style={styles.waterButton}
              activeOpacity={0.85}
              onPress={handleWatering}
            >
              <Image
                source={require('../assets/sensor/sensor_humidity.png')}
                style={styles.waterIcon}
              />
              <Text style={styles.waterText}>물주기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text
            style={styles.hardwareHint}
            onPress={() => {
              navigation.navigate('HardwareConnect', { plant });
            }}
          >
            하드웨어 연결 후 센서 데이터가 표시됩니다.
          </Text>
        )}
      </ScrollView>

      <Bottom
        type="detail"
        active="plant"
        navigation={navigation}
        params={{
          plant,
          plantId: plant?.id,
        }}
      />
    </>
  );
}

function formatDateTime(value) {
  if (!value) return '-';
  const date = new Date(value);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

function formatTimeShort(value) {
  if (!value) return '';
  const date = new Date(value);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatSensorValue(value, type) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '-';
  if (type === 'temperature') {
    return number.toFixed(1);
  }
  return String(Math.round(number));
}