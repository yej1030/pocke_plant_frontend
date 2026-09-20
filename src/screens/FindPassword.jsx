import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style/FindPassword.style';
// 이메일/인증번호 입력줄 스타일은 회원가입 화면 스타일을 그대로 재사용
import signupStyles from './style/Signup.style';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import { sendEmailCode, verifyEmailCode } from '../api/api';

export default function FindPassword({
  navigation,
}) {

  // 입력값
  const [email, setEmail] =
    useState('');

  const [code, setCode] =
    useState('');

  // 이메일 인증 안내 문구
  const [certMessage, setCertMessage] =
    useState('');

  // 인증번호 확인 완료 여부
  const [isEmailVerified, setIsEmailVerified] =
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

  // 인증번호 확인 응답이 성공인지 판단 (회원가입 화면과 동일)
  const isVerificationSuccess = responseData => {
    if (responseData == null) {
      return false;
    }

    if (typeof responseData === 'boolean') {
      return responseData;
    }

    if (typeof responseData === 'string') {
      const normalized = responseData
        .trim()
        .toLowerCase();

      return normalized === 'true' ||
        normalized.includes('success') ||
        normalized.includes('성공') ||
        normalized.includes('인증 완료');
    }

    if (typeof responseData === 'object') {
      if ('success' in responseData) {
        return responseData.success === true;
      }

      if ('verified' in responseData) {
        return responseData.verified === true;
      }

      if ('valid' in responseData) {
        return responseData.valid === true;
      }

      if ('isVerified' in responseData) {
        return responseData.isVerified === true;
      }

      if ('result' in responseData) {
        return String(responseData.result)
          .toUpperCase() === 'SUCCESS';
      }

      if ('status' in responseData) {
        const status = String(responseData.status)
          .toUpperCase();

        return status === 'SUCCESS' ||
          status === 'OK';
      }
    }

    return false;
  };

  // 인증번호 메일 받기
  const handleCert = async () => {
    if (!email.trim()) {
      setCertMessage('');
      setIsEmailVerified(false);
      showAlert({
        title: '안내',
        message:
          '아이디(이메일)를 입력해 주세요.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      setCertMessage('');
      setIsEmailVerified(false);
      showAlert({
        title: '안내',
        message:
          '이메일 형식으로 써주세요.',
      });
      return;
    }

    try {
      const response =
        await sendEmailCode(
          email.trim()
        );

      console.log(
        '이메일 인증 응답:',
        response
      );

      // 서버가 문자열 메시지를 주면 그대로, 아니면 기본 안내 문구 표시
      setCertMessage(
        typeof response === 'string' && response
          ? response
          : '입력하신 이메일로 인증번호를 보냈어요.'
      );
      setIsEmailVerified(false);
    } catch (error) {
      console.log(
        '이메일 인증 실패:',
        error.response?.data
      );

      setCertMessage('');
      showAlert({
        title: '안내',
        message:
          typeof error.response?.data === 'string' &&
          error.response.data
            ? error.response.data
            : '이메일 인증 요청 실패',
        variant: 'error',
      });
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!email.trim()) {
      showAlert({
        title: '안내',
        message: '이메일을 먼저 작성해 주세요.',
      });
      return;
    }

    if (!code.trim()) {
      showAlert({
        title: '안내',
        message: '인증번호를 입력해 주세요.',
      });
      return;
    }

    try {
      const response =
        await verifyEmailCode(
          email.trim(),
          code.trim()
        );

      console.log(
        '인증번호 확인 응답:',
        response
      );

      if (!isVerificationSuccess(response)) {
        throw new Error('인증번호가 올바르지 않습니다.');
      }

      showAlert({
        title: '안내',
        message: '이메일 인증이 완료되었습니다.',
        variant: 'success',
      });

      setIsEmailVerified(true);
    } catch (error) {
      console.log(
        '인증번호 확인 실패:',
        error.response?.data
      );

      showAlert({
        title: '안내',
        message:
          typeof error.response?.data === 'string' &&
          error.response.data
            ? error.response.data
            : '인증번호 확인에 실패했습니다.',
        variant: 'error',
      });

      setIsEmailVerified(false);
    }
  };

  // 다음 단계 (비밀번호 변경 화면으로 이동)
  const handleNext = () => {
    if (!isEmailVerified) {
      showAlert({
        title: '안내',
        message: '이메일 인증을 완료해 주세요.',
        variant: 'warning',
      });
      return;
    }

    // 인증된 이메일과 인증번호를 넘겨서 변경 요청 때 서버가 다시 확인할 수 있게 함
    navigation.navigate('ResetPassword', {
      email: email.trim(),
      code: code.trim(),
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

        {/* 이메일 입력 + 인증번호 받기 */}
        <View style={signupStyles.inputRow}>
          <TextInput
            style={signupStyles.inputFlex}
            placeholder="아이디 (이메일)"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setIsEmailVerified(false);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={signupStyles.certButton}
            onPress={handleCert}
          >
            <Text style={signupStyles.certText}>
              인증하기
            </Text>
          </TouchableOpacity>
        </View>

        {!!certMessage && (
          <Text style={signupStyles.certMessage}>
            {certMessage}
          </Text>
        )}

        {/* 인증번호 입력 + 확인 */}
        <View style={signupStyles.inputRow}>
          <TextInput
            style={signupStyles.inputFlex}
            placeholder="인증번호"
            placeholderTextColor="#aaa"
            value={code}
            onChangeText={text => {
              setCode(text);
              setIsEmailVerified(false);
            }}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            style={signupStyles.certButton}
            onPress={handleVerifyCode}
          >
            <Text style={signupStyles.certText}>
              인증하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 다음 버튼 (인증 완료 후 비밀번호 변경 화면으로 이동) */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleNext}
        >

          <Text style={styles.submitButtonText}>
            다음
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