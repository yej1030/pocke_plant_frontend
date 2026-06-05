import React, { useState } from 'react';

import {
View,
Text,
TouchableOpacity,
Image,
TextInput,
ScrollView,
} from 'react-native';

import {
launchCamera,
launchImageLibrary,
} from 'react-native-image-picker';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import BottomButton from '../components/Bottombutton';

import styles from './style/DiseasePredict.style';

export default function DiseasePredict({
navigation,
route,
}) {

const plant =
route?.params?.plant;

const [imageUri, setImageUri] =
useState(null);

const [note, setNote] =
useState('');

const {
alertConfig,
showAlert,
closeAlert,
} = useCustomAlert();

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

// 진단하기
const handlePredict = () => {


if (!imageUri) {

  showAlert({
    title: '안내',
    message:
      '질병 진단 이미지를 선택해주세요.',
    variant: 'warning',
  });

  return;
}

navigation.replace(
  'DiseaseResult',
  {
    plant,
    imageUri,
    note,
  }
);


};

return ( <View style={styles.background}>

  <Header
    title="질병 예측하기"
    navigation={navigation}
    type="full"
  />

  <ScrollView
    contentContainerStyle={
      styles.container
    }
  >

    <Text style={styles.labelMain}>
      진단할 식물 정보를 입력해주세요
    </Text>

    {/* 이미지 */}
    <View style={styles.row}>

      <Text style={styles.label}>
        이미지
      </Text>

      <View style={styles.contentWrap}>

        {imageUri ? (

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

        ) : (

          <TouchableOpacity
            style={styles.imageBox}
            onPress={handleImagePress}
          >

            <Image
              source={require('../assets/placeholder.png')}
              style={styles.imageIcon}
            />

          </TouchableOpacity>

        )}

      </View>

    </View>

    {/* 증상 */}
    <View style={styles.row}>

      <Text style={styles.label}>
        증상
      </Text>

      <View style={styles.contentWrap}>

        <TextInput
          style={styles.input}
          placeholder="증상 또는 상태를 입력해주세요"
          value={note}
          onChangeText={setNote}
          multiline
        />

      </View>

    </View>

  </ScrollView>

  <BottomButton
    title="진단하기"
    onPress={handlePredict}
  />

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

</View>


);
}
