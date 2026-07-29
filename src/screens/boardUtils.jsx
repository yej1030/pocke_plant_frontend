import React from 'react';
import { View, Text } from 'react-native';
import styles from './style/Board.style';

// 목록/상세 화면에서 쓰는 카테고리 (전체 포함)
export const CATEGORIES = [
	{ key: 'all', label: '전체' },
	{ key: 'free', label: '자유 게시판' },
	{ key: 'adopt', label: '분양 게시판' },
	{ key: 'disease', label: '질병 게시판' },
];

// 글쓰기 화면에서 쓰는 카테고리 (전체 제외)
export const WRITE_CATEGORIES = CATEGORIES.filter(
	(category) => category.key !== 'all'
);

export function formatDate(isoString) {
	if (!isoString) return '';

	const date = new Date(isoString);
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${month}월 ${day}일`;
}

export function CategoryBadge({ categoryKey }) {
	const label =
		CATEGORIES.find((c) => c.key === categoryKey)?.label ?? '';

	return (
		<View style={styles.categoryBadge}>
			<Text style={styles.categoryBadgeText}>{label}</Text>
		</View>
	);
}