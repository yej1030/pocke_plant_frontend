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
import {DISEASE_SPECIES, canonicalDiseaseSpecies} from '../utils/diseaseSpecies';

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
    selectedSpecies,
  } = route?.params || {};

  const diseaseName =
    prediction?.disease_symptom ||
    prediction?.diseaseSymptom ||
    '진단 결과 없음';

  const status = prediction?.status;
  const speciesName = DISEASE_SPECIES.find(species => species.value ===
    (prediction?.species || selectedSpecies || canonicalDiseaseSpecies(plant?.species)))?.label;
  const resultKind = {
    unsupported: '현재 미지원 식물',
    unvalidated: '실사용 검증 중',
    uncertain: '판단 보류',
    retake: '재촬영 필요',
    experimental: '실험 모델 참고 결과',
  }[status] || '사진 분석 참고 결과';

  const confidence =
    normalizePercent(
      prediction?.confidence
    );

  const showConfidence =
    !status && prediction?.confidence != null && confidence > 0;

  const blocked = prediction?.normal_result_blocked === true;
  const candidates = !blocked && Array.isArray(prediction?.candidates)
    ? prediction.candidates : [];
  const relativeScores = prediction?.score_kind === 'relative_model_score';
  const topFeatures = candidates[0]?.features || prediction?.features;
  const topActions = candidates[0]?.actions || prediction?.actions;

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

        {speciesName ? <Text style={styles.resultLabel}>선택한 식물: {speciesName}{'\n'}</Text> : null}

        <Text style={styles.sectionLabel}>{blocked ? '확인된 상태' : '가장 유사한 병명·장해 후보'}</Text>

        {showConfidence ? (
          <ResultBar
            label={diseaseName}
            percent={confidence}
          />
        ) : (
          <Text style={styles.diseaseTitle}>
            {diseaseName}
          </Text>
        )}

        <View
          style={styles.divider}
        />

        <View style={styles.tipCard}>
          {topFeatures ? (
            <View style={styles.guidanceCard}>
              <Text style={styles.headerText}>어떤 문제인가요?</Text>
              <Text style={styles.tipText}>{topFeatures}</Text>
            </View>
          ) : null}
          {topActions ? (
            <View style={styles.actionCard}>
              <Text style={styles.headerText}>지금 이렇게 해주세요</Text>
              <Text style={styles.tipText}>{topActions}</Text>
            </View>
          ) : null}
          {prediction?.observation ? (
            <Text style={styles.tipText}>사진에서 보이는 상태: {prediction.observation}{'\n'}</Text>
          ) : null}
          {relativeScores && candidates.length > 0 ? <Text style={styles.headerText}>다른 후보와 비교</Text> : null}
          {candidates.map((candidate, index) => (
            <View key={`${candidate.name}-${index}`}>
              {relativeScores && Number.isFinite(candidate.comparison_score) ? (
                <ResultBar label={`${index + 1}. ${candidate.name}`} percent={normalizePercent(candidate.comparison_score)} />
              ) : index > 0 ? <Text style={styles.resultLabel}>{index + 1}. {candidate.name}</Text> : null}
              {index > 0 && candidate.features ? <Text style={styles.tipText}>특징·가능한 원인: {candidate.features}</Text> : null}
              {index > 0 && candidate.actions ? <Text style={styles.tipText}>관리 방법: {candidate.actions}{'\n'}</Text> : null}
            </View>
          ))}
          {!topActions && (blocked || candidates.length === 0) ? (
            <Text style={styles.tipText}>{prediction?.analysis_text || prediction?.actions || ''}</Text>
          ) : null}
          <Text style={styles.tipText}>
            {relativeScores && !blocked
              ? '위 %는 학습한 후보 사이의 모델 비교 점수입니다. 실제 발병 확률은 아직 검증되지 않았습니다.'
              : status === 'experimental'
              ? '사진에서 가장 비슷한 원인 후보입니다. 확률은 아직 검증되지 않았습니다. 추가 확인 항목을 함께 살펴보세요.'
              : showConfidence
              ? `${diseaseName} 가능성이 ${confidence}%로 분석되었습니다. 결과만으로 질병을 확정하지 말고 잎, 줄기, 흙 상태를 함께 확인해주세요.`
              : '잎의 색이나 반점만으로 원인을 확정하기 어렵습니다. 식물 종류, 흙의 젖은 정도, 최근 물주기와 빛 환경을 함께 확인해주세요.'}
          </Text>
          <Text style={styles.resultStatus}>{resultKind}</Text>

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
