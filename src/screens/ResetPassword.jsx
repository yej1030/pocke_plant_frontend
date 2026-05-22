import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style/ResetPassword.style';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

export default function ResetPassword({
  navigation,
}) {

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

  // 커스텀 알림
  const {
    alertConfig,
    showAlert,
    closeAlert,
  } = useCustomAlert();

  // 비밀번호 형식 검사
  const isValidPassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/
      .test(value);

  // 비밀번호 변경
  const handleSubmit = () => {
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

    showAlert({
      title: '안내',
      message:
        '비밀번호가 변경되었습니다!',
      onPress: () => {
        navigation.navigate('Login_2');
      },
    });
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
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowNewPassword(
                prev => !prev
              )
            }
          >
            <Text style={styles.eyeText}>
              {showNewPassword
                ? '🙈'
                : '👁'}
            </Text>
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

            <Text style={styles.eyeText}>
              {showNewPasswordCheck
                ? '🙈'
                : '👁'}
            </Text>

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