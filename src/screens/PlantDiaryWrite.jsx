import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
<<<<<<< HEAD
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IconCameraPlus, IconX } from '@tabler/icons-react-native';
=======
import {
	launchCamera,
	launchImageLibrary,
} from 'react-native-image-picker';
import IconCameraPlus from '@tabler/icons-react-native/IconCameraPlus';
import IconX from '@tabler/icons-react-native/IconX';
>>>>>>> bb3efd3 (프론트엔드 기능 수정)

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import CustomAlert from '../components/CustomAlert';
import useCustomAlert from '../components/useCustomAlert';
import styles from './style/PlantDiary.style';
import { usePlantDiary, MOODS } from '../context/PlantDiaryContext';

const MAX_PHOTOS = 3;

function getTodaySensorSnapshot() {
  return { temp: '24.8°C', humidity: '58%', soil: '양호' };
}

function calcDayCount(plant, existingDay) {
  if (existingDay) return existingDay;
  if (!plant?.adoptDate) return null;

  const adopted = new Date(plant.adoptDate);
  if (isNaN(adopted.getTime())) return null;

  const diffMs = Date.now() - adopted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 1;
}

export default function PlantDiaryWrite({ navigation, route }) {
  const { plantId, plant, entry: editingEntry } = route?.params ?? {};
  const { addDiaryEntry, updateDiaryEntry } = usePlantDiary();
  const { alertConfig, showAlert, closeAlert } = useCustomAlert();

  const isHardwareConnected = !!plant?.macAddress;
  const isEditing = !!editingEntry;

  const [photoUris, setPhotoUris] = useState(editingEntry?.photoUris ?? []);
  const [moods, setMoods] = useState(
    editingEntry?.moods ?? (editingEntry?.mood ? [editingEntry.mood] : [])
  );
  const [note, setNote] = useState(editingEntry?.note ?? '');
  const [submitting, setSubmitting] = useState(false);

  const handleAddPhoto = () => {
    if (photoUris.length >= MAX_PHOTOS) {
      showAlert({
        title: '최대 개수 초과',
        message: `사진은 최대 ${MAX_PHOTOS}장까지 첨부할 수 있어요.`,
        variant: 'warning',
      });
      return;
    }

    const remaining = MAX_PHOTOS - photoUris.length;

    showAlert({
      title: '이미지 선택',
      message: '이미지 선택 방법을 골라주세요.',
      actions: [
        {
          text: '카메라로 촬영',
          kind: 'primary',
          onPress: () => {
            launchCamera({ mediaType: 'photo', cameraType: 'back' }, (res) => {
              if (res.didCancel || res.errorCode) return;
              if (res.assets?.length > 0) {
                setPhotoUris((prev) => [...prev, res.assets[0].uri]);
              }
            });
          },
        },
        {
          text: '갤러리에서 선택',
          kind: 'primary',
          onPress: () => {
            launchImageLibrary(
              { mediaType: 'photo', selectionLimit: remaining },
              (res) => {
                if (res.didCancel || res.errorCode) return;
                if (res.assets?.length > 0) {
                  const newUris = res.assets.map((asset) => asset.uri);
                  setPhotoUris((prev) =>
                    [...prev, ...newUris].slice(0, MAX_PHOTOS)
                  );
                }
              }
            );
          },
        },
        { text: '취소', kind: 'cancel' },
      ],
    });
  };

  const handleRemovePhoto = (index) => {
    setPhotoUris((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleMood = (key) => {
    setMoods((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = async () => {
    if (!note.trim()) {
      showAlert({
        title: '메모 필요',
        message: '오늘의 메모를 입력해주세요.',
        variant: 'warning',
      });
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        await updateDiaryEntry(editingEntry.id, {
          plantId,
          moods,
          photoUris,
          note: note.trim(),
        });
        navigation.goBack();
      } else {
        const newDiaryId = await addDiaryEntry({
          plantId,
          day: calcDayCount(plant, null),
          moods,
          photoUris,
          note: note.trim(),
          sensorSnapshot: isHardwareConnected ? getTodaySensorSnapshot() : null,
        });

        navigation.replace('PlantDiaryDetail', {
          entryId: newDiaryId,
          plantId,
          plant,
        });
      }
    } catch (e) {
      showAlert({
        title: '오류',
        message: '일지를 저장하는 데 실패했습니다.',
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = note.trim().length > 0 && !submitting;

  return (
    <>
      <Header
        title={isEditing ? '일지 수정하기' : '일지 작성하기'}
        navigation={navigation}
        type="full"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formLabel}>
            사진 <Text style={styles.formLabelOpt}>선택, 최대 {MAX_PHOTOS}장</Text>
          </Text>

          <View style={styles.photoRow}>
            {photoUris.map((uri, index) => (
              <View key={uri + index} style={styles.photoThumbWrap}>
                <Image source={{ uri }} style={styles.photoThumb} />
                <TouchableOpacity
                  style={styles.photoRemoveBtn}
                  onPress={() => handleRemovePhoto(index)}
                  activeOpacity={0.8}
                >
                  <IconX size={12} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            ))}

            {photoUris.length < MAX_PHOTOS && (
              <TouchableOpacity
                style={styles.photoAddBox}
                onPress={handleAddPhoto}
                activeOpacity={0.85}
              >
                <IconCameraPlus size={20} color="#7fc77c" strokeWidth={1.5} />
                <Text style={styles.photoAddBoxText}>
                  {photoUris.length}/{MAX_PHOTOS}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.formLabel}>
            오늘 기분 <Text style={styles.formLabelOpt}>복수 선택 가능</Text>
          </Text>

          <View style={styles.moodPickRow}>
            {MOODS.map((m) => {
              const isActive = moods.includes(m.key);
              return (
                <TouchableOpacity
                  key={m.key}
                  style={[styles.moodChip, isActive && styles.moodChipActive]}
                  activeOpacity={0.85}
                  onPress={() => handleToggleMood(m.key)}
                >
                  <Text style={styles.moodChipEmoji}>{m.emoji}</Text>
                  <Text
                    style={[
                      styles.moodChipText,
                      isActive && styles.moodChipTextActive,
                    ]}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.formLabel}>
            메모 <Text style={styles.formLabelOpt}>필수</Text>
          </Text>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="오늘 식물은 어땠나요? 잎 상태, 물 준 시간, 느낀 점을 자유롭게 적어보세요."
            placeholderTextColor="#B8B8B8"
            style={styles.noteInput}
            multiline
            textAlignVertical="top"
            maxLength={300}
          />
          <Text style={styles.noteCount}>{note.length}/300</Text>

          {isHardwareConnected && (
            <View style={styles.sensorInfoCard}>
              <Text style={styles.sensorInfoText}>
                오늘의 센서 스냅샷이 자동으로 함께 저장돼요.{'\n'}
                🌡️ {getTodaySensorSnapshot().temp} · 💧{' '}
                {getTodaySensorSnapshot().humidity} · 🌱{' '}
                {getTodaySensorSnapshot().soil}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEditing ? '저장하기' : '등록하기'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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

<<<<<<< HEAD
      <Bottom
        type="detail"
        active="diary"
        navigation={navigation}
        params={{ plantId, plant }}
      />
    </>
  );
}
=======
					{isHardwareConnected && (
						<View style={styles.sensorInfoCard}>
							<Text style={styles.sensorInfoText}>
								오늘의 센서 스냅샷이 자동으로 함께 저장돼요.{'\n'}
								🌡️ {getTodaySensorSnapshot().temp} · 💧{' '}
								{getTodaySensorSnapshot().humidity} · 🌱{' '}
								{getTodaySensorSnapshot().soil}
							</Text>
						</View>
					)}

					<TouchableOpacity
						style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
						activeOpacity={0.85}
						onPress={handleSubmit}
					>
						<Text style={styles.submitButtonText}>
							{isEditing ? '저장하기' : '등록하기'}
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>

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
