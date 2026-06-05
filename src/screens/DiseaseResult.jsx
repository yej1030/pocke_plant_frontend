import React from 'react';

import {
View,
Text,
Image,
ScrollView,
} from 'react-native';

import Header from '../components/Header';
import BottomButton from '../components/Bottombutton';

import styles from './style/DiseaseResult.style';

function ResultBar({
label,
percent,
}) {

return ( <View style={styles.resultRow}>


  <View
    style={styles.resultHeader}
  >

    <Text
      style={styles.resultLabel}
    >
      {label}
    </Text>

    <Text
      style={styles.resultPercent}
    >
      {percent}%
    </Text>

  </View>

  <View
    style={styles.barTrack}
  >

    <View
      style={[
        styles.barFill,
        {
          width: `${percent}%`,
        },
      ]}
    />

  </View>

</View>


);
}

export default function DiseaseResult({
navigation,
route,
}) {

const {
plant,
imageUri,
} = route?.params || {};

const results = [
{
label: '잎 끝 마름증',
percent: 72,
},
{
label: '과습',
percent: 18,
},
{
label: '탄저병',
percent: 9,
},
];

return ( <View style={styles.background}>


  <Header
    title="질병 예측하기"
    navigation={navigation}
    type="full"
  />

  <ScrollView
    style={styles.scroll}
    contentContainerStyle={
      styles.container
    }
  >

    {imageUri ? (

      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />

    ) : (

      <View
        style={styles.noImage}
      >

        <Text
          style={styles.emptyText}
        >
          이미지 없음
        </Text>

      </View>

    )}

    <Text
      style={styles.headerText}
    >
      ⚠ 감지된 이상 징후
    </Text>

    {results.map((item) => (

      <ResultBar
        key={item.label}
        label={item.label}
        percent={item.percent}
      />

    ))}

    <View
      style={styles.divider}
    />

    <View
      style={styles.tipCard}
    >

      <Text
        style={styles.tipText}
      >
        💡 물주기 주기 조정을 권장합니다. 잎 끝이 마르는 현상은 수분 부족이 원인일 수 있습니다.
      </Text>

    </View>

  </ScrollView>

<BottomButton
  title="식물로 돌아가기"
  onPress={() =>
    navigation.replace(
      'PlantDetail',
      {
        plant,
      }
    )
  }
/>

</View>


);
}
