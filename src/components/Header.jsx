import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({ title, navigation, type = 'auth' }) {
  // type = 'auth'  -> 뒤로가기, 타이틀
  // type = 'main'   뒤로가기, 타이틀, 설정

  if (type === 'main') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        </TouchableOpacity>
        <View style={styles.centerTitleWrap}>
          <Text style={styles.mainTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons
            name="menu"
            size={26}
            color="#222"
            style={styles.menu}
          />
        </TouchableOpacity>
      </View>
    );
  }
    if (type === 'full') {
    // 로그인 후 메인 이외: 뒤로가기+타이틀+메뉴
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#222"
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons
            name="menu"
            size={26}
            color="#222"
            style={styles.menu}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // auth 타입
return (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="chevron-back"
        size={26}
        color="#222"
        style={styles.back}
      />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.empty} />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  centerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  back: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    fontSize: 24,
    color: '#333',
  },
});