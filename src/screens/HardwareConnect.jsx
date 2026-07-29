import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  Animated,
  Easing,
  Image,
} from 'react-native';

import { Camera, CameraType } from 'react-native-camera-kit';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

import Header from '../components/Header';
import PrimaryButton from '../components/Bottombutton';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/HardwareConnect.style';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

// ─── 펄스 링 애니메이션 ──────────────────────────────────────────────────────
function PulseView({ style, delay = 0, minScale = 0.92, maxScale = 1.08 }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [minScale, maxScale],
              }),
            },
          ],
          opacity: anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.4, 1, 0.4],
          }),
        },
      ]}
    />
  );
}

// ─── 스텝 정의 ───────────────────────────────────────────────────────────────
const STEPS = [
  { title: 'QR 코드 스캔', subtitle: 'ESP32 기기의 QR 코드를\n카메라로 스캔해주세요.', button: null },
  { title: '기기 발견', subtitle: '연결할 기기를 선택해주세요.', button: '다음' },
  { title: 'PocketPlant - ESP32', subtitle: '이 기기가 접속할 Wi-Fi 정보를 입력해주세요.', button: '완료' },
  { title: '연결 완료!', subtitle: '모든 센서가 정상 작동 중이에요.', button: '식물 돌보러 가기' },
];

export default function HardwareConnect({ navigation, route }) {
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  // ── 상태 ──────────────────────────────────────────────────────────────────
  const [step, setStep] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [macAddress, setMacAddress] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(false);

  const stepInfo = STEPS[step];

  // ── 스텝 전환 페이드+슬라이드업 ──────────────────────────────────────────
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    contentAnim.setValue(0);
    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [step]);

  // ── STEP 3 체크 팝 스프링 ────────────────────────────────────────────────
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (step !== 3) return;
    checkAnim.setValue(0);
    Animated.spring(checkAnim, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [step]);

  // ── 카메라 권한 요청 ──────────────────────────────────────────────────────
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') {
      setHasPermission(true);
      return;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setHasPermission(true);
    }
  };

  const requestBlePermissions = async () => {
    if (Platform.OS !== 'android') return true;
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    return (
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  };

  // ── QR 스캔 완료 ──────────────────────────────────────────────────────────
  const onReadCode = event => {
    const scannedMac = event.nativeEvent.codeStringValue;
    setMacAddress(scannedMac);
    setSelectedDevice(false);
    setStep(1);
  };

  // ── BLE 연결 + WiFi 전송 (매번 새 인스턴스 생성) ─────────────────────────
  const handleSmartConfig = async () => {
    if (!wifiSsid || !wifiPassword) {
      showAlert({
        title: '입력 오류',
        message: 'SSID와 비밀번호를 입력해주세요.',
        variant: 'warning',
      });
      return;
    }

    const granted = await requestBlePermissions();
    if (!granted) {
      showAlert({
        title: '권한 필요',
        message: '블루투스 및 위치 권한을 허용해주세요.',
        variant: 'error',
      });
      return;
    }

    setIsConnecting(true);

    // ✅ 매 연결 시도마다 새 BleManager 생성
    const bleManager = new BleManager();

    try {
      let foundDevice = null;

      console.log('\n[앱 로그] 1. ESP32 기기 스캔 시작...');

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          bleManager.stopDeviceScan();
          console.log('[앱 로그] ❌ 스캔 타임아웃 (15초 초과)');
          reject(new Error('ESP32를 찾지 못했습니다.'));
        }, 15000);

        bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            clearTimeout(timeout);
            reject(error);
            return;
          }
          if (device?.name === 'PocketPlant' || device?.localName === 'PocketPlant') {
            console.log(`[앱 로그] 2. 🎯 기기 발견! (${device?.name || device?.localName})`);
            clearTimeout(timeout);
            foundDevice = device;
            bleManager.stopDeviceScan();
            resolve();
          }
        });
      });

      if (!foundDevice) throw new Error('ESP32를 찾을 수 없습니다.');

      console.log('[앱 로그] 3. 블루투스 연결 시도...');
      const connectedDevice = await foundDevice.connect();

      console.log('[앱 로그] 4. 서비스 탐색...');
      await connectedDevice.discoverAllServicesAndCharacteristics();

      const payload = `${wifiSsid}:::${wifiPassword}`;
      const encoded = Buffer.from(payload).toString('base64');

      console.log('[앱 로그] 5. 데이터 전송!');
      await connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        encoded
      );

      await new Promise(resolve => setTimeout(resolve, 1500));
      await connectedDevice.cancelConnection();

      console.log('[앱 로그] 6. 완료!');

      // ✅ 성공 시 정리
      bleManager.destroy();
      setIsConnecting(false);
      setStep(3);
    } catch (err) {
      console.log('\n[앱 로그] ❌ 에러:', err?.message || err);

      // ✅ 실패 시도 정리
      bleManager.destroy();
      setIsConnecting(false);
      showAlert({
        title: '연결 실패',
        message: err?.message ?? 'BLE 연결 실패',
        variant: 'error',
      });
    }
  };

  // ── 다음 버튼 핸들러 ──────────────────────────────────────────────────────
  const handleNext = () => {
    if (step === 1 && !selectedDevice) {
      showAlert({
        title: '기기를 선택해주세요',
        message: '연결할 ESP32 기기를 먼저 선택해주세요.',
        variant: 'warning',
        buttonText: '확인',
      });
      return;
    }

    if (step === 2) {
      handleSmartConfig();
      return;
    }

if (step === 3) {
  if (route?.params?.plant) {
    navigation.reset({
      index: 1,
      routes: [
        { name: 'Main' },
        {
          name: 'PlantDetail',
          params: { plant: route.params.plant, hardwareConnected: true },
        },
      ],
    });
  } else if (route?.params?.fromPlantRegister) {
    // ✅ PlantRegister에서 왔을 때 macAddress 돌려주기
    console.log('[HardwareConnect] macAddress 전달:', macAddress);
    navigation.navigate('PlantRegister', { macAddress });
  } else {
    navigation.goBack();
  }
  return;
}

    setStep(step + 1);
  };

  // ── 뒤로가기 처리 ────────────────────────────────────────────────────────
  useEffect(() => {
    const backAction = () => {
      if (step > 0) {
        setStep(prev => prev - 1);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [step]);

  // ── 완료 화면 요약 데이터 ─────────────────────────────────────────────────
  const details = useMemo(
    () => [
      { label: '연결기기', value: 'PocketPlant - ESP32' },
      { label: 'MAC 주소', value: macAddress || '—' },
      { label: 'Wi-Fi', value: wifiSsid || '—' },
      { label: '상태', value: '정상 연결됨' },
    ],
    [macAddress, wifiSsid]
  );

  // ── 카메라 권한 없음 ──────────────────────────────────────────────────────
  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 필요합니다.</Text>
      </View>
    );
  }

  // ── STEP 0: 전체화면 카메라 ───────────────────────────────────────────────
  if (step === 0) {
    return (
      <View style={styles.container}>
        {/* 카메라 전체화면 */}
        <Camera
          style={StyleSheet.absoluteFill}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={onReadCode}
        />

        {/* 상단 오버레이 — 헤더 + 진행바 */}
        <View style={styles.qrTopOverlay}>
          <Header
            title="하드웨어 연결"
            navigation={navigation}
            type="full"
            onBackPress={() => navigation.goBack()}
            dark
          />
          <View style={styles.progressWrapOverlay}>
            {[0, 1, 2, 3].map(item => (
              <View
                key={item}
                style={[
                  styles.progressBarOverlay,
                  item === 0 && styles.progressBarOverlayActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 스캔 가이드 프레임 모서리 4개 */}
        <View style={styles.qrFrameWrap} pointerEvents="none">
          <View style={[styles.qrCorner, styles.qrCornerTL]} />
          <View style={[styles.qrCorner, styles.qrCornerTR]} />
          <View style={[styles.qrCorner, styles.qrCornerBL]} />
          <View style={[styles.qrCorner, styles.qrCornerBR]} />
        </View>

        {/* 하단 안내 텍스트 */}
        <View style={styles.qrBottomOverlay} pointerEvents="none">
          <Text style={styles.qrTitle}>QR 코드 스캔</Text>
          <Text style={styles.qrHint}>ESP32 기기의 QR 코드를{'\n'}네모 안에 맞춰주세요</Text>
        </View>

        <CustomAlert {...alertConfig} onRequestClose={closeAlert} />
      </View>
    );
  }

  // ── STEP 1~3 일반 레이아웃 ───────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-60}
    >
      <Header
        title="하드웨어 연결"
        navigation={navigation}
        type="full"
        onBackPress={() => {
          if (step > 0) setStep(step - 1);
          else navigation.goBack();
        }}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 진행바 */}
        <View style={styles.progressWrap}>
          {[0, 1, 2, 3].map(item => (
            <View
              key={item}
              style={[
                styles.progressBar,
                step >= item && styles.progressBarActive,
              ]}
            />
          ))}
        </View>

        {/* 스텝 콘텐츠 — 페이드+슬라이드업 */}
        <Animated.View
          style={{
            width: '100%',
            alignItems: 'center',
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >

          {/* ── STEP 1: 기기 발견 ── */}
          {step === 1 && (
            <View style={styles.deviceWrap}>
              <View style={styles.deviceIconCircle}>
                <Text style={styles.partyIcon}>🎉</Text>
              </View>
              <Text style={styles.title}>{stepInfo.title}</Text>
              <Text style={styles.subtitle}>{stepInfo.subtitle}</Text>

              <TouchableOpacity
                activeOpacity={0.75}
                style={[
                  styles.deviceCard,
                  selectedDevice && styles.deviceCardSelected,
                ]}
                onPress={() => setSelectedDevice(true)}
              >
                <Image
                  source={require('../assets/icon/iot.png')}
                  style={styles.deviceIcon}
                />
                <View style={styles.deviceInfo}>
                  <Text style={styles.deviceName}>PocketPlant - ESP32</Text>
                  <Text style={styles.deviceIp}>
                    {macAddress ? macAddress : '—'} · 포켓플랜트 전용 기기
                  </Text>
                </View>
                <View style={styles.radio}>
                  {selectedDevice && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* ── STEP 2: Wi-Fi 입력 또는 연결 중 ── */}
          {step === 2 && (
            isConnecting ? (
              <View style={styles.loadingWrap}>
                <View style={styles.loadingCircle}>
                  <ActivityIndicator size="large" color="#7fc77c" />
                </View>
                <Text style={styles.title}>연결 중...</Text>
                <Text style={styles.loadingText}>
                  ESP32와 블루투스로 연결하고{'\n'}Wi-Fi 정보를 전송하고 있어요.
                </Text>
              </View>
            ) : (
              <View style={styles.wifiWrap}>
                <View style={styles.deviceIconCircle}>
                  <Text style={styles.wifiIcon}>📶</Text>
                </View>
                <Text style={styles.title}>{stepInfo.title}</Text>
                <Text style={styles.subtitle_3}>{stepInfo.subtitle}</Text>

                {macAddress ? (
                  <View style={styles.macBadge}>
                    <Text style={styles.macText}>MAC · {macAddress}</Text>
                  </View>
                ) : null}

                <TextInput
                  value={wifiSsid}
                  onChangeText={setWifiSsid}
                  placeholder="Wi-Fi 이름 (2.4GHz)"
                  style={styles.input}
                  maxLength={32}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <TextInput
                  value={wifiPassword}
                  onChangeText={setWifiPassword}
                  placeholder="Wi-Fi 비밀번호"
                  secureTextEntry
                  style={styles.input}
                  maxLength={64}
                />

                <View style={styles.noticeBox}>
                  <Text style={styles.noticeIcon}>⚠️</Text>
                  <Text style={styles.noticeText}>
                    ESP32는 2.4GHz Wi-Fi만 지원해요.{'\n'}
                    5GHz 전용 공유기라면 2.4GHz 대역을 따로 켜주세요.
                  </Text>
                </View>
              </View>
            )
          )}

          {/* ── STEP 3: 연결 완료 ── */}
          {step === 3 && (
            <View style={styles.doneWrap}>
              <Animated.View
                style={[
                  styles.doneCircle,
                  {
                    transform: [{ scale: checkAnim }],
                    opacity: checkAnim,
                  },
                ]}
              >
                <Text style={styles.doneIcon}>✓</Text>
              </Animated.View>

              <Text style={styles.title}>{stepInfo.title}</Text>
              <Text style={styles.subtitle}>{stepInfo.subtitle}</Text>

              <View style={styles.summaryCard}>
                {details.map((item, index) => (
                  <View
                    key={item.label}
                    style={[
                      styles.summaryRow,
                      index === details.length - 1 && styles.summaryRowLast,
                    ]}
                  >
                    <Text style={styles.summaryLabel}>{item.label}</Text>
                    <Text style={styles.summaryValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        </Animated.View>
      </ScrollView>

      {/* 하단 버튼 — 연결 중엔 숨김 */}
      {!isConnecting && (
        <PrimaryButton
          title={stepInfo.button}
          onPress={handleNext}
        />
      )}

      <CustomAlert {...alertConfig} onRequestClose={closeAlert} />
    </KeyboardAvoidingView>
  );
}
