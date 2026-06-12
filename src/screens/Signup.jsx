import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import {
  signUpUser,
  sendEmailCode,
  verifyEmailCode,
} from '../api/api';

import styles from './style/Signup.style';

export default function SignUp({ navigation }) {

  // 입력값
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [isEmailVerified, setIsEmailVerified] =
    useState(false);

  // 비밀번호 보기
  const [showPassword, setShowPassword] =
    useState(false);

  const [showPasswordCheck,
    setShowPasswordCheck] =
    useState(false);

  // 이메일 인증 안내 문구
  const [certMessage, setCertMessage] =
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

  // 비밀번호 형식 검사
  const isValidPassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/
      .test(value);

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

  // 이메일 인증
  const handleCert = async () => {

    if (!email.trim()) {

      setCertMessage('');
      setIsEmailVerified(false);

      showAlert({
        title: '안내',
        message: '이메일을 작성해 주세요.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      setCertMessage('');
      setIsEmailVerified(false);
      showAlert({
        title: '안내',
        message: '이메일 형식으로 써주세요.',
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

      setCertMessage(response);
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
          '이메일 인증 요청 실패',
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
          error.response?.data ||
          '인증번호 확인에 실패했습니다.',
        variant: 'error',
      });

      setIsEmailVerified(false);
    }
  };

  // 회원가입
  const handleSubmit = async () => {
    if (!email.trim()) {
      showAlert({
        title: '안내',
        message: '이메일을 작성해 주세요.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      showAlert({
        title: '안내',
        message: '이메일 형식으로 써주세요.',
      });
      return;
    }

    if (!isEmailVerified) {
      showAlert({
        title: '안내',
        message: '이메일 인증을 완료해 주세요.',
        variant: 'warning',
      });
      return;
    }

    if (!password.trim()) {
      showAlert({
        title: '안내',
        message: '비밀번호를 작성해 주세요.',
      });
      return;
    }

    if (!isValidPassword(password)) {
      showAlert({
        title: '안내',
        message: '비밀번호 형식을 확인해 주세요.',
        variant: 'warning',
      });
      return;
    }

    if (!passwordCheck.trim()) {

      showAlert({
        title: '안내',
        message: '비밀번호 확인을 작성해 주세요.',
      });
      return;
    }

    if (!name.trim()) {
      showAlert({
        title: '안내',
        message: '이름을 작성해 주세요.',
      });
      return;
    }

    if (password !== passwordCheck) {
      showAlert({
        title: '안내',
        message: '비밀번호가 일치하지 않습니다.',
        variant: 'warning',
      });
      return;
    }

    try {

      // 회원가입 요청
      const response =
        await signUpUser({
          email: email.trim(),
          password,
          nickname: name.trim(),
        });

      console.log(
        '회원가입 응답:',
        response
      );

      showAlert({
        title: '회원가입 완료',
        message: '회원가입이 완료되었어요 🌱',
        buttonText: '확인',
        onPress: () =>
          navigation.replace('Login_1'),
        variant: 'success',
      });

    } catch (error) {
      console.log(
        '회원가입 실패:',
        error.response?.data
      );

      showAlert({
        title: '안내',
        message:
          error.response?.data ||
          '회원가입에 실패했습니다.',
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Header
        title="회원가입"
        navigation={navigation}
        type="auth"
      />
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>
          회원정보를 입력해주세요
        </Text>

        {/* 이메일 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputFlex}
            placeholder="아이디 (이메일)"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setIsEmailVerified(false);
            }}
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={styles.certButton}
            onPress={handleCert}
          >
            <Text style={styles.certText}>
              인증하기
            </Text>
          </TouchableOpacity>
        </View>

        {!!certMessage && (
          <Text style={styles.certMessage}>
            {certMessage}
          </Text>
        )}

        {/* 인증번호 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputFlex}
            placeholder="인증번호"
            value={code}
            onChangeText={text => {
              setCode(text);
              setIsEmailVerified(false);
            }}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.certButton}
            onPress={handleVerifyCode}
          >
            <Text style={styles.certText}>
              인증하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 비밀번호 */}
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호"
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
          <Image
            source={
              showPassword
                ? require('../assets/icon/open.png')
                : require('../assets/icon/close.png')
            }
            style={styles.eyeIcon}
            resizeMode="contain"
          />
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          8~15자리 숫자, 영문, 특수기호 사용
        </Text>

        {password !== '' &&
          !isValidPassword(password) && (

            <Text style={styles.error}>
              비밀번호 형식이 올바르지 않습니다.
            </Text>
          )}

        {/* 비밀번호 확인 */}
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChangeText={setPasswordCheck}
            secureTextEntry={!showPasswordCheck}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowPasswordCheck(prev => !prev)
            }
          >
          <Image
            source={
              showPasswordCheck
                ? require('../assets/icon/open.png')
                : require('../assets/icon/close.png')
            }
            style={styles.eyeIcon}
            resizeMode="contain"
          />
          </TouchableOpacity>
        </View>

        {passwordCheck !== '' &&
          password !== passwordCheck && (
            <Text style={styles.error}>
              비밀번호가 일치하지 않습니다.
            </Text>
          )}

        {/* 이름 */}
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            회원가입하기
          </Text>
        </TouchableOpacity>

      </ScrollView>

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