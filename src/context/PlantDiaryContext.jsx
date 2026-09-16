import React, { createContext, useContext, useState , useCallback} from 'react';
import { diaryApi } from '../api/api';

const PlantDiaryContext = createContext();

// 오늘 기분 선택지 (일지 작성/수정/상세에서 공통으로 사용)
export const MOODS = [
	{ key: 'sprout', emoji: '🌱', label: '새싹 돋음' },
	{ key: 'happy', emoji: '😊', label: '건강해요' },
	{ key: 'water', emoji: '💧', label: '물주기함' },
	{ key: 'wilt', emoji: '🍂', label: '시들해요' },
	{ key: 'check', emoji: '🔬', label: '진단확인' },
];

export const PlantDiaryProvider = ({ children }) => {
	const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // 식물별 일지 목록 백엔드에서 불러오기
  const fetchDiaryEntries = useCallback(async (plantId) => {
    setLoading(true);
    try {
      const data = await diaryApi.getDiaries(plantId);
      setDiaryEntries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);


	// 일지 추가
	const addDiaryEntry = async (entryData) => {
    const newId = await diaryApi.createDiary({
      plantId: entryData.plantId,
      day: entryData.day,
      moods: entryData.moods,
      photoUrls: entryData.photoUris,
      note: entryData.note,
      sensorSnapshot: entryData.sensorSnapshot,
    });
    // 목록 새로고침
    await fetchDiaryEntries(entryData.plantId);
    return newId;
  };

	// 일지 수정
	const updateDiaryEntry = async (entryId, updatedData) => {
    await diaryApi.updateDiary(entryId, {
      moods: updatedData.moods,
      photoUrls: updatedData.photoUris,
      note: updatedData.note,
    });
    // 목록 갱신
    if (updatedData.plantId) {
      await fetchDiaryEntries(updatedData.plantId);
    }
  };

	// 일지 삭제
	const deleteDiaryEntry = async (entryId, plantId) => {
    await diaryApi.deleteDiary(entryId);
    setDiaryEntries((prev) => prev.filter((item) => item.id !== entryId));
  };

  // 일지 목록 상태 초기화 (예: 로그아웃 시)
  const clearDiaryEntries = () => {
    setDiaryEntries([]);
  };

// 일지 단건 상세 조회
const getDiaryEntry = useCallback(
    async (entryId) => {
      const cached = diaryEntries.find((entry) => entry.id === entryId);
      if (cached) return cached;
      return await diaryApi.getDiary(entryId);
    },
    [diaryEntries]
  );

  return (
    <PlantDiaryContext.Provider
      value={{
        diaryEntries,
        loading,
        fetchDiaryEntries,
        addDiaryEntry,
        updateDiaryEntry,
        deleteDiaryEntry,
        clearDiaryEntries,
        getDiaryEntry,
      }}
    >
      {children}
    </PlantDiaryContext.Provider>
  );
};

  


export const usePlantDiary = () => useContext(PlantDiaryContext);