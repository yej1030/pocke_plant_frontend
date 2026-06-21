import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { Camera, CameraType } from 'react-native-camera-kit';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

const bleManager = new BleManager();

export default function HardwareConnect({ navigation }) {
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  const [step, setStep] = useState(1);
  const [hasPermission, setHasPermission] = useState(false);
  const [macAddress, setMacAddress] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');

  useEffect(() => {
    requestCameraPermission();

    return () => {
      bleManager.destroy();
    };
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
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // 위치 권한 필수 추가
    ]);

    console.log('[권한 로그] 권한 결과 = ', granted);

    return (
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const onReadCode = event => {
    const scannedMac = event.nativeEvent.codeStringValue;
    setMacAddress(scannedMac);
    setStep(2);
  };

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

    setStep(3);

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
            console.log('[앱 로그] ❌ 스캔 중 에러 발생:', error);
            reject(error);
            return;
          }

          if (device?.name === 'PocketPlant' || device?.localName === 'PocketPlant') {
            console.log(`[앱 로그] 2. 🎯 기기 발견! (이름: ${device?.name || device?.localName})`);
            clearTimeout(timeout);
            foundDevice = device;
            bleManager.stopDeviceScan();
            resolve();
          }
        });
      });

      if (!foundDevice) {
        throw new Error('ESP32를 찾을 수 없습니다.');
      }

      console.log('[앱 로그] 3. 기기에 블루투스 연결 시도 중...');
      const connectedDevice = await foundDevice.connect();

      console.log('[앱 로그] 4. 서비스 및 채널 탐색 중...');
      await connectedDevice.discoverAllServicesAndCharacteristics();

      const payload = `${wifiSsid}:::${wifiPassword}`;
      const encoded = Buffer.from(payload).toString('base64');

      console.log('\n====== [BLE 전송 데이터 확인] ======');
      console.log('원본 텍스트:', payload);
      console.log('Base64 변환:', encoded);
      console.log('====================================\n');

      console.log('[앱 로그] 5. 아두이노로 데이터 발사!');
      await connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        encoded
      );

      console.log('[앱 로그] 6. 전송 성공! 아두이노가 소화할 때까지 1.5초 대기...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('[앱 로그] 7. 안전하게 연결 해제 진행');
      await connectedDevice.cancelConnection();
      
      console.log('[앱 로그] 8. 모든 절차 완벽 종료. 다음 화면으로 이동.');

      showAlert({
        title: '연결 성공 🎉',
        message: 'ESP32에 Wi-Fi 정보 전송 완료',
        variant: 'success',
        buttonText: '식물 등록',
        onPress: () => {
          navigation.navigate('PlantRegister', {
            macAddress,
          });
        },
      });
    } catch (err) {
      console.log('\n[앱 로그] ❌ 치명적 에러 발생:', err?.message || err);

      setStep(2);

      showAlert({
        title: '연결 실패',
        message: err?.message ?? 'BLE 연결 실패',
        variant: 'error',
      });
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 필요합니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="기기 등록" navigation={navigation} />

      {step === 1 && (
        <View style={styles.center}>
          <Text>QR 코드를 스캔해주세요</Text>
          <View style={styles.cameraBox}>
            <Camera
              style={styles.camera}
              cameraType={CameraType.Back}
              scanBarcode={true}
              onReadCode={onReadCode}
            />
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={styles.center}>
          <Text>MAC : {macAddress}</Text>

          <TextInput
            style={styles.input}
            placeholder="Wi-Fi SSID"
            value={wifiSsid}
            onChangeText={setWifiSsid}
          />

          <TextInput
            style={styles.input}
            placeholder="Wi-Fi Password"
            value={wifiPassword}
            secureTextEntry
            onChangeText={setWifiPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSmartConfig}>
            <Text>BLE 연결 시작</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>ESP32와 블루투스 연결 중입니다.</Text>
          <Text>Wi-Fi 정보를 전송하고 있습니다.</Text>
        </View>
      )}

      <CustomAlert {...alertConfig} onRequestClose={closeAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraBox: {
    width: 280,
    height: 280,
    marginTop: 20,
  },
  camera: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#5CD79E',
  },
});