import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/Login_1.style';

export default function Login_1({ navigation }) {
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  const handleKakaoLogin = () => {
    showAlert({
      title: '카카오 로그인',
      message: '카카오 소셜 로그인은 준비 중입니다.',
      variant: 'warning',
    });
  };

  // 화면
  return (
    <View style={styles.container}>

      {/* 앱 이름 */}
      <Text style={styles.title}>Pocket Plants</Text>

      {/* 로고 이미지 */}
      <Image
        source={require('../assets/logo_2.png')}
        style={styles.image}
      />

      {/* 버튼 그룹 */}
      <View style={styles.buttonGroup}>

        {/* 카카오 로그인 버튼 */}
        <TouchableOpacity
          style={styles.kakaoButton}
          onPress={handleKakaoLogin}
          activeOpacity={0.85}
        >
          <Image
            source={require('../assets/Kakao.png')}
            style={styles.kakaoIcon}
          />
          <Text style={styles.kakaoText}>카카오로 시작하기</Text>
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