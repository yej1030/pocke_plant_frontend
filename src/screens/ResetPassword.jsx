import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './style/ResetPassword.style';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import { resetPasswordApi } from '../api/api';

export default function ResetPassword({
  navigation,
  route,
}) {

  // 비밀번호 찾기 화면에서 인증 완료 후 넘겨받은 값
  const { email, code } =
    route?.params ?? {};

  // 입력값
  const [password, setPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [
    newPasswordCheck,
    setNewPasswordCheck,
  ] = useState('');

  // 비밀번호 보기
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showNewPasswordCheck,
    setShowNewPasswordCheck,
  ] = useState(false);

  // 변경 요청 중 여부 (중복 클릭 방지)
  const [submitting, setSubmitting] =
    useState(false);

  // 커스텀 알림
  const {
    alertConfig,
    showAlert,
    closeAlert,
  } = useCustomAlert();

  // 이메일 인증 없이 직접 들어온 경우 이전 화면으로 돌려보냄
  useEffect(() => {
    if (!email || !code) {
      showAlert({
        title: '안내',
        message:
          '이메일 인증을 먼저 완료해 주세요.',
        variant: 'warning',
        onPress: () => navigation.goBack(),
      });
    }
  }, []);

  // 비밀번호 형식 검사
  const isValidPassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/
      .test(value);

  // 비밀번호 변경
  const handleSubmit = async () => {
    if (!email || !code) {
      showAlert({
        title: '안내',
        message:
          '이메일 인증을 먼저 완료해 주세요.',
        variant: 'warning',
        onPress: () => navigation.goBack(),
      });
      return;
    }

    if (!newPassword.trim()) {
      showAlert({
        title: '안내',
        message:
          '새 비밀번호를 입력해주세요.',
      });
      return;
    }

    if (!isValidPassword(newPassword)) {
      showAlert({
        title: '안내',
        message:
          '비밀번호 형식을 확인해주세요.',
        variant: 'warning',
      });
      return;
    }

    if (!newPasswordCheck.trim()) {
      showAlert({
        title: '안내',
        message:
          '새 비밀번호 확인을 입력해주세요.',
      });
      return;
    }

    if (newPassword !== newPasswordCheck) {
      showAlert({
        title: '안내',
        message:
          '비밀번호가 일치하지 않습니다.',
        variant: 'warning',
      });
      return;
    }

    setSubmitting(true);

    try {
      // 이메일 + 인증번호 + 새 비밀번호를 서버로 전송
      await resetPasswordApi({
        email,
        code,
        newPassword,
      });

      showAlert({
        title: '안내',
        message:
          '비밀번호가 변경되었습니다!',
        onPress: () => {
          navigation.navigate('Login_2');
        },
      });
    } catch (error) {
      console.log(
        '비밀번호 변경 실패:',
        error.response?.data
      );

      showAlert({
        title: '안내',
        message:
          typeof error.response?.data === 'string' &&
          error.response.data
            ? error.response.data
            : '비밀번호 변경에 실패했습니다.',
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header
        title="비밀번호 변경하기"
        navigation={navigation}
        type="auth"
      />

      <ScrollView style={styles.container}>

        <Text style={styles.sectionTitle}>
          새로운 비밀번호를 입력해주세요
        </Text>

        {/* 새 비밀번호 */}
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="새 비밀번호"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowNewPassword(
                prev => !prev
              )
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
          8~15자리 숫자, 영문,
          특수기호 사용
        </Text>

        {newPassword !== '' &&
          !isValidPassword(newPassword) && (
            <Text style={styles.error}>
              비밀번호 형식이
              올바르지 않습니다.
            </Text>
          )}

        {/* 새 비밀번호 확인 */}
        <View style={styles.passwordRow}>

          <TextInput
            style={styles.passwordInput}
            placeholder="새 비밀번호 확인"
            placeholderTextColor="#aaa"
            value={newPasswordCheck}
            onChangeText={
              setNewPasswordCheck
            }
            secureTextEntry={
              !showNewPasswordCheck
            }
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowNewPasswordCheck(
                prev => !prev
              )
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

        {newPasswordCheck !== '' &&
          newPassword !==
          newPasswordCheck && (

            <Text style={styles.error}>
              비밀번호가
              일치하지 않습니다.
            </Text>
          )}

        {/* 변경 버튼 */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={submitting}
        >

          <Text style={styles.submitButtonText}>
            비밀번호 변경
          </Text>

        </TouchableOpacity>

        {/* 로그인 이동 */}
        <View style={styles.footerLink}>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login_2')
            }
          >

            <Text style={styles.linkText}>
              로그인
            </Text>

          </TouchableOpacity>

        </View>

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
        actions={alertConfig.actions}
        variant={alertConfig.variant}
        onRequestClose={closeAlert}
      />
    </>
  );
}