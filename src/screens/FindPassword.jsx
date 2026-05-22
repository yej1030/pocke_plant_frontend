
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style/FindPassword.style';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';


export default function FindPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  // 이메일 유효성 검사 (Signup과 동일)
  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSendMail = () => {
    if (!email.trim()) {
      showAlert({
        title: '안내',
        message: '아이디(이메일)를 입력해 주세요.',
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
    // TODO: 이메일 인증 API 연동
    showAlert({
      title: '안내',
      message: '입력하신 이메일로 인증 메일이 발송되었습니다.',
      onPress: () => navigation.navigate('ResetPassword'),
    });
  };

  return (
    <>
      <Header title="비밀번호 찾기" navigation={navigation} type="auth" />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="아이디 (이메일)"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSendMail}
        >
          <Text style={styles.submitButtonText}>인증 메일 받기</Text>
        </TouchableOpacity>
        <View style={styles.footerLink}>
          <TouchableOpacity onPress={() => navigation.navigate('Login_2')}>
            <Text style={styles.linkText}>로그인</Text>
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
        actions={alertConfig.actions}
        variant={alertConfig.variant}
        onRequestClose={closeAlert}
      />
    </>
  );
}