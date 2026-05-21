import React, { useState } from 'react';

import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './style/ResetPassword.style';

import Header from '../components/Header';

export default function ResetPassword({ navigation }) {

  const [password, setPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [newPasswordCheck, setNewPasswordCheck] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showNewPasswordCheck, setShowNewPasswordCheck] =
    useState(false);

  // 비밀번호 유효성 검사
  const isValidPassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/.test(value);

  // 비밀번호 변경
  const handleSubmit = () => {

    if (!newPassword.trim()) {
      Alert.alert(
        '안내',
        '새 비밀번호를 입력해주세요.'
      );
      return;
    }

    if (!isValidPassword(newPassword)) {
      Alert.alert(
        '안내',
        '비밀번호 형식을 확인해주세요.'
      );
      return;
    }

    if (!newPasswordCheck.trim()) {
      Alert.alert(
        '안내',
        '새 비밀번호 확인을 입력해주세요.'
      );
      return;
    }

    if (newPassword !== newPasswordCheck) {
      Alert.alert(
        '안내',
        '비밀번호가 일치하지 않습니다.'
      );
      return;
    }

    Alert.alert(
      '안내',
      '비밀번호가 변경되었습니다!',
      [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('Login_2');
          },
        },
      ]
    );
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
              setShowNewPassword(prev => !prev)
            }
          >

            <Text style={styles.eyeText}>
              {showNewPassword ? '🙈' : '👁'}
            </Text>

          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>
          8~15자리 숫자, 영문, 특수기호 사용
        </Text>

        {newPassword !== '' &&
          !isValidPassword(newPassword) && (

            <Text style={styles.error}>
              비밀번호 형식이 올바르지 않습니다.
            </Text>
          )}

        {/* 새 비밀번호 확인 */}
        <View style={styles.passwordRow}>

          <TextInput
            style={styles.passwordInput}
            placeholder="새 비밀번호 확인"
            value={newPasswordCheck}
            onChangeText={setNewPasswordCheck}
            secureTextEntry={!showNewPasswordCheck}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowNewPasswordCheck(prev => !prev)
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
          newPassword !== newPasswordCheck && (

            <Text style={styles.error}>
              비밀번호가 일치하지 않습니다.
            </Text>
          )}

        {/* 버튼 */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >

          <Text style={styles.submitButtonText}>
            비밀번호 변경
          </Text>

        </TouchableOpacity>

        {/* 로그인 */}
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
    </>
  );
}