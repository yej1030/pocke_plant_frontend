import React, { createContext, useContext, useState } from 'react';

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

	// 일지 추가
	const addDiaryEntry = (entry) => {
		setDiaryEntries((prev) => [entry, ...prev]);
	};

	// 일지 수정
	const updateDiaryEntry = (updatedEntry) => {
		setDiaryEntries((prev) =>
			prev.map((entry) =>
				entry.id === updatedEntry.id ? updatedEntry : entry
			)
		);
	};

	// 일지 삭제
	const deleteDiaryEntry = (entryId) => {
		setDiaryEntries((prev) => prev.filter((entry) => entry.id !== entryId));
	};

	// 특정 식물의 일지만 최신순으로 조회
	const getDiaryEntriesByPlant = (plantId) => {
		return diaryEntries
			.filter((entry) => entry.plantId === plantId)
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	};

	// 일지 하나 조회 (id 기준) - 상세/수정 화면에서 사용
	const getDiaryEntry = (entryId) => {
		return diaryEntries.find((entry) => entry.id === entryId);
	};

	return (
		<PlantDiaryContext.Provider
			value={{
				diaryEntries,
				addDiaryEntry,
				updateDiaryEntry,
				deleteDiaryEntry,
				getDiaryEntriesByPlant,
				getDiaryEntry,
			}}
		>
			{children}
		</PlantDiaryContext.Provider>
	);
};

export const usePlantDiary = () => useContext(PlantDiaryContext);