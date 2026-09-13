import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';
import styles from './style/DiseaseResult.style';

export default function DiseaseResult({
  navigation,
  route,
}) {
  const {
    plant,
    imageUri,
    note,
    prediction,
  } = route?.params || {};

  const diseaseName =
    prediction?.disease_symptom ||
    prediction?.diseaseSymptom ||
    '진단 결과 없음';

  return (
    <View style={styles.background}>
      <Header
        title="질병 예측하기"
        navigation={navigation}
        type="full"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.container
        }
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <Text
              style={styles.emptyText}
            >
              이미지 없음
            </Text>
          </View>
        )}

        <Text
          style={styles.headerText}
        >
          사진 분석 참고 결과
        </Text>

        <Text style={styles.resultLabel}>{diseaseName}</Text>

        <View
          style={styles.divider}
        />

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            잎의 색이나 반점만으로 원인을 확정하기 어렵습니다. 식물 종류, 흙의 젖은 정도, 최근 물주기와 빛 환경을 함께 확인해주세요.
          </Text>

          {note ? (
            <Text
              style={styles.tipText}
            >
              {'\n'}작성 메모 (사진 분석에는 사용되지 않음): {note}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <BottomButton
        title="식물로 돌아가기"
        onPress={() =>
          navigation.replace(
            'PlantDetail',
            { plant }
          )
        }
      />
    </View>
  );
}
