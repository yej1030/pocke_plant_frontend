import React, {
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { PlantsContext } from '../context/PlantsContext';
import styles from './style/PlantDetail.style';
import {
  createAiChatRoom,
  sendAiMessage,
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

export default function PlantDetail({ navigation, route }) {
  const { plants } = useContext(PlantsContext);

  const [isHardwareConnected, setIsHardwareConnected] =
    useState(false);

  const [speechMessage, setSpeechMessage] =
    useState('오늘은\n기분이 좋아요!');

  const [roomId, setRoomId] =
  useState(null);

  const plant = useMemo(() => {
    if (route?.params?.plant) {
      return route.params.plant;
    }
    if (route?.params?.plantId) {
      return plants.find(
        item => item.id === route.params.plantId
      );
    }
    return null;
  }, [plants, route]);

  const title = plant?.name || '식물 상세';

const [mood, setMood] =
  useState('happy');

  useEffect(() => {

  const createRoom =
    async () => {

      try {

        const room =
          await createAiChatRoom();

        setRoomId(room.id);

      } catch (error) {

        console.log(
          '채팅방 생성 실패',
          error
        );

      }
    };

  createRoom();

}, []);

  if (!plant) {
    return (
      <>
        <Header
          title={title}
          navigation={navigation}
          type="full"
        />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>
            식물 정보를 찾을 수 없습니다.
          </Text>
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

    const answer =
      await sendAiMessage(
        roomId,
        question
      );

    setSpeechMessage(answer);
//이거는 센서값을 기준으로 바꿔야해~~
    if (
      answer.includes('좋') ||
      answer.includes('행복') ||
      answer.includes('고마')
    ) {
      setMood('happy');
    } else {
      setMood('sad');
    }

  } catch (error) {

    console.log(
      'AI 응답 실패:',
      error.response?.data
    );
// 여기부터 
    if (question === '물 줄까?') {

      setSpeechMessage(
        '물은 아직 괜찮아! 😊'
      );

      setMood('happy');

    } else {
// 여기까지 ai 채팅 서버 키면 주석처리 해야해~~
      setSpeechMessage(
        '지금은 대답할 수 없어요 😢'
      );

      setMood('sad');
    }
  }
};
  

  const stats = [
    {
      type: 'soil',
      label: '토양 수분',
      value: 35,
      unit: '%',
      accent: '#c89b6d',
      icon: require('../assets/sensor/sensor_soil.png'),
    },
    {
      type: 'temp',
      label: '온도',
      value: 22,
      unit: '°C',
      accent: '#6fcf97',
      icon: require('../assets/sensor/sensor_temp.png'),
    },
    {
      type: 'humidity',
      label: '습도',
      value: 58,
      unit: '%',
      accent: '#6fcf97',
      icon: require('../assets/sensor/sensor_humidity.png'),
    },
    {
      type: 'light',
      label: '조도',
      value: 36000,
      unit: 'lx',
      accent: '#c89b6d',
      icon: require('../assets/sensor/sensor_light.png'),
    },
    {
      type: 'bio',
      label: '바이오',
      value: 360,
      unit: 'mV',
      accent: '#c89b6d',
      icon: require('../assets/sensor/sensor_bio.png'),
    },
  ];



  return (
    <>
      <Header
        title={title}
        navigation={navigation}
        type="full"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.heroCard}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {speechMessage}
            </Text>
          </View>

          <Image
            source={
              characterImages[
              plant.character_id || 1
              ]?.[mood]
            }
            style={styles.heroImage}
          />

          <View style={styles.quickReplyWrap}>
            {[
              '물 줄까?',
              '햇빛은 안 부족해?',
              '기분이 어때?',
            ].map(text => (
              <TouchableOpacity
                key={text}
                style={styles.quickReplyButton}
                activeOpacity={0.85}
                onPress={() => askPlant(text)}
              >
                <Text style={styles.quickReplyText}>
                  {text}
                </Text>
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
            style={[
              styles.actionButton,
              styles.actionPrimary,
            ]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('DiseasePredict', { plant })}
          >
            <Text style={styles.actionPrimaryText}>🔎 진단하기</Text>
          </TouchableOpacity>
        </View>

        {!isHardwareConnected && (
          <TouchableOpacity
            style={styles.hardwareButton}
            activeOpacity={0.85}
            onPress={() => {
              setIsHardwareConnected(true);
            }}
          >
            <Text style={styles.hardwareText}>
              + 하드웨어 연결하기
            </Text>
          </TouchableOpacity>
        )}

        {isHardwareConnected ? (
          <>
            <View style={styles.statsList}>
              {stats.map(item => {
                const raw = String(item.value ?? '');
                // number of characters excluding commas
                const digits = raw.replace(/,/g, '').length;

                // dynamic font size by digit count (smaller for longer numbers)
                let fontSize = 18;
                if (digits <= 3) fontSize = 18;
                else if (digits === 4) fontSize = 16;
                else if (digits === 5) fontSize = 14;
                else fontSize = 12;

                return (
                  <View key={item.label} style={styles.statCard}>
                    <Image source={item.icon} style={styles.statIcon} />
                    <Text style={styles.statLabel}>{item.label}</Text>

                    <View style={styles.statValueWrap}>
                      <Text style={[styles.statValue, { fontSize }]}> {item.value}</Text>
                      <Text style={styles.statUnit}>{item.unit}</Text>
                    </View>

                    <View style={styles.statBarTrack}>
                      <View
                        style={[
                          styles.statBarFill,
                          {
                            width: `${Math.min(item.value, 100)}%`,
                            backgroundColor: item.accent,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.waterButton}
              activeOpacity={0.85}
            >
              <Image
                source={require('../assets/sensor/sensor_humidity.png')}
                style={styles.waterIcon}
              />
              <Text style={styles.waterText}>물주기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.hardwareHint}>
            하드웨어 연결 후 센서 데이터가 표시됩니다.
          </Text>
        )}
      </ScrollView>
    </>
  );
}