import React, { useState, useMemo, useEffect, } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    BackHandler,
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
                value: '10분마다 자동 갱신',
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
                return true; // 기본 뒤로가기 막기
            }

            return false; // step 0이면 원래 뒤로가기 실행
        };

        const backHandler =
            BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );

        return () => backHandler.remove();
    }, [step]);

    return (
        <View style={styles.container}>

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

                        <TouchableOpacity
                            style={
                                styles.deviceCard
                            }
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

                            <View
                                style={
                                    styles.radio
                                }
                            />

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

                        <View
                            style={
                                styles.iconCircle
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

                        <TextInput
                            value={wifiName}
                            onChangeText={
                                setWifiName
                            }
                            placeholder="Wi-Fi 이름 (2.4GHz)"
                            style={
                                styles.input
                            }
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
                                ESP32는
                                2.4GHz만
                                지원해요.
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
                                item => (
                                    <View
                                        key={
                                            item.label
                                        }
                                        style={
                                            styles.summaryRow
                                        }
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

        </View>
    );
}