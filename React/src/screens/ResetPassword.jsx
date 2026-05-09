import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './style/ResetPassword.style';

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
          {/* 비밀번호 입력창 */}
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* 새 비밀번호 입력창 */}
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            placeholderTextColor="#aaa"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          {/* 로그인하기 버튼 (이미지 텍스트 기준) */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => {
              console.log('비밀번호 변경 시도');
              navigation.navigate('Login_2'); // 변경 후 로그인 화면으로 이동
            }}
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