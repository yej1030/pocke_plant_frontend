import React, {
  useState,
} from 'react';

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

import {
  IconCameraPlus,
  IconX,
} from '@tabler/icons-react-native';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import BottomButton from '../components/Bottombutton';
import styles from './style/DiseasePredict.style';

import {
  predictDiseaseApi,
} from '../api/api';

export default function DiseasePredict({
  navigation,
  route,
}) {
  const plant =
    route?.params?.plant;

  const [
    imageUri,
    setImageUri,
  ] = useState(null);

  const [
    note,
    setNote,
  ] = useState('');

  const [
    isPredicting,
    setIsPredicting,
  ] = useState(false);

  const {
    alertConfig,
    showAlert,
    closeAlert,
  } = useCustomAlert();

  const selectImage = launcher => {
    launcher(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      response => {
        if (
          response.didCancel ||
          response.errorCode
        ) {
          return;
        }

        const uri =
          response.assets?.[0]?.uri;

        if (uri) {
          setImageUri(uri);
        }
      },
    );
  };

  const handleImagePress = () => {
    showAlert({
      title: '이미지 선택',
      message:
        '이미지 선택 방법을 골라주세요.',
      actions: [
        {
          text: '카메라로 촬영',
          kind: 'primary',
          onPress: () =>
            selectImage(
              launchCamera,
            ),
        },
        {
          text: '갤러리에서 선택',
          kind: 'primary',
          onPress: () =>
            selectImage(
              launchImageLibrary,
            ),
        },
        {
          text: '취소',
          kind: 'cancel',
        },
      ],
    });
  };

  const handleRemoveImage = () =>
    setImageUri(null);

  const handlePredict =
    async () => {
      if (!imageUri) {
        showAlert({
          title: '안내',
          message:
            '질병 진단 이미지를 선택해주세요.',
          variant: 'warning',
        });

        return;
      }

      if (isPredicting) {
        return;
      }

      try {
        setIsPredicting(true);

        const prediction =
          await predictDiseaseApi(
            imageUri,
            plant?.species || '',
          );

        navigation.replace(
          'DiseaseResult',
          {
            plant,
            imageUri,
            note,
            prediction,
          },
        );
      } catch (error) {
        const serverError =
          error.response?.data;
        const errorMessage =
          serverError?.disease_symptom ||
          serverError?.diseaseSymptom ||
          serverError?.message ||
          (typeof serverError === 'string'
            ? serverError
            : null) ||
          '질병 진단 서버에 연결할 수 없습니다.';

        console.log(
          '질병 진단 실패:',
          errorMessage,
        );

        showAlert({
          title: '진단 실패',
          message: errorMessage,
          variant: 'error',
        });
      } finally {
        setIsPredicting(false);
      }
    };

  return (
    <View
      style={styles.background}
    >
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
        <Text
          style={styles.labelMain}
        >
          증상이 보이는 잎을 밝은 곳에서 가까이 촬영해주세요
        </Text>

        <Text
          style={styles.formLabel}
        >
          이미지{' '}
          <Text
            style={
              styles.formLabelOpt
            }
          >
            필수, 1장
          </Text>
        </Text>

        <View
          style={styles.photoRow}
        >
          {imageUri ? (
            <View
              style={
                styles.photoThumbWrap
              }
            >
              <Image
                source={{ uri: imageUri }}
                style={
                  styles.photoThumb
                }
              />

              <TouchableOpacity
                style={
                  styles.photoRemoveBtn
                }
                onPress={
                  handleRemoveImage
                }
                activeOpacity={0.8}
              >
                <IconX
                  size={12}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={
                styles.photoAddBox
              }
              onPress={
                handleImagePress
              }
              activeOpacity={0.85}
            >
              <IconCameraPlus
                size={20}
                color="#7fc77c"
                strokeWidth={1.5}
              />

              <Text
                style={
                  styles.photoAddBoxText
                }
              >
                0/1
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text
          style={styles.formLabel}
        >
          관찰 메모 (기록용)
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textarea,
          ]}
          placeholder="언제부터 변했는지, 최근 물주기 등을 기록해주세요. 현재 사진 분석에는 사용되지 않습니다."
          placeholderTextColor="#B8B8B8"
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <BottomButton
        title={
          isPredicting
            ? '진단 중...'
            : '진단하기'
        }
        onPress={handlePredict}
      />

      <CustomAlert
        visible={
          alertConfig.visible
        }
        title={alertConfig.title}
        message={
          alertConfig.message
        }
        buttonText={
          alertConfig.buttonText
        }
        onPress={
          alertConfig.onPress
        }
        secondaryButtonText={
          alertConfig.secondaryButtonText
        }
        onSecondaryPress={
          alertConfig.onSecondaryPress
        }
        actions={
          alertConfig.actions
        }
        variant={
          alertConfig.variant
        }
        onRequestClose={
          closeAlert
        }
      />
    </View>
  );
}
