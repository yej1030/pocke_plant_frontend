import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import styles from './style/PlantRegister.style';
import { PlantsContext } from '../context/PlantsContext';

const personalityList = ['활발한', '무뚝뚝한', '다정한', '느긋한'];

export default function PlantRegister({ navigation, route }) {
  const { addPlant, updatePlant } = useContext(PlantsContext);

  const editingIndex = route && route.params && typeof route.params.index === 'number' ? route.params.index : null;

  const [selectedPersonality, setSelectedPersonality] = useState('느긋한');
  const [customPersonality, setCustomPersonality] = useState('');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [adoptDate, setAdoptDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleImagePress = () => {
    Alert.alert(
      '이미지 선택',
      '이미지 선택 방법을 골라주세요.',
      [
        {
          text: '카메라로 촬영',
          onPress: () => {
            launchCamera({ mediaType: 'photo', cameraType: 'back' }, (res) => {
              if (res.didCancel || res.errorCode) return;
              if (res.assets && res.assets.length > 0) setImageUri(res.assets[0].uri);
            });
          },
        },
        {
          text: '갤러리에서 선택',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, (res) => {
              if (res.didCancel || res.errorCode) return;
              if (res.assets && res.assets.length > 0) setImageUri(res.assets[0].uri);
            });
          },
        },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  const handleSubmit = () => {
    const plant = {
      name: name || '이름 없음',
      species: species || '',
      adoptDate: adoptDate ? adoptDate.toISOString().slice(0, 10) : '',
      age: age || '',
      personality: customPersonality || selectedPersonality,
      imageUri: imageUri || null,
    };
    if (editingIndex !== null) {
      updatePlant(editingIndex, plant);
    } else {
      addPlant(plant);
    }
    navigation.navigate('Main');
  };

  useEffect(() => {
    if (route && route.params && route.params.plant) {
      const p = route.params.plant;
      if (p.name) setName(p.name);
      if (p.species) setSpecies(p.species);
      if (p.adoptDate) {
        // adoptDate stored as YYYY-MM-DD string
        const d = new Date(p.adoptDate);
        if (!isNaN(d.getTime())) setAdoptDate(d);
      }
      if (p.age) setAge(p.age);
      if (p.imageUri) setImageUri(p.imageUri);
      if (p.personality) {
        if (personalityList.includes(p.personality)) {
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
      {/* DateTimePicker는 최상위 View 바로 아래에서 조건부 렌더링 */}
      {showDatePicker && (
        <DateTimePicker
          value={adoptDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setAdoptDate(selectedDate);
          }}
          maximumDate={new Date()}
        />
      )}
      <Header title="식물 등록하기" navigation={navigation} type="full" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.labelMain}>식물 정보를 입력해주세요</Text>

        {/* 이름 */}
        <View style={styles.row}>
          <Text style={styles.label}>이름</Text>
          <TextInput style={styles.input} placeholder="" value={name} onChangeText={setName} />
        </View>

        {/* 입양날짜 + 나이 */}
        <View style={styles.row}>
          <Text style={styles.label}>입양날짜</Text>
          <TouchableOpacity
            style={[styles.input, { flex: 1, flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.8}
          >
            <Text style={{ color: '#222', fontSize: 15 }}>
              {adoptDate ? adoptDate.toISOString().slice(0, 10) : '날짜 선택'}
            </Text>
            <Text style={{ color: '#888', marginLeft: 8 }}>▼</Text>
          </TouchableOpacity>
          {/* DateTimePicker는 최상위 View에서 렌더링하므로 여기선 제거 */}
          <View style={{ flex: 0.7, marginLeft: 8, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 0, marginRight: 2 }]}
              placeholder="나이"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={{ fontSize: 15, color: '#222' }}>세</Text>
          </View>
        </View>

        {/* 종 */}
        <View style={styles.row}>
          <Text style={styles.label}>종</Text>
          <TextInput style={styles.input} placeholder="" value={species} onChangeText={setSpecies} />
        </View>

        {/* 이미지 */}
        <View style={styles.row}>
          <Text style={styles.label}>이미지</Text>
          <TouchableOpacity style={styles.imageBox} onPress={handleImagePress}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imageIcon} />
            ) : (
              <Image source={require('../assets/placeholder.png')} style={styles.imageIcon} />
            )}
          </TouchableOpacity>
        </View>

        {/* 성격 */}
        <View style={styles.row}>
          <Text style={styles.label}>성격</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {personalityList.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.personalityBtn,
                    selectedPersonality === item && styles.personalityBtnSelected,
                  ]}
                  onPress={() => {
                    setSelectedPersonality(item);
                    setCustomPersonality('');
                  }}
                >
                  <Text
                    style={[
                      styles.personalityText,
                      selectedPersonality === item && styles.personalityTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[styles.input, styles.inputUnderPersonality]}
              placeholder="직접 입력 (선택)"
              value={customPersonality}
              onChangeText={(text) => {
                setCustomPersonality(text);
                if (text) setSelectedPersonality(text);
              }}
              returnKeyType="done"
            />
          </View>
        </View>
      </ScrollView>
      <BottomButton title="등록하기" onPress={handleSubmit} />
    </View>
  );
}