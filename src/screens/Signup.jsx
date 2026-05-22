import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import { checkEmailAvailability, signUpUser } from '../api/api';
import styles from './style/Signup.style';

export default function SignUp({ navigation }) {
  // 입력값 상태
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [name, setName] = useState('');
  const [certMessage, setCertMessage] = useState('');
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  // 유효성 검사
  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isValidPassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/.test(value);

  // 이메일 인증
  const handleCert = async () => {
    if (!email.trim()) {
      setCertMessage('');
      showAlert({
        title: '안내',
        message: '이메일을 작성해 주세요.',
      });
      return;
    }
    if (!isValidEmail(email)) {
      setCertMessage('');
      showAlert({
        title: '안내',
        message: '이메일 형식으로 써주세요.',
      });
      return;
    }
    try {
      await checkEmailAvailability(email.trim());
      setCertMessage('사용 가능한 이메일입니다.');
    } catch (error) {
      setCertMessage('');
      showAlert({
        title: '안내',
        message: error.message || '이메일 확인에 실패했습니다.',
        variant: 'error',
      });
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
      await signUpUser({
        email: email.trim(),
        password,
        name: name.trim(),
      });
      showAlert({
        title: '회원가입 완료',
        message: '회원가입이 완료되었어요 🌱',
        buttonText: '확인',
        onPress: () => navigation.replace('Login_1'),
        variant: 'success',
      });
    } catch (error) {
      showAlert({
        title: '안내',
        message: error.message || '회원가입에 실패했습니다.',
        variant: 'error',
      });
    }
  };

  // 화면
  return (
    <>
      <Header title="회원가입" navigation={navigation} type="auth" />
      <ScrollView style={styles.container}>

        <Text style={styles.sectionTitle}>회원정보를 입력해주세요</Text>

        {/* 이메일 입력 + 인증 버튼 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputFlex}
            placeholder="아이디 (이메일)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.certButton} onPress={handleCert}>
            <Text style={styles.certText}>인증하기</Text>
          </TouchableOpacity>
        </View>
        {!!certMessage && <Text style={styles.certMessage}>{certMessage}</Text>}

        {/* 인증번호 */}
        <TextInput
          style={styles.input}
          placeholder="인증번호"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        {/* 비밀번호 입력 */}
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
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>8~15자리 숫자, 영문, 특수기호 사용</Text>
        {password !== '' && !isValidPassword(password) && (
          <Text style={styles.error}>비밀번호 형식이 올바르지 않습니다.</Text>
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
            onPress={() => setShowPasswordCheck(prev => !prev)}
          >
            <Text style={styles.eyeText}>{showPasswordCheck ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
        {passwordCheck !== '' && password !== passwordCheck && (
          <Text style={styles.error}>비밀번호가 일치하지 않습니다.</Text>
        )}

        {/* 이름 입력 */}
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />

        {/* 회원가입 버튼 */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>회원가입하기</Text>
        </TouchableOpacity>

      </ScrollView>

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