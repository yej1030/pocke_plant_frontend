import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity, TextInput, ActivityIndicator, NativeModules, NativeEventEmitter } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import BleManager from 'react-native-ble-manager';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HardwareConnect({ navigation }) {
    const { alertConfig, showAlert, closeAlert } = useCustomAlert();
    
    const [step, setStep] = useState(1);
    const [hasPermission, setHasPermission] = useState(false);
    const [macAddress, setMacAddress] = useState('');
    
    const [wifiSsid, setWifiSsid] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');

    // 💡 이벤트 리스너 안에서 최신 입력값을 안전하게 읽기 위한 Ref 설정
    const ssidRef = useRef('');
    const passwordRef = useRef('');
    const macRef = useRef('');

    useEffect(() => {
        ssidRef.current = wifiSsid;
        passwordRef.current = wifiPassword;
        macRef.current = macAddress;
    }, [wifiSsid, wifiPassword, macAddress]);

    useEffect(() => {
        requestPermissions();
        
        // 💡 블루투스 모듈 초기화
        BleManager.start({ showAlert: false });

        // 💡 기기 발견 및 스캔 종료 이벤트 리스너 등록
        const discoverListener = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        const stopListener = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

        return () => {
            discoverListener.remove();
            stopListener.remove();
        };
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const permissions = [
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ];
                if (Platform.Version >= 31) {
                    permissions.push(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
                    permissions.push(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
                }
                const granted = await PermissionsAndroid.requestMultiple(permissions);
                const allGranted = Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED);

                if (allGranted) setHasPermission(true);
                else showAlert({ title: '권한 거부', message: '카메라 및 블루투스 권한이 필요합니다.', variant: 'error', onPress: () => navigation.goBack() });
            } catch (err) { console.warn(err); }
        } else {
            setHasPermission(true);
        }
    };

    const onReadCode = (event) => {
        const scannedMac = event.nativeEvent.codeStringValue;
        setMacAddress(scannedMac);
        setStep(2); 
    };

    const handleBleProvisioning = () => {
        if (!wifiSsid || !wifiPassword) {
            showAlert({ title: '입력 오류', message: '와이파이 정보를 모두 입력해주세요.', variant: 'warning' });
            return;
        }

        setStep(3); // 로딩 화면 진입
        
        // 💡 5초간 주변 블루투스 스캔 시작!
        BleManager.scan([], 5, true).catch(err => {
            setStep(2);
            showAlert({ title: '스캔 실패', message: '블루투스 스캔을 시작할 수 없습니다.', variant: 'error' });
        });
    };

    const handleDiscoverPeripheral = (peripheral) => {
        // 💡 화분(ESP32) 발견!
        if (peripheral.name === 'PocketPlant' || peripheral.localName === 'PocketPlant') {
            BleManager.stopScan(); 
            
            BleManager.connect(peripheral.id)
                .then(() => BleManager.retrieveServices(peripheral.id))
                .then(() => {
                    // 데이터 조립 ("이름:::비밀번호") 후 바이트 배열로 변환
                    const payload = `${ssidRef.current}:::${passwordRef.current}`;
                    const payloadBytes = payload.split('').map(c => c.charCodeAt(0));
                    
                    // 화분으로 데이터 쏘기!
                    return BleManager.write(
                        peripheral.id,
                        '4fafc201-1fb5-459e-8fcc-c5c9c331914b', // 서비스 아이디
                        'beb5483e-36e1-4688-b7f5-ea07361b26a8', // 캐릭터리스틱 아이디
                        payloadBytes
                    );
                })
                .then(() => {
                    showAlert({
                        title: '기기 연결 완벽 성공! 🎉',
                        message: '화분에 와이파이 정보가 전송되었습니다.',
                        variant: 'success',
                        buttonText: '식물 등록 완료하기',
                        onPress: () => navigation.navigate('PlantRegister', { macAddress: macRef.current })
                    });
                })
                .catch((error) => {
                    setStep(2);
                    showAlert({ title: '통신 에러', message: '화분과의 블루투스 연결이 끊어졌습니다.', variant: 'error' });
                });
        }
    };

    const handleStopScan = () => {
        setStep((prev) => {
            // 스캔이 끝났는데도 화면이 로딩중(3)이면 기기를 못 찾은 것
            if (prev === 3) {
                showAlert({ title: '시간 초과', message: '주변에서 화분을 찾을 수 없습니다. 전원을 확인해주세요.', variant: 'error' });
                return 2;
            }
            return prev;
        });
    };

    if (!hasPermission) return <View style={styles.container}><Text style={{color:'black', marginTop:100, textAlign:'center'}}>권한이 필요합니다.</Text></View>;

    return (
        <View style={styles.container}>
            <Header title="기기 등록" navigation={navigation} onBackPress={() => step === 2 ? setStep(1) : navigation.goBack()} />
            
            {step === 1 && (
                <View style={styles.contentWrap}>
                    <Text style={styles.title}>화분 뒷면의 QR 코드를 스캔해주세요</Text>
                    <View style={styles.cameraBox}>
                        <Camera style={styles.camera} cameraType={CameraType.Back} scanBarcode={true} onReadCode={onReadCode} showFrame={true} laserColor='#5CD79E' frameColor='white' />
                    </View>
                    <Text style={styles.subtitle}>사각형 테두리 안으로 QR 코드를 맞춰주세요.</Text>
                    <TouchableOpacity style={styles.skipBtn} onPress={() => onReadCode({ nativeEvent: { codeStringValue: "10:00:3B:D1:3F:C8" }})}>
                        <Text style={styles.skipBtnText}>[테스트] QR 스캔 건너뛰기</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 2 && (
                <View style={styles.contentWrap}>
                    <Text style={styles.title_green}>기기(MAC: {macAddress}) 인식 성공!</Text>
                    <Text style={styles.desc}>기기를 연결할 Wi-Fi 정보를 입력해 주세요.</Text>
                    <Text style={styles.warning}>※ 반드시 스마트폰이 연결된 2.4GHz Wi-Fi를 입력하세요.</Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder="Wi-Fi 이름 (예: U+Net_5G)" 
                        value={wifiSsid} 
                        onChangeText={setWifiSsid} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Wi-Fi 비밀번호" 
                        value={wifiPassword} 
                        onChangeText={setWifiPassword} 
                        secureTextEntry 
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={handleBleProvisioning}>
                        <Text style={styles.submitBtnText}>기기로 와이파이 정보 전송하기 🚀</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 3 && (
                <View style={styles.loadingWrap}>
                    <ActivityIndicator size="large" color="#5CD79E" />
                    <Text style={styles.loadingTitle}>기기로 정보를 전송 중입니다...</Text>
                    <Text style={styles.loadingDesc}>블루투스를 통해 화분과 안전하게 연결하고 있습니다.{"\n"}잠시만 기다려주세요 (최대 5초)</Text>
                    <TouchableOpacity style={{marginTop: 50}} onPress={() => {
                        showAlert({
                            title: '[테스트] 연결 성공!', message: '화분이 연결되었습니다.', variant: 'success', onPress: () => navigation.navigate('PlantRegister', { macAddress: macAddress })
                        });
                    }}>
                        <Text style={{color: '#ccc', fontSize: 12}}>응답이 없다면? (강제 연결 처리)</Text>
                    </TouchableOpacity>
                </View>
            )}

            <CustomAlert {...alertConfig} onRequestClose={closeAlert} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    contentWrap: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
    title: { color: '#333', fontSize: 18, marginBottom: 30, fontWeight: 'bold' },
    subtitle: { color: '#888', fontSize: 14, marginTop: 20 },
    cameraBox: { width: 280, height: 280, overflow: 'hidden', borderRadius: 16, backgroundColor: '#000' },
    camera: { flex: 1 },
    title_green: { color: '#5CD79E', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    desc: { fontSize: 16, color: '#444', marginBottom: 5 },
    warning: { fontSize: 13, color: '#FF6B6B', marginBottom: 30 },
    input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 15 },
    submitBtn: { width: '100%', backgroundColor: '#5CD79E', height: 55, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
    submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
    loadingTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 10 },
    loadingDesc: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 22 },
    skipBtn: { marginTop: 40, padding: 10 },
    skipBtnText: { color: '#ccc', fontSize: 13 }
});