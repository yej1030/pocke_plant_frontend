import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import styles from './style/ResetPassword.style';

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 비밀번호 유효성 검사 (8~15자리 숫자, 영문, 특수기호 포함)
  const isValidPassword = value =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/.test(value);

  const handleResetPassword = () => {
    // 1. 기존 비밀번호 입력 확인
    if (!password.trim()) {
      Alert.alert('안내', '비밀번호를 작성해 주세요.');
      return;
    }

    // 2. 새 비밀번호 입력 확인
    if (!newPassword.trim()) {
      Alert.alert('안내', '새 비밀번호를 작성해 주세요.');
      return;
    }

    // 3. 새 비밀번호 형식 확인
    if (!isValidPassword(newPassword)) {
      Alert.alert('안내', '비밀번호 형식을 확인해 주세요.\n(8~15자리 숫자, 영문, 특수기호 포함)');
      return;
    }


    // 성공 처리: 스택을 교체하여 뒤로가기 방지
    Alert.alert('성공', '비밀번호가 변경되었습니다. 다시 로그인해 주세요.', [
      {
        text: '확인',
        onPress: () => navigation.replace('Login_2'), 
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>〈</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>비밀번호 변경</Text>
          <View style={styles.emptySpace} />
        </View>

        <View style={styles.content}>
          {/* 현재 비밀번호 입력 */}
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* 새 비밀번호 입력 */}
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            placeholderTextColor="#aaa"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          {/* 로그인하기 버튼 (변경 실행) */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.submitButtonText}>로그인하기</Text>
          </TouchableOpacity>

          {/* 하단 회원가입 링크 */}
          <View style={styles.footerLink}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}