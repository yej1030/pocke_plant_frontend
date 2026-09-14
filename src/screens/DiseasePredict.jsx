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
        console.log(
          '질병 진단 실패:',
          error.response?.data ||
          error.message,
        );

        showAlert({
          title: '진단 실패',
          message:
            error.response?.data ||
            '질병 진단 서버에 연결할 수 없습니다.',
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
          진단할 식물 정보를 입력해주세요
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
          증상
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textarea,
          ]}
          placeholder="증상 또는 상태를 입력해주세요"
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