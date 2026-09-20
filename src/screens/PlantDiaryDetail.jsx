<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { IconEdit } from '@tabler/icons-react-native';
=======
import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import IconEdit from '@tabler/icons-react-native/IconEdit';
>>>>>>> bb3efd3 (프론트엔드 기능 수정)

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/PlantDiary.style';
import { usePlantDiary, MOODS } from '../context/PlantDiaryContext';
import { formatDate } from './boardUtils';

function moodInfo(key) {
  return MOODS.find((m) => m.key === key) ?? MOODS[0];
}

export default function PlantDiaryDetail({ navigation, route }) {
  const { entryId, plantId, plant } = route?.params ?? {};
  const { getDiaryEntry, deleteDiaryEntry } = usePlantDiary();
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getDiaryEntry(entryId);
        if (isMounted) setEntry(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [entryId, getDiaryEntry]);
=======
	if (!entry) {
		return (
			<>
				<Header title="일지 상세" navigation={navigation} type="full" />
				<View style={styles.container}>
					<Text style={styles.detailEmptyText}>일지를 찾을 수 없습니다.</Text>
				</View>
				<Bottom
					type="detail"
					active="diary"
					navigation={navigation}
					params={{ plantId, plant }}
				/>
			</>
		);
	}
>>>>>>> bb3efd3 (프론트엔드 기능 수정)

  const handleDelete = () => {
    showAlert({
      title: '일지 삭제',
      message: '이 일지를 삭제하시겠어요? 삭제한 기록은 복구할 수 없어요.',
      variant: 'error',
      actions: [
        { text: '취소', kind: 'cancel' },
        {
          text: '삭제',
          kind: 'destructive',
          onPress: async () => {
            try {
              await deleteDiaryEntry(entry.id, plantId);
              navigation.goBack();
            } catch (e) {
              showAlert({ title: '오류', message: '삭제 중 문제가 발생했습니다.' });
            }
          },
        },
      ],
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7fc77c" />
      </View>
    );
  }

  if (!entry) {
    return (
      <>
        <Header title="일지 상세" navigation={navigation} type="full" />
        <View style={styles.container}>
          <Text style={styles.emptyText}>일지를 찾을 수 없습니다.</Text>
        </View>
        <Bottom type="detail" active="diary" navigation={navigation} params={{ plantId, plant }} />
      </>
    );
  }

  const mood = moodInfo(entry.mood || entry.moods?.[0]);

  return (
    <>
      <Header title="일지 상세" navigation={navigation} type="full" />

      <ScrollView style={styles.container} contentContainerStyle={styles.detailContent}>
        <View style={styles.detailMetaRow}>
          <Text style={styles.detailDate}>{formatDate(entry.date)}</Text>
          {entry.day ? (
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>{entry.day}일째</Text>
            </View>
          ) : null}
        </View>

        {entry.photoUris?.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.detailPhotoScroll}>
            {entry.photoUris.map((uri, index) => (
              <Image key={uri + index} source={{ uri }} style={styles.detailPhoto} />
            ))}
          </ScrollView>
        )}

        <View style={styles.moodRow}>
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text style={styles.moodLabel}>{mood.label}</Text>
        </View>

        <Text style={styles.detailNote}>{entry.note}</Text>

        {entry.sensorSnapshot && (
          <>
            <Text style={styles.sensorTitle}>그날의 센서 기록 (자동 저장)</Text>
            <View style={styles.sensorRow}>
              <View style={styles.sensorChip}>
                <Text style={styles.sensorValue}>{entry.sensorSnapshot.temp}</Text>
                <Text style={styles.sensorLabel}>온도</Text>
              </View>
              <View style={styles.sensorChip}>
                <Text style={styles.sensorValue}>{entry.sensorSnapshot.humidity}</Text>
                <Text style={styles.sensorLabel}>습도</Text>
              </View>
              <View style={styles.sensorChip}>
                <Text style={styles.sensorValue}>{entry.sensorSnapshot.soil}</Text>
                <Text style={styles.sensorLabel}>토양 수분</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.detailActionRow}>
          <TouchableOpacity
            style={[styles.detailActionButton, styles.detailActionButtonHalf]}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('PlantDiaryWrite', {
                entry,
                plantId,
                plant,
              })
            }
          >
            <IconEdit size={18} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.detailActionText}>수정하기</Text>
          </TouchableOpacity>

<<<<<<< HEAD
          <TouchableOpacity
            style={[
              styles.detailActionButton,
              styles.detailActionButtonHalf,
              { backgroundColor: '#E74C3C' },
            ]}
            activeOpacity={0.85}
            onPress={handleDelete}
          >
            <Text style={styles.detailActionText}>삭제하기</Text>
          </TouchableOpacity>
        </View>
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

      <Bottom type="detail" active="diary" navigation={navigation} params={{ plantId, plant }} />
    </>
  );
}
=======
			<Bottom
				type="detail"
				active="diary"
				navigation={navigation}
				params={{ plantId, plant }}
			/>
		</>
	);
}
>>>>>>> bb3efd3 (프론트엔드 기능 수정)
