import React, { useState } from 'react';
import {
View,
Text,
TouchableOpacity,
Switch,
ScrollView,
} from 'react-native';

import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';

import styles from './style/Settings.style';

export default function Settings({ navigation }) {

const [waterAlert, setWaterAlert] =
useState(true);

const [dailyReport, setDailyReport] =
useState(true);

const [pumpEnabled, setPumpEnabled] =
useState(true);

const {
alertConfig,
showAlert,
closeAlert,
} = useCustomAlert();

const onLogout = () => {


showAlert({
  title: '로그아웃',

  message:
    '로그아웃 하시겠습니까?',

  variant: 'warning',

  actions: [
    {
      text: '취소',
      kind: 'cancel',
    },

    {
      text: '로그아웃',
      kind: 'destructive',

      onPress: () =>
        navigation.navigate(
          'Login_1'
        ),
    },
  ],
});

};

const onDeleteAccount = () => {


showAlert({
  title: '회원탈퇴',

  message:
    '정말 탈퇴하시겠습니까?',

  variant: 'error',

  actions: [
    {
      text: '취소',
      kind: 'cancel',
    },

    {
      text: '탈퇴',
      kind: 'destructive',

      onPress: () => {
        console.log(
          '회원탈퇴'
        );
      },
    },
  ],
});


};

return (


<View style={styles.container}>

  <Header
    title="설정"
    navigation={navigation}
    type="full"
  />

  <ScrollView
    contentContainerStyle={
      styles.content
    }
  >

    {/* 프로필 */}
    <View
      style={styles.profileSection}
    >

      <Text style={styles.name}>
        윤은주
      </Text>

      <Text style={styles.email}>
        asdf@email.com
      </Text>

    </View>

    {/* 계정 */}
    <Text style={styles.groupTitle}>
      계정
    </Text>

    <View style={styles.card}>

      <TouchableOpacity
        style={styles.menuRow}
        onPress={() =>
          navigation.navigate(
            'FindPassword'
          )
        }
      >

        <Text style={styles.menuText}>
          비밀번호 변경
        </Text>

        <Text style={styles.arrow}>
          {'>'}
        </Text>

      </TouchableOpacity>

    </View>

    {/* 알림 */}
    <Text style={styles.groupTitle}>
      알림
    </Text>

    <View style={styles.card}>

      <View
        style={styles.switchRow}
      >

        <Text
          style={styles.menuText}
        >
          물주기 알림
        </Text>

        <Switch
          value={waterAlert}
          onValueChange={
            setWaterAlert
          }
        />

      </View>

      <View
        style={styles.divider}
      />

      <View
        style={styles.switchRow}
      >

        <Text
          style={styles.menuText}
        >
          일일 리포트
        </Text>

        <Switch
          value={dailyReport}
          onValueChange={
            setDailyReport
          }
        />

      </View>

    </View>

    {/* 하드웨어 */}
    <Text style={styles.groupTitle}>
      하드웨어
    </Text>

    <View style={styles.card}>

      <TouchableOpacity
        style={styles.menuRow}
      >

        <View>

          <Text
            style={styles.menuText}
          >
            ESP32 연결 관리
          </Text>

          <Text
            style={styles.subText}
          >
            연결됨 - 123.41.66
          </Text>

        </View>

        <Text style={styles.arrow}>
          {'>'}
        </Text>

      </TouchableOpacity>

      <View
        style={styles.divider}
      />

      <View
        style={styles.switchRow}
      >

        <View>

          <Text
            style={styles.menuText}
          >
            물주기
          </Text>

          <Text
            style={styles.subText}
          >
            500ml
          </Text>

        </View>

        <Switch
          value={pumpEnabled}
          onValueChange={
            setPumpEnabled
          }
        />

      </View>

    </View>

    {/* 로그아웃 */}
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={onLogout}
    >

      <Text
        style={styles.logoutText}
      >
        로그아웃
      </Text>

    </TouchableOpacity>

    {/* 회원탈퇴 */}
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={onDeleteAccount}
    >

      <Text
        style={styles.deleteText}
      >
        회원탈퇴
      </Text>

    </TouchableOpacity>

  </ScrollView>

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

</View>


);
}
