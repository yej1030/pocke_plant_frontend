import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style/FindPassword.style';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

export default function FindPassword({
  navigation,
}) {

  // 이메일 입력값
  const [email, setEmail] =
    useState('');

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

  // 인증 메일 전송
  const handleSendMail = () => {

    // 이메일 입력 확인
    if (!email.trim()) {
      showAlert({
        title: '안내',
        message:
          '아이디(이메일)를 입력해 주세요.',
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

    // TODO: 이메일 인증 API 연결 예정
    showAlert({
      title: '안내',
      message: '입력하신 이메일로 인증 메일이 발송되었습니다.',
      onPress: () =>
        navigation.navigate(
          'ResetPassword'
        ),
    });
  };

  return (
    <>
      <Header
        title="비밀번호 찾기"
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

        {/* 인증 메일 버튼 */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSendMail}
        >

          <Text style={styles.submitButtonText}>
            인증 메일 받기
          </Text>

        </TouchableOpacity>

        {/* 로그인 이동 */}
        <View style={styles.footerLink}>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'Login_2'
              )
            }
          >

            <Text style={styles.linkText}>
              로그인
            </Text>

          </TouchableOpacity>

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

        actions={alertConfig.actions}

        variant={alertConfig.variant}

        onRequestClose={closeAlert}
      />
    </>
  );
}