import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import {
  getWateringHistory,
  getWateringSettings,
  requestManualWatering,
  updateWateringSettings,
} from '../api/api';
import styles from './style/WateringControl.style';

const MODES = [
  { value: 'MANUAL', label: '수동만' },
  { value: 'INTERVAL', label: '며칠 간격' },
  { value: 'SOIL', label: '토양 수분' },
];

const INITIAL_FORM = {
  automaticEnabled: false,
  mode: 'MANUAL',
  amountMl: '100',
  intervalDays: '7',
  soilMoistureThreshold: '30',
  minimumIntervalHours: '24',
  pumpMlPerSecond: '30',
};

export default function WateringControl({ navigation, route }) {
  const plant = route?.params?.plant;
  const plantId = plant?.id;
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [watering, setWatering] = useState(false);

  const applySettings = useCallback(data => {
    if (!data) return;
    setStatus(data);
    setForm({
      automaticEnabled: !!data.automaticEnabled,
      mode: data.mode || 'MANUAL',
      amountMl: String(data.amountMl ?? 100),
      intervalDays: String(data.intervalDays ?? 7),
      soilMoistureThreshold: String(data.soilMoistureThreshold ?? 30),
      minimumIntervalHours: String(data.minimumIntervalHours ?? 24),
      pumpMlPerSecond: String(data.pumpMlPerSecond ?? 30),
    });
  }, []);

  const load = useCallback(async isRefresh => {
    if (!plantId) return;
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const [settings, commands] = await Promise.all([
        getWateringSettings(plantId),
        getWateringHistory(plantId),
      ]);
      applySettings(settings);
      setHistory(Array.isArray(commands) ? commands : []);
    } catch (error) {
      showAlert({
        title: '조회 실패',
        message: error.response?.data?.message || '급수 정보를 불러오지 못했습니다.',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [applySettings, plantId, showAlert]);

  useEffect(() => {
    load(false);
  }, [load]);

  const change = (key, value) => setForm(previous => ({
    ...previous,
    [key]: value,
  }));

  const numberValue = key => Number(form[key]);

  const settingsPayload = () => ({
    automaticEnabled: form.mode === 'MANUAL' ? false : form.automaticEnabled,
    mode: form.mode,
    amountMl: numberValue('amountMl'),
    intervalDays: numberValue('intervalDays'),
    soilMoistureThreshold: numberValue('soilMoistureThreshold'),
    minimumIntervalHours: numberValue('minimumIntervalHours'),
    pumpMlPerSecond: numberValue('pumpMlPerSecond'),
  });

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const saved = await updateWateringSettings(plantId, settingsPayload());
      applySettings(saved);
      showAlert({
        title: '저장 완료',
        message: '급수 설정을 저장했습니다.',
        variant: 'success',
      });
    } catch (error) {
      showAlert({
        title: '저장 실패',
        message: error.response?.data?.message || '입력값을 확인해주세요.',
        variant: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const waterNow = async () => {
    if (watering) return;
    setWatering(true);
    try {
      const command = await requestManualWatering(plantId, numberValue('amountMl'));
      setHistory(previous => [command, ...previous]);
      showAlert({
        title: '급수 요청 완료',
        message: `ESP32가 연결되어 있으면 약 5초 안에 ${command.amountMl}mL 급수를 시작합니다.`,
        variant: 'success',
      });
    } catch (error) {
      showAlert({
        title: '급수 요청 실패',
        message: error.response?.data?.message || '급수 명령을 보내지 못했습니다.',
        variant: 'error',
      });
    } finally {
      setWatering(false);
    }
  };

  if (!plantId) {
    return (
      <View style={styles.screen}>
        <Header title="물주기" navigation={navigation} type="full" />
        <View style={styles.center}><Text>식물 정보를 찾을 수 없습니다.</Text></View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={`${plant?.name || '식물'} 물주기`} navigation={navigation} type="full" />
      {loading ? (
        <View style={styles.center}><ActivityIndicator color="#69B578" /></View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} />}
        >
          <View style={styles.statusCard}>
            <Text style={styles.cardTitle}>현재 상태</Text>
            <View style={styles.statusRow}>
              <Status label="토양 수분" value={status?.latestSoilMoisture == null ? '-' : `${Math.round(status.latestSoilMoisture)}%`} />
              <Status label="마지막 급수" value={formatDate(status?.lastWateredAt)} />
            </View>
            <Text style={styles.caption}>센서 갱신: {formatDate(status?.latestSensorAt)}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>지금 물주기</Text>
            <Field label="급수량 (10~500mL)" value={form.amountMl} onChange={value => change('amountMl', value)} />
            <TouchableOpacity style={styles.primaryButton} onPress={waterNow} disabled={watering}>
              <Text style={styles.primaryButtonText}>{watering ? '요청 중...' : `${form.amountMl || 0}mL 물주기`}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>자동 급수</Text>
            <View style={styles.modeRow}>
              {MODES.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.modeButton, form.mode === item.value && styles.modeButtonActive]}
                  onPress={() => change('mode', item.value)}
                >
                  <Text style={[styles.modeText, form.mode === item.value && styles.modeTextActive]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {form.mode !== 'MANUAL' && (
              <View style={styles.switchRow}>
                <View>
                  <Text style={styles.switchTitle}>자동 급수 사용</Text>
                  <Text style={styles.caption}>처음에는 꺼진 상태가 안전합니다.</Text>
                </View>
                <Switch
                  value={form.automaticEnabled}
                  onValueChange={value => change('automaticEnabled', value)}
                  trackColor={{ false: '#DDE4DF', true: '#A9DCB2' }}
                  thumbColor={form.automaticEnabled ? '#59A96A' : '#FFFFFF'}
                />
              </View>
            )}

            {form.mode === 'INTERVAL' && (
              <Field label="급수 간격 (1~90일)" value={form.intervalDays} onChange={value => change('intervalDays', value)} />
            )}
            {form.mode === 'SOIL' && (
              <>
                <Field label="급수 시작 수분 (5~80%)" value={form.soilMoistureThreshold} onChange={value => change('soilMoistureThreshold', value)} />
                <Field label="최소 재급수 간격 (6~720시간)" value={form.minimumIntervalHours} onChange={value => change('minimumIntervalHours', value)} />
              </>
            )}
            <Field label="펌프 보정값 (초당 mL)" value={form.pumpMlPerSecond} onChange={value => change('pumpMlPerSecond', value)} />
            <Text style={styles.warning}>실측 보정 전에는 자동 급수를 켜지 마세요. 기본값은 30mL/초입니다.</Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={save} disabled={saving}>
              <Text style={styles.secondaryButtonText}>{saving ? '저장 중...' : '설정 저장'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>최근 급수 기록</Text>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>아직 급수 기록이 없습니다.</Text>
            ) : history.slice(0, 10).map(command => (
              <View key={command.commandId} style={styles.historyRow}>
                <View>
                  <Text style={styles.historyAmount}>{command.amountMl}mL · {sourceLabel(command.source)}</Text>
                  <Text style={styles.caption}>{formatDate(command.createdAt)}</Text>
                </View>
                <Text style={styles.historyStatus}>{statusLabel(command.status)}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttonText={alertConfig.buttonText}
        onPress={alertConfig.onPress}
        variant={alertConfig.variant}
        onRequestClose={closeAlert}
      />
    </View>
  );
}

function Field({ label, value, onChange }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChange(text.replace(/[^0-9.]/g, ''))}
        keyboardType="decimal-pad"
        maxLength={6}
      />
    </View>
  );
}

function Status({ label, value }) {
  return (
    <View style={styles.statusItem}>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={styles.statusValue}>{value}</Text>
    </View>
  );
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function statusLabel(status) {
  return ({
    PENDING: '대기',
    DISPATCHED: '실행 중',
    COMPLETED: '완료',
    FAILED: '실패',
    EXPIRED: '만료',
  })[status] || status;
}

function sourceLabel(source) {
  return ({ MANUAL: '수동', INTERVAL: '간격', SOIL: '수분 감지' })[source] || source;
}
