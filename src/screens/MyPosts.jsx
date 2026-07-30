import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconEye, IconMessageCircle } from '@tabler/icons-react-native';

import Header from '../components/Header';
import Bottom from '../components/Bottom';
import styles from './style/Board.style';
import { useBoard } from '../context/BoardContext';
import { formatDate, CategoryBadge } from './boardUtils';

const TABS = [
    { key: 'posts', label: '포스트' },
    { key: 'comments', label: '댓글' },
];

export default function MyPosts({ navigation }) {
    const { posts, comments, getPost } = useBoard();
    const [activeTab, setActiveTab] = useState('posts');
    const [myUserId, setMyUserId] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            const id = await AsyncStorage.getItem('userId');
            setMyUserId(id || '');
        };

        loadUser();
    }, []);

    // 내가 쓴 게시글만 (최신순)
    const myPosts = useMemo(() => {
        return posts
            .filter((post) => post.userId === myUserId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [posts, myUserId]);

    // 내가 쓴 댓글/답글만 (최신순), 각 댓글이 달린 게시글 정보도 같이 붙여줌
    const myComments = useMemo(() => {
        return comments
            .filter((comment) => comment.userId === myUserId)
            .map((comment) => ({
                ...comment,
                post: getPost(comment.postId),
            }))
            .filter((comment) => comment.post) // 게시글이 삭제된 댓글은 제외
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [comments, myUserId, getPost]);

    const renderPost = ({ item }) => (
        <TouchableOpacity
            style={styles.postCard}
            activeOpacity={0.85}
            onPress={() =>
                navigation.navigate('BoardDetail', { postId: item.id })
            }
        >
            <View style={styles.postTextWrap}>
                <CategoryBadge categoryKey={item.category} />

                <Text style={styles.postTitle} numberOfLines={1}>
                    {item.title}
                </Text>

                <Text style={styles.postPreview} numberOfLines={2}>
                    {item.content}
                </Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaDate}>{formatDate(item.date)}</Text>

                    <View style={styles.metaIconGroup}>
                        <IconEye size={13} color="#C4C4C4" strokeWidth={1.75} />
                        <Text style={styles.metaCount}>{item.views ?? 0}</Text>

                        <IconMessageCircle size={13} color="#C4C4C4" strokeWidth={1.75} />
                        <Text style={styles.metaCount}>{item.commentsCount ?? 0}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderComment = ({ item }) => (
        <TouchableOpacity
            style={styles.postCard}
            activeOpacity={0.85}
            onPress={() =>
                navigation.navigate('BoardDetail', { postId: item.post.id })
            }
        >
            <View style={styles.postTextWrap}>
                <CategoryBadge categoryKey={item.post.category} />

                <Text style={styles.postTitle} numberOfLines={1}>
                    {item.post.title}
                </Text>

                <Text style={styles.postPreview} numberOfLines={2}>
                    {item.content}
                </Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaDate}>{formatDate(item.date)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const data = activeTab === 'posts' ? myPosts : myComments;

    return (
        <>
            <Header title="내가 쓴 글" navigation={navigation} type="full" />

            <View style={styles.container}>
                <View style={styles.tabRow}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.key;

                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={styles.tabItem}
                                onPress={() => setActiveTab(tab.key)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        isActive && styles.tabTextActive,
                                    ]}
                                >
                                    {tab.label}
                                </Text>

                                <View
                                    style={[
                                        styles.tabUnderline,
                                        !isActive && { backgroundColor: 'transparent' },
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <FlatList
                    style={styles.postList}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={activeTab === 'posts' ? renderPost : renderComment}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {activeTab === 'posts'
                                ? '작성한 게시글이 없습니다.'
                                : '작성한 댓글이 없습니다.'}
                        </Text>
                    }
                />
            </View>

            <Bottom type="main" active="board" navigation={navigation} />
        </>
    );
}