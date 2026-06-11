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
import {
  registerPlant,
  updatePlantApi,
} from '../api/api';

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

const characterList = [
  require('../assets/Plant/plant_01_happy.png'),
  require('../assets/Plant/plant_03_happy.png'),
  require('../assets/Plant/plant_05_happy.png'),
  require('../assets/Plant/plant_07_happy.png'),
  require('../assets/Plant/plant_09_happy.png'),
  require('../assets/Plant/plant_11_happy.png'),
  require('../assets/Plant/plant_13_happy.png'),
  require('../assets/Plant/plant_15_happy.png'),
  require('../assets/Plant/plant_17_happy.png'),
  require('../assets/Plant/plant_19_happy.png'),
];

// 임시 하드코딩 종 리스트 (나중에 백엔드에서 불러올 예정)
const speciesList = [
  '몬스테라',
  '스투키',
  '산세베리아',
  '스킨답서스',
  '필로덴드론',
  '페퍼로미아',
  '프레데리아',
  '칼랑코에',
  '페페로미아',
  '아레카야자',
  '관음죽',
  '싱고니움',
  '유칼립투스',
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

  const [filteredSpecies, setFilteredSpecies] =
    useState([]);

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
  ] = useState('활발한');

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

  const [selectedCharacter, setSelectedCharacter] =
  useState(1);

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

  // 종 입력에 따라 자동완성 후보 필터링
  // api 연동 시 여기 수정
  useEffect(() => {
    const q = (species || '').trim();

    if (q.length === 0) {
      setFilteredSpecies([]);
      return;
    }

    const lowered = q.toLowerCase();

    const matches = speciesList
      .filter((s) =>
        s.toLowerCase().includes(lowered)
      )
      .slice(0, 8);

    setFilteredSpecies(matches);
  }, [species]);

  // 식물 등록
// 식물 등록
const handleSubmit = async () => {

  const missing = [];

  if (!name || name.trim() === '') {
    missing.push('이름');
  }
  if (!species || species.trim() === '') {
    missing.push('종');
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

  try {

    const plantData = {

      name:
        name || '',

      species:
        species || '',

      adoptDate:
        adoptDate
          ? adoptDate
              .toISOString()
              .slice(0, 10)
          : '',

      age:
        age
          ? Number(age)
          : null,

      personality:
        customPersonality ||
        selectedPersonality,

      imageUri:
        imageUri || '',

      character_id:
  selectedCharacter,
    };

    console.log(
      '식물 등록 요청:',
      plantData
    );

let response;

if (editingId) {

	response =
		await updatePlantApi(
			editingId,
			plantData
		);

} else {

	response =
		await registerPlant(
			plantData
		);
}

    console.log('식물 등록 성공:', response);

    // Update context so Main reflects change immediately
    try {
      if (editingId) {
        // server likely returns updated plant
        updatePlant(editingId, response || plantData);
      } else {
        // server likely returns created plant with id
        addPlant(response || plantData);
      }
    } catch (e) {
      console.log('Context update failed:', e.message);
    }

    showAlert({
      title: '성공',

      message:
          editingId
    ? '식물 정보가 수정되었습니다.'
    : '식물이 등록되었습니다.',

      buttonText: '확인',

        onPress: () => navigation.replace('Main'),

      variant: 'success',
    });

  } catch (error) {

    console.log(
      '식물 등록 실패:',
      error.response?.data
    );

    showAlert({
      title: '실패',

      message:
        error.response?.data?.message ||
        '식물 등록에 실패했습니다.',

      variant: 'error',
    });
  }
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
      if (p.character_id) {
  setSelectedCharacter(
    p.character_id
  );
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
              onChangeText={(text) => {
                setSpecies(text);
              }}
            />

            {filteredSpecies.length > 0 && (
              <View style={styles.suggestionList}>
                {filteredSpecies.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setSpecies(item);
                      setFilteredSpecies([]);
                      setIsAnalyzed(false);
                    }}
                    style={styles.suggestionItem}
                  >
                    <Text style={styles.suggestionText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

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

        {/* 캐릭터 선택 */}
<View style={styles.row}>

  <Text style={styles.label}>
    캐릭터
  </Text>

  <View style={styles.contentWrap}>
{/* 
    <Text style={styles.characterTitle}>
      캐릭터 선택하기
    </Text>

    <Text style={styles.characterSub}>
      내 식물의 캐릭터를 골라주세요.
    </Text> */}

    <View style={styles.characterSelector}>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {

          if (selectedCharacter > 1) {

            setSelectedCharacter(
              prev => prev - 1
            );

          }

        }}
      >
        <Text style={styles.arrowText}>
          {'<'}
        </Text>
      </TouchableOpacity>

      <Image
        source={
          characterList[
            selectedCharacter - 1
          ]
        }
        style={styles.characterImage}
      />

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {

          if (
            selectedCharacter <
            characterList.length
          ) {

            setSelectedCharacter(
              prev => prev + 1
            );

          }

        }}
      >
        <Text style={styles.arrowText}>
          {'>'}
        </Text>
      </TouchableOpacity>

    </View>

    <Text style={styles.characterCount}>
      {selectedCharacter} / {characterList.length}
    </Text>

    <View style={styles.dotContainer}>

      {characterList.map(
        (_, index) => (

          <View
            key={index}
            style={[
              styles.dot,

              selectedCharacter ===
                index + 1 &&
                styles.activeDot,
            ]}
          />

        )
      )}

    </View>

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