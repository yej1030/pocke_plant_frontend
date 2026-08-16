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

function normalizePercent(
  confidence
) {
  const number =
    Number(confidence);

  if (!Number.isFinite(number)) {
    return 0;
  }

  /*
   * FastAPI가 0~1로 반환하는 경우와
   * 0~100으로 반환하는 경우 모두 처리합니다.
   */
  const percent =
    number <= 1
      ? number * 100
      : number;

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(percent)
    )
  );
}

function ResultBar({
  label,
  percent,
}) {
  return (
    <View style={styles.resultRow}>
      <View
        style={styles.resultHeader}
      >
        <Text
          style={styles.resultLabel}
        >
          {label}
        </Text>

        <Text
          style={styles.resultPercent}
        >
          {percent}%
        </Text>
      </View>

      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percent}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

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

  const confidence =
    normalizePercent(
      prediction?.confidence
    );

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
          ⚠ 감지된 이상 징후
        </Text>

        <ResultBar
          label={diseaseName}
          percent={confidence}
        />

        <View
          style={styles.divider}
        />

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            {confidence > 0
              ? `${diseaseName} 가능성이 ${confidence}%로 분석되었습니다. 결과만으로 질병을 확정하지 말고 잎, 줄기, 흙 상태를 함께 확인해주세요.`
              : '명확한 진단 결과를 받지 못했습니다. 다른 각도에서 촬영한 선명한 사진으로 다시 시도해주세요.'}
          </Text>

          {note ? (
            <Text
              style={styles.tipText}
            >
              {'\n'}작성 메모: {note}
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