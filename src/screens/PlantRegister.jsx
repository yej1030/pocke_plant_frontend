import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/PlantRegister.style';
import {
  PlantsContext,
} from '../context/PlantsContext';

// 기본 성격 리스트
const personalityList = [
  '활발한',
  '무뚝뚝한',
  '다정한',
  '느긋한',
  '사교적인',
  '적극적인',
  '애교 많은',
  '까칠한',
];

export default function PlantRegister({
  navigation,
  route,
}) {

  // 식물 context
  const {
    addPlant,
    updatePlant,
  } = useContext(PlantsContext);

  // 커스텀 알림
  const {
    alertConfig,
    showAlert,
    closeAlert,
  } = useCustomAlert();

  // 수정 여부 확인
  const editingId =
    route?.params?.plantId ?? null;

  // 입력값
  const [name, setName] =
    useState('');

  const [species, setSpecies] =
    useState('');

  const [age, setAge] =
    useState('');

  const [imageUri, setImageUri] =
    useState(null);

  // 입양 날짜
  const [adoptDate, setAdoptDate] =
    useState(new Date());

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  // 성격
  const [
    selectedPersonality,
    setSelectedPersonality,
  ] = useState('느긋한');

  const [
    customPersonality,
    setCustomPersonality,
  ] = useState('');

  // AI 분석 상태
  const [
    analyzedSpecies,
    setAnalyzedSpecies,
  ] = useState('');

  const [
    isAnalyzed,
    setIsAnalyzed,
  ] = useState(false);

  // 이미지 선택
  const handleImagePress = () => {

    showAlert({
      title: '이미지 선택',
      message: '이미지 선택 방법을 골라주세요.',
      actions: [
        {
          text: '카메라로 촬영',
          kind: 'primary',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                cameraType: 'back',
              },

              (res) => {
                if (
                  res.didCancel ||
                  res.errorCode
                ) {
                  return;
                }

                if (
                  res.assets?.length > 0
                ) {
                  setImageUri(
                    res.assets[0].uri
                  );
                  setIsAnalyzed(false);
                  setAnalyzedSpecies('');
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
              {
                mediaType: 'photo',
              },

              (res) => {
                if (
                  res.didCancel ||
                  res.errorCode
                ) {
                  return;
                }

                if (
                  res.assets?.length > 0
                ) {
                  setImageUri(
                    res.assets[0].uri
                  );
                  setIsAnalyzed(false);
                  setAnalyzedSpecies('');
                }
              }
            );
          },
        },

        {
          text: '취소',
          kind: 'cancel',
        },
      ],
    });
  };

  // AI 종 분석
  const handleAnalyzeSpecies = () => {

    // 임시 하드코딩
    const mockResult =
      '몬스테라';

    setAnalyzedSpecies(mockResult);
    setSpecies(mockResult);
    setIsAnalyzed(true);
  };

  // 식물 등록
  const handleSubmit = () => {

    // 필수 입력 확인
    const missing = [];

    if (!name || name.trim() === '') {
      missing.push('이름');
    }

    if (!imageUri) {
      missing.push('이미지');
    }

    if (missing.length > 0) {
      showAlert({
        title: '필수 입력',
        message:
          `${missing.join(' 및 ')}을(를) 입력해주세요.`,
        variant: 'warning',
      });
      return;
    }

    const plant = {
      name:
        name || '이름 없음',

      species:
        species || '',

      adoptDate: adoptDate
        ? adoptDate
          .toISOString()
          .slice(0, 10)
        : '',

      age:
        age || '',

      personality:
        customPersonality ||
        selectedPersonality,

      imageUri:
        imageUri || null,
    };

    // 수정 / 등록 분기
    if (editingId !== null) {
      updatePlant(
        editingId,
        plant
      );

    } else {
      addPlant(plant);
    }

    navigation.navigate('Main');
  };

  // 수정 화면 데이터 세팅
  useEffect(() => {
    if (route?.params?.plant) {
      const p =
        route.params.plant;

      if (p.name) {
        setName(p.name);
      }

      if (p.species) {
        setSpecies(p.species);
      }

      if (p.adoptDate) {
        const d =
          new Date(p.adoptDate);

        if (!isNaN(d.getTime())) {
          setAdoptDate(d);
        }
      }

      if (p.age) {
        setAge(p.age);
      }

      if (p.imageUri) {
        setImageUri(p.imageUri);
      }

      if (p.personality) {
        if (
          personalityList.includes(
            p.personality
          )
        ) {

          setSelectedPersonality(
            p.personality
          );

          setCustomPersonality('');

        } else {
          setCustomPersonality(
            p.personality
          );

          setSelectedPersonality(
            p.personality
          );
        }
      }
    }

  }, [route]);

  return (
    <View style={styles.background}>

      {/* 날짜 선택 */}
      {showDatePicker && (

        <DateTimePicker
          value={adoptDate}
          mode="date"
          display={
            Platform.OS === 'ios'
              ? 'spinner'
              : 'default'
          }

          onChange={(
            event,
            selectedDate
          ) => {

            setShowDatePicker(false);

            if (selectedDate) {
              setAdoptDate(
                selectedDate
              );
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
        contentContainerStyle={
          styles.container
        }

        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.labelMain}>
          식물 정보를 입력해주세요
        </Text>

        {/* 이름 */}
        <View style={styles.row}>

          <Text style={styles.label}>
            이름
          </Text>

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

                  onChangeText={(
                    text
                  ) => {

                    const onlyNumber =
                      text.replace(
                        /[^0-9]/g,
                        ''
                      );

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

            {/* AI 결과 */}
            {isAnalyzed && (

              <View style={styles.aiResultCard}>

                <View style={styles.aiResultTop}>

                  <Text style={styles.aiResultTitle}>
                    🌿 {analyzedSpecies}
                  </Text>

                  <TouchableOpacity
                    onPress={
                      handleAnalyzeSpecies
                    }
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
                    source={{
                      uri: imageUri,
                    }}

                    style={
                      styles.selectedImage
                    }
                  />

                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.analyzeButton
                  }

                  onPress={
                    handleAnalyzeSpecies
                  }

                  activeOpacity={0.85}
                >

                  <Text
                    style={
                      styles.analyzeButtonText
                    }
                  >
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
                  사진을 등록하면
                  AI가 종을 분석합니다.
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

            <View
              style={
                styles.personalityWrap
              }
            >

              {personalityList.map(
                (item) => (

                  <TouchableOpacity
                    key={item}

                    style={[
                      styles.personalityBtn,

                      selectedPersonality ===
                      item &&
                      styles.personalityBtnSelected,
                    ]}

                    onPress={() => {

                      setSelectedPersonality(
                        item
                      );

                      setCustomPersonality('');
                    }}
                  >

                    <Text
                      style={[
                        styles.personalityText,

                        selectedPersonality ===
                        item &&
                        styles.personalityTextSelected,
                      ]}
                    >
                      {item}
                    </Text>

                  </TouchableOpacity>
                )
              )}

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
                  setSelectedPersonality(
                    text
                  );
                }
              }}
            />

          </View>
        </View>

      </ScrollView>

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
        title="등록하기"
        onPress={handleSubmit}
      />

    </View>
  );
}