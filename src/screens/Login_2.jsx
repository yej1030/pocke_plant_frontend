import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  login,
} from '@react-native-seoul/kakao-login';

import Header from '../components/Header';

import CustomAlert
  from '../components/CustomAlert';

import useCustomAlert
  from '../components/useCustomAlert';

import styles
  from './style/Login_2.style';

import {
  kakaoLoginApi,
  loginUser,
} from '../api/api';

export default function Login_2({
  navigation,
}) {

  // 입력값
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  // 비밀번호 보기
  const [showPassword, setShowPassword] =
    useState(false);

  // 커스텀 알림
  const {
    alertConfig,
    showAlert,
    closeAlert,
  } = useCustomAlert();

  // 이메일 형식 검사
  const isValidEmail = value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(value.trim());

  // 일반 로그인
  const handleLogin = async () => {

    // 이메일 입력 확인
    if (!email.trim()) {

      showAlert({
        title: '안내',
        message:
          '이메일을 작성해 주세요.',
      });

      return;
    }

    // 이메일 형식 확인
    if (!isValidEmail(email)) {

      showAlert({
        title: '안내',
        message:
          '이메일 형식으로 써주세요.',
      });

      return;
    }

    // 비밀번호 입력 확인
    if (!password.trim()) {

      showAlert({
        title: '안내',
        message:
          '비밀번호를 작성해 주세요.',
      });

      return;
    }

    try {

      const response =
        await loginUser({
          email: email.trim(),
          password,
        });

      console.log(
        '로그인 응답:',
        response
      );

      showAlert({
        title: '성공',

        message:
          '로그인에 성공했습니다!',

        buttonText: '확인',

        onPress: () =>
          navigation.replace('Main'),

        variant: 'success',
      });

    } catch (error) {

      console.log(
        '로그인 실패:',
        error.response?.data
      );

      showAlert({
        title: '실패',

        message:
          '로그인에 실패했습니다.',

        variant: 'error',
      });
    }
  };

  // 카카오 로그인
  const handleKakaoLogin =
    async () => {

      try {

        // 카카오 로그인 실행
        const token =
          await login();

        console.log(
          '카카오 토큰:',
          token
        );

        // 서버로 accessToken 전송
        const response =
          await kakaoLoginApi(
            token.accessToken
          );

        console.log(
          '서버 응답:',
          response
        );

        showAlert({
          title: '성공',

          message:
            '카카오 로그인에 성공했습니다!',

          buttonText: '확인',

          onPress: () =>
            navigation.replace(
              'Main'
            ),

          variant: 'success',
        });

      } catch (error) {

        console.log(
          '카카오 로그인 실패:',
          error
        );

        showAlert({
          title: '실패',
          message:
            '카카오 로그인에 실패했습니다.',
          variant: 'error',
        });
      }
    };

  return (
    <>
      <Header
        title="로그인"
        navigation={navigation}
        type="auth"
      />

      <View style={styles.container}>

        {/* 이메일 입력 */}
        <TextInput
          style={styles.input}
          placeholder="아이디 (이메일)"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* 비밀번호 입력 */}
        <View style={styles.passwordRow}>

          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowPassword(
                prev => !prev
              )
            }
          >

            <Text style={styles.eyeText}>
              {showPassword
                ? '🙈'
                : '👁'}
            </Text>

          </TouchableOpacity>

        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity
          style={styles.loginSubmitButton}
          onPress={handleLogin}
        >

          <Text style={styles.loginSubmitText}>
            로그인하기
          </Text>

        </TouchableOpacity>

        {/* 하단 링크 */}
        <View style={styles.footerLinks}>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'Signup'
              )
            }
          >

            <Text style={styles.linkText}>
              회원가입
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'FindPassword'
              )
            }
          >

            <Text style={styles.linkText}>
              비밀번호 찾기
            </Text>

          </TouchableOpacity>

        </View>

        {/* SNS 로그인 */}
        <View style={styles.snsContainer}>

          <View style={styles.snsHeader}>

            <View style={styles.snsLine} />

            <Text style={styles.snsTitle}>
              SNS LOGIN
            </Text>

            <View style={styles.snsLine} />

          </View>

          <View style={styles.snsIconsRow}>

            <TouchableOpacity
              style={styles.snsIconButton}
              onPress={handleKakaoLogin}
              activeOpacity={0.85}
            >

              <Image
                source={require('../assets/Kakao.png')}
                style={styles.snsIconImage}
              />

            </TouchableOpacity>

          </View>

        </View>

      </View>

      {/* 커스텀 알림 */}
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttonText={alertConfig.buttonText}
        onPress={alertConfig.onPress}

        secondaryButtonText={
          alertConfig.secondaryButtonText
        }

        onSecondaryPress={
          alertConfig.onSecondaryPress
        }

        variant={alertConfig.variant}

        onRequestClose={closeAlert}
      />
    </>
  );
}