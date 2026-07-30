import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

import styles from './style/Settings.style';
import { getMyInfo } from '../api/api';

const SWITCH_TRACK_COLOR = { false: '#E0E0E0', true: '#B8E6B0' };
const SWITCH_THUMB_COLOR_ON = '#7fc77c';
const SWITCH_THUMB_COLOR_OFF = '#f4f3f4';

export default function Settings({ navigation }) {
  const [waterAlert, setWaterAlert] = useState(true);
  const [pumpEnabled, setPumpEnabled] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  const loadUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('serviceToken');

      if (!token) {
        return;
      }

      const response = await getMyInfo(token);

      console.log('내 정보:', JSON.stringify(response, null, 2));

      setUserInfo(response);
    } catch (error) {
      console.log('내 정보 조회 실패:', error.response?.data);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const onLogout = () => {
    showAlert({
      title: '로그아웃',
      message: '로그아웃 하시겠습니까?',
      variant: 'warning',
      actions: [
        { text: '취소', kind: 'cancel' },
        {
          text: '로그아웃',
          kind: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('serviceToken');

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login_1' }],
            });
          },
        },
      ],
    });
  };

  const onDeleteAccount = () => {
    showAlert({
      title: '회원탈퇴',
      message: '정말 탈퇴하시겠습니까?',
      variant: 'error',
      actions: [
        { text: '취소', kind: 'cancel' },
        {
          text: '탈퇴',
          kind: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login_1' }],
            });
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Header title="설정" navigation={navigation} type="auth" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* 프로필 */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {(userInfo?.nickname || '식').charAt(0)}
            </Text>
          </View>

          <View style={styles.profileTextWrap}>
            <Text style={styles.name}>
              {userInfo?.nickname || '반가워요!'}
            </Text>
            <Text style={styles.email}>
              {userInfo?.email || '카카오 로그인 사용자'}
            </Text>
          </View>
        </View>

        {/* 계정 */}
        <Text style={styles.groupTitle}>계정</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('MyPosts')}
          >
            <Text style={styles.menuText}>내가 쓴 글</Text>

            <Image
              source={require('../assets/icon/chevron.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('FindPassword')}
          >
            <Text style={styles.menuText}>비밀번호 변경</Text>

            <Image
              source={require('../assets/icon/chevron.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* 알림 */}
        <Text style={styles.groupTitle}>알림</Text>

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.menuText}>물주기 알림</Text>

            <Switch
              value={waterAlert}
              onValueChange={setWaterAlert}
              trackColor={SWITCH_TRACK_COLOR}
              thumbColor={
                waterAlert ? SWITCH_THUMB_COLOR_ON : SWITCH_THUMB_COLOR_OFF
              }
            />
          </View>
        </View>

        {/* 하드웨어 */}
        <Text style={styles.groupTitle}>하드웨어</Text>

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.menuText}>자동 물주기</Text>
              <Text style={styles.subText}>1회 500ml</Text>
            </View>

            <Switch
              value={pumpEnabled}
              onValueChange={setPumpEnabled}
              trackColor={SWITCH_TRACK_COLOR}
              thumbColor={
                pumpEnabled ? SWITCH_THUMB_COLOR_ON : SWITCH_THUMB_COLOR_OFF
              }
            />
          </View>
        </View>

        {/* 로그아웃 */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        {/* 회원탈퇴 */}
        <TouchableOpacity style={styles.deleteButton} onPress={onDeleteAccount}>
          <Text style={styles.deleteText}>회원탈퇴</Text>
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
        actions={alertConfig.actions}
        variant={alertConfig.variant}
        onRequestClose={closeAlert}
      />
    </View>
  );
}