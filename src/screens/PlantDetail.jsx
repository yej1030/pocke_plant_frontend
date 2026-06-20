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
  Pressable,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import Header from '../components/Header';
import { PlantsContext } from '../context/PlantsContext';
import styles from './style/PlantDetail.style';
import {
  createAiChatRoom,
  sendAiMessage,
  getLatestSensorData,
  getPlantEnv,
} from '../api/api';

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

// 살짝 눌렸다가 돌아오는 버튼 (탭 피드백용)
function AnimatedPressable({ onPress, style, contentStyle, children, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      style={style}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale }],
          },
          contentStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

// 등록 시 0 -> 목표값까지 채워지는 센서 막대
function AnimatedStatBar({ value, color, delay = 0 }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    widthAnim.setValue(0);
    Animated.timing(widthAnim, {
      toValue: typeof value === 'number' ? Math.min(value, 100) : 0,
      duration: 900,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.sensorBarTrack}>
      <Animated.View
        style={[
          styles.sensorBarFill,
          {
            backgroundColor: color,
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

// 센서 카드 한 줄: 옆에서 살짝 스며들듯 등장
function AnimatedSensorCard({ item, index }) {
  const enterAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enterAnim, {
      toValue: 1,
      duration: 450,
      delay: index * 90,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const raw = String(item.value ?? '');
  const digits = raw.replace(/,/g, '').length;
  let fontSize = 24;
  if (digits <= 3) fontSize = 24;
  else if (digits === 4) fontSize = 20;
  else if (digits === 5) fontSize = 16;
  else fontSize = 13;

  const barColor = (() => {
    if (typeof item.value !== 'number') return 'transparent';
    if (
      item.min != null &&
      item.max != null &&
      item.value >= item.min &&
      item.value <= item.max
    ) {
      return '#6fcf97';
    }
    return '#c89b6d';
  })();

  return (
    <Animated.View
      style={[
        styles.sensorCard,
        {
          opacity: enterAnim,
          transform: [
            {
              translateX: enterAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [24, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.sensorTop}>
        <View style={styles.sensorLeft}>
          <Image source={item.icon} style={styles.sensorIcon} />
          <Text style={styles.sensorLabel}>{item.label}</Text>
        </View>
        <View style={styles.sensorRight}>
          <Text style={styles.sensorTarget}>
            적정 {item.target}{item.unit}
          </Text>
          <Text style={[styles.sensorValue, { fontSize }]}>
            {item.value}
            <Text style={styles.sensorUnit}>{item.unit}</Text>
          </Text>
        </View>
      </View>
      <AnimatedStatBar
        value={item.value}
        color={barColor}
        delay={index * 90 + 150}
      />
    </Animated.View>
  );
}

export default function PlantDetail({ navigation, route }) {
  const { plants } = useContext(PlantsContext);

  const [isHardwareConnected, setIsHardwareConnected] =
    useState(route?.params?.hardwareConnected || false);

  useEffect(() => {
    if (route?.params?.hardwareConnected) {
      setIsHardwareConnected(true);
    }
  }, [route?.params?.hardwareConnected]);

  const [speechMessage, setSpeechMessage] =
    useState('오늘은\n기분이 좋아요!');

  const [roomId, setRoomId] = useState(null);
  const [mood, setMood] = useState('happy');
  const [sensorData, setSensorData] = useState(null);
  const [plantEnv, setPlantEnv] = useState(null);

  const plant = useMemo(() => {
    if (route?.params?.plant) return route.params.plant;
    if (route?.params?.plantId) {
      return plants.find(item => item.id === route.params.plantId);
    }
    return null;
  }, [plants, route]);

  const title = plant?.name || '식물 상세';

  // ── 애니메이션 refs ──────────────────────────────────
  const heroAnim    = useRef(new Animated.Value(0)).current; // 히어로 카드 등장
  const speechAnim  = useRef(new Animated.Value(1)).current; // 말풍선 팝
  const floatAnim   = useRef(new Animated.Value(0)).current; // 캐릭터 둥실

  // ────────────────────────────────────────────────────

  // 화면 진입: 히어로 카드 페이드 + 슬라이드업
  useEffect(() => {
    Animated.timing(heroAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  // 캐릭터 둥실둥실 (왕복 루프)
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  // 말풍선 내용 바뀔 때 팝 스프링
  useEffect(() => {
    speechAnim.setValue(0.85);
    Animated.spring(speechAnim, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [speechMessage]);



  // AI 채팅방 생성
  useEffect(() => {
    const createRoom = async () => {
      try {
        const room = await createAiChatRoom();
        setRoomId(room.id);
      } catch (error) {
        console.log('채팅방 생성 실패', error);
      }
    };
    createRoom();
  }, []);

  // 센서 데이터 폴링
  useEffect(() => {
    if (!isHardwareConnected) return;

    const fetchSensorData = async () => {
      try {
        const data = await getLatestSensorData();
        console.log('센서 데이터:', data);
        setSensorData(data);
      } catch (error) {
        console.log('센서 조회 실패', error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, [isHardwareConnected]);

  // 식물 환경 데이터
  useEffect(() => {
    if (!isHardwareConnected || !plant?.name) return;

    const fetchEnv = async () => {
      try {
        const env = await getPlantEnv(plant.name);
        setPlantEnv(env);
      } catch (error) {
        console.log('식물 환경 데이터 조회 실패', error);
      }
    };

    fetchEnv();
  }, [plant, isHardwareConnected]);

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

  const askPlant = async question => {
    if (!roomId) {
      console.log('채팅방 없음');
      return;
    }

    setSpeechMessage('생각중...');

    try {
      const answer = await sendAiMessage(roomId, question);
      console.log('식물 AI 응답:', JSON.stringify(answer, null, 2));

      const content =
        answer?.choices?.[0]?.message?.content ?? '응답 없음';

      setSpeechMessage(content);
      // 이거는 센서값을 기준으로 바꿔야해~~
      if (
        content.includes('좋') ||
        content.includes('행복') ||
        content.includes('고마')
      ) {
        setMood('happy');
      } else {
        setMood('sad');
      }
    } catch (error) {
      console.log('AI 응답 실패:', error.response?.data);
      setSpeechMessage('지금은 대답할 수 없어요 😢');
      setMood('sad');
    }
  };

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const stats = [
    {
      type: 'soil',
      label: '토양 수분',
      value: sensorData?.soil ?? '-',
      target: plantEnv?.waterCycleSpring ?? '-',
      unit: '%',
      icon: require('../assets/sensor/sensor_soil.png'),
    },
    {
      type: 'temp',
      label: '온도',
      value: sensorData?.temp ?? '-',
      target: plantEnv?.growhTp ?? '-',
      unit: '°C',
      icon: require('../assets/sensor/sensor_temp.png'),
    },
    {
      type: 'humidity',
      label: '습도',
      value: sensorData?.humidity ?? '-',
      target: plantEnv?.humidity ?? '-',
      unit: '%',
      icon: require('../assets/sensor/sensor_humidity.png'),
    },
    {
      type: 'light',
      label: '조도',
      value: sensorData?.light ?? '-',
      target: '-',
      unit: 'lx',
      icon: require('../assets/sensor/sensor_light.png'),
    },
    {
      type: 'bio',
      label: '바이오',
      value: sensorData?.bio ?? '-',
      target: '-',
      unit: 'mV',
      icon: require('../assets/sensor/sensor_bio.png'),
    },
  ];

  return (
    <>
      <Header title={title} navigation={navigation} type="full" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* 히어로 카드 — 페이드 + 슬라이드업 */}
        <Animated.View
          style={[
            styles.heroCard,
            {
              opacity: heroAnim,
              transform: [
                {
                  translateY: heroAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* 배경 장식 블롭 */}
          <View style={styles.heroBlobTopRight} />
          <View style={styles.heroBlobBottomLeft} />

          {/* 말풍선 — 팝 스프링 */}
          <Animated.View
            style={[
              styles.speechBubble,
              { transform: [{ scale: speechAnim }] },
            ]}
          >
            <Text style={styles.speechText}>{speechMessage}</Text>
          </Animated.View>

          {/* 캐릭터 — 둥실둥실 */}
          <Animated.Image
            source={characterImages[plant.character_id || 1]?.[mood]}
            style={[
              styles.heroImage,
              { transform: [{ translateY: floatTranslate }] },
            ]}
          />

          {/* 빠른 질문 버튼 */}
          <View style={styles.quickReplyWrap}>
            {['물 줄까?', '햇빛은 안 부족해?', '기분이 어때?'].map(text => (
              <AnimatedPressable
                key={text}
                style={styles.quickReplyButton}
                onPress={() => askPlant(text)}
              >
                <Text style={styles.quickReplyText}>{text}</Text>
              </AnimatedPressable>
            ))}
          </View>
        </Animated.View>

        {/* 액션 버튼 행 */}
        <View style={styles.actionRow}>
          <AnimatedPressable
            style={styles.actionButton}
            onPress={() => navigation.navigate('Chat', { plant })}
          >
            <Text style={styles.actionText}>💬 대화하기</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[styles.actionButton, styles.actionPrimary]}
            onPress={() => navigation.navigate('DiseasePredict', { plant })}
          >
            <Text style={styles.actionPrimaryText}>🔎 진단하기</Text>
          </AnimatedPressable>
        </View>

        {/* 하드웨어 연결 버튼 */}
        {!isHardwareConnected && (
          <AnimatedPressable
            style={styles.hardwareButton}
            onPress={() => navigation.navigate('HardwareConnect', { plant })}
          >
            <Text style={styles.hardwareText}>+ 하드웨어 연결하기</Text>
          </AnimatedPressable>
        )}

        {/* 센서 데이터 / 힌트 */}
        {isHardwareConnected ? (
          <>
            <View style={styles.statsList}>
              {stats.map((item, index) => (
                <AnimatedSensorCard
                  key={item.label}
                  item={item}
                  index={index}
                />
              ))}
            </View>

            {/* 물주기 버튼 */}
            <TouchableOpacity
              style={styles.waterButton}
              activeOpacity={0.75}
              onPress={() => {}}
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
            onPress={() => navigation.navigate('HardwareConnect')}
          >
            하드웨어 연결 후 센서 데이터가 표시됩니다.
          </Text>
        )}
      </ScrollView>
    </>
  );
}
