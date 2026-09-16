import React, { useContext, useRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/Login_1.style';
import { kakaoLoginApi } from '../api/api';
import { saveAuthSession } from '../auth/authStorage';
import { PlantsContext } from '../context/PlantsContext';
import { usePlantDiary } from '../context/PlantDiaryContext';

export default function Login_1({ navigation }) {
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();
  const { clearPlants } = useContext(PlantsContext);
  const { clearDiaryEntries } = usePlantDiary();
  const loginInFlightRef = useRef(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const floatAnim =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(
          floatAnim,
          {
            toValue: -6,
            duration: 2000,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          floatAnim,
          {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }
        ),
      ])
    );

    loop.start();

    return () => loop.stop();
  }, [floatAnim]);

  const handleKakaoLogin = async () => {
    if (loginInFlightRef.current) return;
    loginInFlightRef.current = true;
    setIsLoggingIn(true);

    try {
      const token = await login();

      const response = await kakaoLoginApi(token.accessToken);

      await saveAuthSession(response);
      clearPlants();
      clearDiaryEntries();

      navigation.replace('Main');
    } catch (error) {
      console.log('카카오 로그인 실패:', error);

      showAlert({
        title: '실패',
        message:
          error?.response?.data?.message ||
          error?.message ||
          '카카오 로그인에 실패했습니다.',
        variant: 'error',
      });
    } finally {
      loginInFlightRef.current = false;
      setIsLoggingIn(false);
    }
  };

  // 화면
  return (
    <View style={styles.container}>

      {/* 앱 이름 */}
      <Text style={styles.title}>Pocket Plants</Text>

      {/* 로고 이미지 */}
      <Animated.Image
        source={require('../assets/logo/logo_2.png')}
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: floatAnim,
              },
            ],
          },
        ]}
      />

      {/* 버튼 그룹 */}
      <View style={styles.buttonGroup}>

        {/* 카카오 로그인 버튼 */}
        <TouchableOpacity
          style={styles.kakaoButton}
          onPress={handleKakaoLogin}
          activeOpacity={0.85}
          disabled={isLoggingIn}
        >
          <Image
            source={require('../assets/logo/Kakao.png')}
            style={styles.kakaoIcon}
          />
          <Text style={styles.kakaoText}>
            {isLoggingIn ? '로그인 중...' : '카카오로 시작하기'}
          </Text>
        </TouchableOpacity>

        {/* 신규 회원가입 버튼 */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>신규 회원가입</Text>
        </TouchableOpacity>

        {/* 기존 유저 로그인 버튼 */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login_2')}
        >
          <Text style={styles.loginText}>기존 유저 로그인</Text>
        </TouchableOpacity>

      </View>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttonText={alertConfig.buttonText}
        onPress={alertConfig.onPress}
        secondaryButtonText={alertConfig.secondaryButtonText}
        onSecondaryPress={alertConfig.onSecondaryPress}
        actions={alertConfig.actions}
        variant={alertConfig.variant}
        onRequestClose={closeAlert}
      />
    </View>
  );
}
