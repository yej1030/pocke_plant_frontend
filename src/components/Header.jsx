import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function Header({
  title,
  navigation,
  type = 'auth',
}) {

  // 메인
  if (type === 'main') {
    return (
      <View style={styles.container}>

        <View style={styles.iconSpace} />

        <View style={styles.centerTitleWrap}>
          <Text style={styles.mainTitle}>
            {title}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Settings'
            )
          }
        >

          <Image
            source={require('../assets/icon/menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>

      </View>
    );
  }

  // 메인 외 화면
  if (type === 'full') {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >

          <Image
            source={require('../assets/icon/back.png')}
            style={styles.icon}
            resizeMode="contain"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          {title}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Settings'
            )
          }
        >

          <Image
            source={require('../assets/icon/menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />

        </TouchableOpacity>

      </View>
    );
  }

  // auth
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }
      >

        <Image
          source={require('../assets/icon/back.png')}
          style={styles.icon}
          resizeMode="contain"
        />

      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.iconSpace} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 7,
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

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  icon: {
    width: 20,
    height: 20,
  },

  menuIcon: {
    width: 22,
    height: 22,
  },

  iconSpace: {
    width: 20,
    height: 20,
  },
});