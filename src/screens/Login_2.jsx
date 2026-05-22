import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

import styles from './style/Login_2.style';

export default function Login_2({ navigation }) {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  // 이메일 유효성 검사
  const isValidEmail = value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(value.trim());

  // 로그인
  const handleLogin = async () => {

    // 이메일 입력 확인
    if (!email.trim()) {
      showAlert({
        title: '안내',
        message: '이메일을 작성해 주세요.',
      });
      return;
    }

    // 이메일 형식 확인
    if (!isValidEmail(email)) {
      showAlert({
        title: '안내',
        message: '이메일 형식으로 써주세요.',
      });
      return;
    }

    // 비밀번호 입력 확인
    if (!password.trim()) {
      showAlert({
        title: '안내',
        message: '비밀번호를 작성해 주세요.',
      });
      return;
    }

    // 서버 없이 바로 이동
    showAlert({
      title: '안내',
      message: '로그인에 성공했습니다!',
      buttonText: '확인',
      onPress: () => navigation.replace('Main'),
      variant: 'success',
    });
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
              setShowPassword(prev => !prev)
            }
          >

            <Text style={styles.eyeText}>
              {showPassword ? '🙈' : '👁'}
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
              navigation.navigate('Signup')
            }
          >

            <Text style={styles.linkText}>
              회원가입
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FindPassword')
            }
          >

            <Text style={styles.linkText}>
              비밀번호 찾기
            </Text>

          </TouchableOpacity>

        </View>

      </View>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttonText={alertConfig.buttonText}
        onPress={alertConfig.onPress}
        secondaryButtonText={alertConfig.secondaryButtonText}
        onSecondaryPress={alertConfig.onSecondaryPress}
        variant={alertConfig.variant}
        onRequestClose={closeAlert}
      />
    </>
  );
}