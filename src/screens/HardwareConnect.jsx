import React, { useState, useMemo, useEffect, } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    BackHandler,
    KeyboardAvoidingView, // ✅ 추가
    Platform, // ✅ 추가
} from 'react-native';

import Header from '../components/Header';
import PrimaryButton from '../components/Bottombutton';
import styles from './style/HardwareConnect.style';


const steps = [
    {
        title: '주변 기기 탐색 중',
        subtitle:
            '같은 Wi-Fi에 연결된\nESP32 장치를 찾고 있어요.',
        button: '다음',
    },
    {
        title: '기기 발견',
        subtitle:
            '연결할 기기를 선택해주세요.',
        button: '다음',
    },
    {
        title: 'PocketPlant - ESP32',
        subtitle:
            '이 기기가 접속할 Wi-Fi 정보를 입력해주세요.',
        button: '완료',
    },
    {
        title: '연결 완료!',
        subtitle:
            '모든 센서가 정상 작동 중이에요.',
        button: '식물 돌보러 가기',
    },
];

export default function HardwareConnect({
    navigation,
    route,
}) {
    const [step, setStep] =
        useState(0);

    const [wifiName, setWifiName] =
        useState('');

    const [wifiPassword, setWifiPassword] =
        useState('');

    const stepInfo =
        steps[step];

    // ✅ 상단 state에 추가
    const [selectedDevice, setSelectedDevice] = useState(false);

    const details = useMemo(
        () => [
            {
                label: '연결기기',
                value: 'PocketPlant - ESP32',
            },
            {
                label: 'IP 주소',
                value: '123.41.66',
            },
            {
                label: '데이터 주기',
                value: '5분?마다 자동 갱신',
            },
            {
                label: '상태',
                value: '양호',
            },
        ],
        []
    );

    const handleNext = () => {

        if (step === 3) {

            if (route?.params?.plant) {

                navigation.navigate(
                    'PlantDetail',
                    {
                        plant:
                            route.params.plant,

                        hardwareConnected:
                            true,
                    }
                );

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

        const backHandler =
            BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );

        return () => backHandler.remove();
    }, [step]);

    return (
        // ✅ KeyboardAvoidingView로 감싸기
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header
                title="하드웨어 연결"
                navigation={navigation}
                type="full"
                onBackPress={() => {
                    if (step > 0) {
                        setStep(step - 1);
                    } else {
                        navigation.goBack();
                    }
                }}
            />

            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
                keyboardShouldPersistTaps="handled" // ✅ 추가
            >

                {/* 진행바 */}
                <View
                    style={styles.progressWrap}
                >

                    {[0, 1, 2, 3].map(
                        item => (
                            <View
                                key={item}
                                style={[
                                    styles.progressBar,

                                    step >= item &&
                                    styles.progressBarActive,
                                ]}
                            />
                        )
                    )}

                </View>

                {/* STEP 1 */}
                {step === 0 && (
                    <View
                        style={
                            styles.scanWrap
                        }
                    >

                        <View
                            style={
                                styles.pulseOuter
                            }
                        />

                        <View
                            style={
                                styles.pulseMiddle
                            }
                        />

                        <View
                            style={
                                styles.pulseInner
                            }
                        />

                        {/* ✅ iconCircle을 pulseInner 안쪽 위치로 올림 */}
                        <View
                            style={
                                styles.iconCircle
                            }
                        >

                            <Image
                                source={require('../assets/icon/iot.png')}
                                style={
                                    styles.iotIcon
                                }
                            />

                        </View>

                        <Text
                            style={
                                styles.title
                            }
                        >
                            {
                                stepInfo.title
                            }
                        </Text>

                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            {
                                stepInfo.subtitle
                            }
                        </Text>

                    </View>
                )}

                {/* STEP 2 */}
{step === 1 && (
    <View
        style={
            styles.deviceWrap
        }
    >

        <View
            style={
                styles.deviceIconCircle
            }
        >

            <Text
                style={
                    styles.partyIcon
                }
            >
                🎉
            </Text>

        </View>

        <Text
            style={
                styles.title
            }
        >
            {
                stepInfo.title
            }
        </Text>

        <Text
            style={
                styles.subtitle
            }
        >
            {
                stepInfo.subtitle
            }
        </Text>

        {/* ✅ TouchableOpacity + 선택 상태 */}
        <TouchableOpacity
            style={[
                styles.deviceCard,
                selectedDevice && styles.deviceCardSelected,
            ]}
            onPress={() => setSelectedDevice(true)}
            activeOpacity={0.8}
        >

            <Image
                source={require('../assets/icon/iot.png')}
                style={
                    styles.deviceIcon
                }
            />

            <View
                style={
                    styles.deviceInfo
                }
            >

                <Text
                    style={
                        styles.deviceName
                    }
                >
                    PocketPlant -
                    ESP32
                </Text>

                <Text
                    style={
                        styles.deviceIp
                    }
                >
                    123.41.66
                    포켓플랜트
                    전용 기기
                </Text>

            </View>

            {/* ✅ 선택되면 속이 채워진 라디오 */}
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
                    <View
                        style={
                            styles.wifiWrap
                        }
                    >

                        {/* ✅ STEP2처럼 서클 안에 이모지 */}
                        <View
                            style={
                                styles.deviceIconCircle
                            }
                        >
                            <Text
                                style={
                                    styles.wifiIcon
                                }
                            >
                                📶
                            </Text>
                        </View>

                        <Text
                            style={
                                styles.title
                            }
                        >
                            {
                                stepInfo.title
                            }
                        </Text>

                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            {
                                stepInfo.subtitle
                            }
                        </Text>

                        {/* ✅ maxLength={20} 추가 */}
                        <TextInput
                            value={wifiName}
                            onChangeText={
                                setWifiName
                            }
                            placeholder="Wi-Fi 이름 (2.4GHz)"
                            style={
                                styles.input
                            }
                            maxLength={20}
                        />

                        <TextInput
                            value={
                                wifiPassword
                            }
                            onChangeText={
                                setWifiPassword
                            }
                            placeholder="Wi-Fi 비밀번호"
                            secureTextEntry
                            style={
                                styles.input
                            }
                            maxLength={20}
                        />

                        <View
                            style={
                                styles.noticeBox
                            }
                        >

                            <Text
                                style={
                                    styles.noticeText
                                }
                            >
                                ESP32는 2.4GHz Wi-Fi만 지원해요.{'\n'}
                                5GHz 전용 공유기라면 2.4GHz 대역을 따로 켜주세요.
                            </Text>

                        </View>

                    </View>
                )}

                {/* STEP 4 */}
                {step === 3 && (
                    <View
                        style={
                            styles.doneWrap
                        }
                    >

                        <View
                            style={
                                styles.doneCircle
                            }
                        >

                            <Text
                                style={
                                    styles.doneIcon
                                }
                            >
                                ✓
                            </Text>

                        </View>

                        <Text
                            style={
                                styles.title
                            }
                        >
                            {
                                stepInfo.title
                            }
                        </Text>

                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            {
                                stepInfo.subtitle
                            }
                        </Text>

                        <View
                            style={
                                styles.summaryCard
                            }
                        >

                            {details.map(
                                (item, index) => (
                                    <View
                                        key={
                                            item.label
                                        }
                                        style={[
                                            styles.summaryRow,
                                            index === details.length - 1 &&
                                            styles.summaryRowLast,
                                        ]}
                                    >

                                        <Text
                                            style={
                                                styles.summaryLabel
                                            }
                                        >
                                            {
                                                item.label
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                styles.summaryValue
                                            }
                                        >
                                            {
                                                item.value
                                            }
                                        </Text>

                                    </View>
                                )
                            )}

                        </View>

                    </View>
                )}

            </ScrollView>

            <PrimaryButton
                title={
                    stepInfo.button
                }
                onPress={
                    handleNext
                }
            />

        </KeyboardAvoidingView>
    );
}