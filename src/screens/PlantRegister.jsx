import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';

import styles from './style/PlantRegister.style';

import { PlantsContext } from '../context/PlantsContext';

const personalityList = ['활발한', '무뚝뚝한', '다정한', '느긋한', '사교적인', '적극적인', '애교 많은', '까칠한'];

export default function PlantRegister({ navigation, route }) {

  const { addPlant, updatePlant } = useContext(PlantsContext);

  const editingId =
    route?.params?.plantId ?? null;

  const [selectedPersonality, setSelectedPersonality] =
    useState('느긋한');

  const [customPersonality, setCustomPersonality] =
    useState('');

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  const [adoptDate, setAdoptDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [age, setAge] = useState('');

  const [imageUri, setImageUri] =
    useState(null);

  // AI 분석 상태
  const [analyzedSpecies, setAnalyzedSpecies] =
    useState('');

  const [isAnalyzed, setIsAnalyzed] =
    useState(false);

  // 이미지 선택
  const handleImagePress = () => {
    Alert.alert(
      '이미지 선택',
      '이미지 선택 방법을 골라주세요.',
      [
        {
          text: '카메라로 촬영',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                cameraType: 'back',
              },
              (res) => {
                if (res.didCancel || res.errorCode) return;

                if (res.assets?.length > 0) {
                  setImageUri(res.assets[0].uri);

                  setIsAnalyzed(false);
                  setAnalyzedSpecies('');
                }
              }
            );
          },
        },

        {
          text: '갤러리에서 선택',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
              },
              (res) => {
                if (res.didCancel || res.errorCode) return;

                if (res.assets?.length > 0) {
                  setImageUri(res.assets[0].uri);

                  setIsAnalyzed(false);
                  setAnalyzedSpecies('');
                }
              }
            );
          },
        },

        {
          text: '취소',
          style: 'cancel',
        },
      ]
    );
  };

  // AI 분석 mock
  const handleAnalyzeSpecies = () => {

    // 나중에 API 연결하면 여기 수정
    const mockResult = '몬스테라';

    setAnalyzedSpecies(mockResult);

    setSpecies(mockResult);

    setIsAnalyzed(true);
  };

  // 등록
  const handleSubmit = () => {
    // require name and image
    const missing = [];
    if (!name || name.trim() === '') missing.push('이름');
    if (!imageUri) missing.push('이미지');
    if (missing.length > 0) {
      Alert.alert('필수 입력', `${missing.join(' 및 ')}을(를) 입력해주세요.`);
      return;
    }

    const plant = {
      name: name || '이름 없음',
      species: species || '',
      adoptDate: adoptDate
        ? adoptDate.toISOString().slice(0, 10)
        : '',
      age: age || '',
      personality:
        customPersonality || selectedPersonality,
      imageUri: imageUri || null,
    };

    if (editingId !== null) {
      updatePlant(editingId, plant);
    } else {
      addPlant(plant);
    }

    navigation.navigate('Main');
  };

  useEffect(() => {

    if (route?.params?.plant) {

      const p = route.params.plant;

      if (p.name) setName(p.name);

      if (p.species) {
        setSpecies(p.species);
      }

      if (p.adoptDate) {

        const d = new Date(p.adoptDate);

        if (!isNaN(d.getTime())) {
          setAdoptDate(d);
        }
      }

      if (p.age) setAge(p.age);

      if (p.imageUri) {
        setImageUri(p.imageUri);
      }

      if (p.personality) {

        if (
          personalityList.includes(p.personality)
        ) {
          setSelectedPersonality(p.personality);
          setCustomPersonality('');
        } else {
          setCustomPersonality(p.personality);
          setSelectedPersonality(p.personality);
        }
      }
    }

  }, [route]);

  return (

    <View style={styles.background}>

      {showDatePicker && (
        <DateTimePicker
          value={adoptDate}
          mode="date"
          display={
            Platform.OS === 'ios'
              ? 'spinner'
              : 'default'
          }
          onChange={(event, selectedDate) => {

            setShowDatePicker(false);

            if (selectedDate) {
              setAdoptDate(selectedDate);
            }
          }}
          maximumDate={new Date()}
        />
      )}

      <Header
        title="식물 등록하기"
        navigation={navigation}
        type="full"
      />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.labelMain}>
          식물 정보를 입력해주세요
        </Text>

        {/* 이름 */}
        <View style={styles.row}>

          <Text style={styles.label}>이름</Text>

          <View style={styles.contentWrap}>

            <TextInput
              style={styles.input}
              placeholder="식물 이름"
              value={name}
              onChangeText={setName}
            />

          </View>
        </View>

        {/* 입양날짜 */}
        <View style={styles.row}>

          <Text style={styles.label}>
            입양날짜
          </Text>

          <View style={styles.contentWrap}>

            <View style={styles.dateRow}>

              <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                  setShowDatePicker(true)
                }
                activeOpacity={0.8}
              >

                <Text style={styles.dateText}>
                  {adoptDate
                    ? adoptDate
                      .toISOString()
                      .slice(0, 10)
                    : '날짜 선택'}
                </Text>

                <Text style={styles.dateArrow}>
                  ▼
                </Text>

              </TouchableOpacity>

              <View style={styles.ageWrap}>

                <TextInput
                  style={styles.ageInput}
                  placeholder="나이"
                  value={age}
                  onChangeText={(text) => {

                    const onlyNumber =
                      text.replace(/[^0-9]/g, '');

                    setAge(onlyNumber);
                  }}
                  keyboardType="numeric"
                  maxLength={3}
                />

                <Text style={styles.ageText}>
                  세
                </Text>

              </View>
            </View>
          </View>
        </View>

        {/* 종 */}
        <View style={styles.row}>

          <Text style={styles.label}>
            종
          </Text>

          <View style={styles.contentWrap}>

            <TextInput
              style={styles.input}
              placeholder="AI 분석 또는 직접 입력"
              value={species}
              onChangeText={setSpecies}
            />

            {/* AI 결과 카드 */}
            {isAnalyzed && (
              <View style={styles.aiResultCard}>

                <View style={styles.aiResultTop}>

                  <Text style={styles.aiResultTitle}>
                    🌿 {analyzedSpecies}
                  </Text>

                  <TouchableOpacity
                    onPress={handleAnalyzeSpecies}
                  >
                    <Text style={styles.aiRetry}>
                      다시 분석하기
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            )}

          </View>
        </View>

        {/* 이미지 */}
        <View style={styles.row}>

          <Text style={styles.label}>
            이미지
          </Text>

          <View style={styles.contentWrap}>

            {imageUri ? (

              <>
                <TouchableOpacity
                  onPress={handleImagePress}
                  activeOpacity={0.8}
                >

                  <Image
                    source={{ uri: imageUri }}
                    style={styles.selectedImage}
                  />

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.analyzeButton}
                  onPress={handleAnalyzeSpecies}
                  activeOpacity={0.85}
                >

                  <Text style={styles.analyzeButtonText}>
                    🌿 종 분석하기
                  </Text>

                </TouchableOpacity>
              </>

            ) : (

              <>
                <TouchableOpacity
                  style={styles.imageBox}
                  onPress={handleImagePress}
                >

                  <Image
                    source={require('../assets/placeholder.png')}
                    style={styles.imageIcon}
                  />

                </TouchableOpacity>

                <Text style={styles.aiGuide}>
                  사진을 등록하면 AI가 종을 분석합니다.
                </Text>
              </>
            )}

          </View>
        </View>

        {/* 성격 */}
        <View style={styles.row}>

          <Text style={styles.label}>
            성격
          </Text>

          <View style={styles.contentWrap}>

            <View style={styles.personalityWrap}>

              {personalityList.map((item) => (

                <TouchableOpacity
                  key={item}
                  style={[
                    styles.personalityBtn,

                    selectedPersonality === item &&
                    styles.personalityBtnSelected,
                  ]}
                  onPress={() => {

                    setSelectedPersonality(item);

                    setCustomPersonality('');
                  }}
                >

                  <Text
                    style={[
                      styles.personalityText,

                      selectedPersonality === item &&
                      styles.personalityTextSelected,
                    ]}
                  >
                    {item}
                  </Text>

                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={[
                styles.input,
                styles.inputUnderPersonality,
              ]}
              placeholder="직접 입력 (선택)"
              value={customPersonality}
              onChangeText={(text) => {

                setCustomPersonality(text);

                if (text) {
                  setSelectedPersonality(text);
                }
              }}
            />

          </View>
        </View>

      </ScrollView>

      <BottomButton
        title="등록하기"
        onPress={handleSubmit}
      />

    </View>
  );
}