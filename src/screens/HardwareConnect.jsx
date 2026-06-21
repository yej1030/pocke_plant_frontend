import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    TextInput,
    ScrollView,
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Easing,
    TouchableOpacity,
} from 'react-native';

import Header from '../components/Header';
import PrimaryButton from '../components/Bottombutton';
import styles from './style/HardwareConnect.style';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

const steps = [
    {
        title: '주변 기기 탐색 중',
        subtitle: '같은 Wi-Fi에 연결된\nESP32 장치를 찾고 있어요.',
        button: '다음',
    },
    {
        title: '기기 발견',
        subtitle: '연결할 기기를 선택해주세요.',
        button: '다음',
    },
    {
        title: 'PocketPlant - ESP32',
        subtitle: '이 기기가 접속할 Wi-Fi 정보를 입력해주세요.',
        button: '완료',
    },
    {
        title: '연결 완료!',
        subtitle: '모든 센서가 정상 작동 중이에요.',
        button: '식물 돌보러 가기',
    },
];

// 살짝 눌렸다가 돌아오는 버튼
function AnimatedPressable({ onPress, style, children, disabled }) {
    const scale = useRef(new Animated.Value(1)).current;

    const pressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 40,
            bounciness: 6,
        }).start();
    };

    const pressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 40,
            bounciness: 6,
        }).start();
    };

    return (
        <Pressable
            style={style}
            onPress={onPress}
            onPressIn={pressIn}
            onPressOut={pressOut}
            disabled={disabled}
        >
            <Animated.View
                style={{
                    width: '100%',
                    transform: [{ scale }],
                }}
            >
                {children}
            </Animated.View>
        </Pressable>
    );
}

// STEP1 펄스 — 기존 스타일 뷰를 받아서 scale+opacity 루프
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

export default function HardwareConnect({ navigation, route }) {
    const [step, setStep] = useState(0);
    const [wifiName, setWifiName] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [selectedDevice, setSelectedDevice] = useState(false);
    const { alertConfig, showAlert, closeAlert } = useCustomAlert();

    const stepInfo = steps[step];

    // 스텝 전환 페이드+슬라이드업
    const contentAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        contentAnim.setValue(0);
        Animated.timing(contentAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [step]);

    // STEP4 체크 팝 스프링
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

    const details = useMemo(
        () => [
            { label: '연결기기', value: 'PocketPlant - ESP32' },
            { label: 'IP 주소', value: '123.41.66' },
            { label: '데이터 주기', value: '1시간마다 자동 갱신' },
            { label: '상태', value: '양호' },
        ],
        []
    );

    // STEP1: 2초 후 자동으로 STEP2로 이동
    useEffect(() => {
        if (step !== 0) return;
        const timer = setTimeout(() => setStep(1), 2000);
        return () => clearTimeout(timer);
    }, [step]);

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

        if (step === 2 && (!wifiName.trim() || !wifiPassword.trim())) {
            showAlert({
                title: 'Wi-Fi 정보를 입력해주세요',
                message: 'Wi-Fi 이름과 비밀번호를 모두 입력해주세요.',
                variant: 'warning',
                buttonText: '확인',
            });
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
                            params: {
                                plant: route.params.plant,
                                hardwareConnected: true,
                            },
                        },
                    ],
                });
            } else {
                navigation.goBack();
            }
            return;
        }
        setStep(step + 1);
    };

    useEffect(() => {
        const backAction = () => {
            if (step > 0) {
                setStep(prev => prev - 1);
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [step]);

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
                    {/* STEP 1 */}
                    {step === 0 && (
                        <View style={styles.scanWrap}>
                            {/* 기존 pulse 뷰에 애니메이션 적용 */}
                            <PulseView
                                style={styles.pulseOuter}
                                delay={0}
                                minScale={0.9}
                                maxScale={1.1}
                            />
                            <PulseView
                                style={styles.pulseMiddle}
                                delay={200}
                                minScale={0.88}
                                maxScale={1.12}
                            />
                            <PulseView
                                style={styles.pulseInner}
                                delay={400}
                                minScale={0.85}
                                maxScale={1.15}
                            />
                            <View style={styles.iconCircle}>
                                <Image
                                    source={require('../assets/icon/iot.png')}
                                    style={styles.iotIcon}
                                />
                            </View>
                            <Text style={styles.title_1}>{stepInfo.title}</Text>
                            <Text style={styles.subtitle}>{stepInfo.subtitle}</Text>
                        </View>
                    )}

                    {/* STEP 2 */}
                    {step === 1 && (
    <View style={styles.deviceWrap}>
        <View style={styles.deviceIconCircle}>
            <Text style={styles.partyIcon}>🎉</Text>
        </View>
        <Text style={styles.title}>{stepInfo.title}</Text>
        <Text style={styles.subtitle}>{stepInfo.subtitle}</Text>

        {/* ✅ AnimatedPressable → TouchableOpacity로 교체 */}
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
                <Text style={styles.deviceName}>
                    PocketPlant - ESP32
                </Text>
                <Text style={styles.deviceIp}>
                    123.41.66 포켓플랜트 전용 기기
                </Text>
            </View>
            <View style={styles.radio}>
                {selectedDevice && (
                    <View style={styles.radioInner} />
                )}
            </View>
        </TouchableOpacity>
    </View>
)}

                    {/* STEP 3 */}
                    {step === 2 && (
                        <View style={styles.wifiWrap}>
                            <View style={styles.deviceIconCircle}>
                                <Text style={styles.wifiIcon}>📶</Text>
                            </View>
                            <Text style={styles.title}>{stepInfo.title}</Text>
                            <Text style={styles.subtitle_3}>{stepInfo.subtitle}</Text>

                            <TextInput
                                value={wifiName}
                                onChangeText={setWifiName}
                                placeholder="Wi-Fi 이름 (2.4GHz)"
                                style={styles.input}
                                maxLength={20}
                            />
                            <TextInput
                                value={wifiPassword}
                                onChangeText={setWifiPassword}
                                placeholder="Wi-Fi 비밀번호"
                                secureTextEntry
                                style={styles.input}
                                maxLength={20}
                            />

                            <View style={styles.noticeBox}>
                                <Text style={styles.noticeText}>
                                    ESP32는 2.4GHz Wi-Fi만 지원해요.{'\n'}
                                    5GHz 전용 공유기라면 2.4GHz 대역을 따로 켜주세요.
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* STEP 4 */}
                    {step === 3 && (
                        <View style={styles.doneWrap}>
                            {/* 체크 팝 스프링 */}
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
                                            index === details.length - 1 &&
                                                styles.summaryRowLast,
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

            {/* STEP1은 자동 진행이라 버튼 숨김 */}
            {step !== 0 && (
                <PrimaryButton
                    title={stepInfo.button}
                    onPress={handleNext}
                />
            )}

            <CustomAlert
                {...alertConfig}
                onRequestClose={closeAlert}
            />
        </KeyboardAvoidingView>
    );
}
