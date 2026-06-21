import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';

import Header from '../components/Header';
import styles from './style/Chat.style';

import {
  createAiChatRoom,
  sendAiMessage,
} from '../api/api';

export default function Chat({ navigation, route }) {
  const characterImages = {
    1: {
      happy: require('../assets/Plant/plant_01_happy.png'),
    },
    2: {
      happy: require('../assets/Plant/plant_03_happy.png'),
    },
    3: {
      happy: require('../assets/Plant/plant_05_happy.png'),
    },
    4: {
      happy: require('../assets/Plant/plant_07_happy.png'),
    },
    5: {
      happy: require('../assets/Plant/plant_09_happy.png'),
    },
    6: {
      happy: require('../assets/Plant/plant_11_happy.png'),
    },
    7: {
      happy: require('../assets/Plant/plant_13_happy.png'),
    },
    8: {
      happy: require('../assets/Plant/plant_15_happy.png'),
    },
    9: {
      happy: require('../assets/Plant/plant_17_happy.png'),
    },
    10: {
      happy: require('../assets/Plant/plant_19_happy.png'),
    },
  };

  const [roomId, setRoomId] =
    useState(null);

  const [isRoomCreating, setIsRoomCreating] =
    useState(false);

  const plant =
    route?.params?.plant;

  const title =
    useMemo(
      () =>
        route?.params?.title ||
        plant?.name ||
        '',
      [plant, route]
    );

  const quickReplies =
    route?.params?.quickReplies ?? [];

  const initialMessages =
    route?.params?.initialMessages ?? [];

  const flatListRef =
    useRef(null);

  const pendingAutoScrollRef =
    useRef(false);

  const [message, setMessage] =
    useState('');

  const [inputHeight, setInputHeight] =
    useState(52);

  const [messages, setMessages] =
    useState(initialMessages);

  const [isAtBottom, setIsAtBottom] =
    useState(true);

  const todayText =
    useMemo(
      () =>
        new Date().toLocaleDateString(
          'ko-KR',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        ),
      []
    );

  const getAiText = answer => {
    if (typeof answer === 'string') {
      return answer;
    }

    return (
      answer?.answer ??
      answer?.choices?.[0]?.message?.content ??
      '응답 없음'
    );
  };

  const buildMessagePayload =
    (text, time) => ({
      text,
      time,
      role: 'me',
      context: {
        plant: plant
          ? {
              id: plant.id ?? null,
              name: plant.name ?? null,
              imageUri: plant.imageUri ?? null,
              personality:
                plant.personality ?? null,
            }
          : null,
      },
    });

  useEffect(() => {
    const createRoom =
      async () => {
        if (!plant?.id) {
          console.log(
            'plant.id가 없어 채팅방을 생성할 수 없습니다.'
          );

          setMessages(current => [
            ...current,
            {
              id: `${Date.now()}-no-plant`,
              text:
                '식물 정보가 없어 채팅방을 만들 수 없어요.',
              time:
                new Date()
                  .toTimeString()
                  .slice(0, 5),
              role: 'other',
            },
          ]);

          return;
        }

        try {
          setIsRoomCreating(true);

          const room =
            await createAiChatRoom(
              plant.id
            );

          console.log(
            '채팅방 생성:',
            room
          );

          setRoomId(room.id);
        } catch (error) {
          console.log(
            '채팅방 생성 실패:',
            error.response?.data ||
              error.message
          );

          setMessages(current => [
            ...current,
            {
              id: `${Date.now()}-room-error`,
              text:
                '채팅방을 생성하지 못했습니다.',
              time:
                new Date()
                  .toTimeString()
                  .slice(0, 5),
              role: 'other',
            },
          ]);
        } finally {
          setIsRoomCreating(false);
        }
      };

    createRoom();
  }, [plant?.id]);

  useEffect(() => {
    if (!pendingAutoScrollRef.current) {
      return undefined;
    }

    pendingAutoScrollRef.current = false;

    const timer =
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });

        setIsAtBottom(true);
      }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  const sendMessage =
    async text => {
      const trimmed =
        String(text ?? '').trim();

      if (!trimmed) {
        return;
      }

      if (isRoomCreating) {
        console.log(
          '채팅방 생성 중입니다.'
        );

        return;
      }

      if (!roomId) {
        console.log(
          '채팅방이 아직 생성되지 않았습니다.'
        );

        setMessages(current => [
          ...current,
          {
            id: `${Date.now()}-no-room`,
            text:
              '채팅방이 아직 준비되지 않았어요. 잠시 후 다시 보내주세요.',
            time:
              new Date()
                .toTimeString()
                .slice(0, 5),
            role: 'other',
          },
        ]);

        return;
      }

      pendingAutoScrollRef.current = true;

      const now =
        new Date();

      const time =
        now.toTimeString().slice(0, 5);

      setMessages(current => [
        ...current,
        {
          id:
            `${now.getTime()}-${Math.random()
              .toString(16)
              .slice(2)}`,
          ...buildMessagePayload(
            trimmed,
            time
          ),
        },
      ]);

      setMessage('');

      try {
        const aiAnswer =
          await sendAiMessage(
            roomId,
            trimmed
          );

        console.log(
          'AI 응답 전체:',
          JSON.stringify(
            aiAnswer,
            null,
            2
          )
        );

        const aiText =
          getAiText(aiAnswer);

        setMessages(current => [
          ...current,
          {
            id: `${Date.now()}-ai`,
            text: aiText,
            time,
            role: 'other',
          },
        ]);
      } catch (error) {
        console.log(
          '===== AI ERROR ====='
        );

        console.log(
          'status:',
          error.response?.status
        );

        console.log(
          'data:',
          error.response?.data
        );

        console.log(
          'message:',
          error.message
        );

        setMessages(current => [
          ...current,
          {
            id: `${Date.now()}-error`,
            text:
              'AI 응답을 가져오지 못했습니다.',
            time,
            role: 'other',
          },
        ]);
      }
    };

  const renderItem =
    ({ item }) => {
      const isMe =
        item.role === 'me';

      return (
        <View
          style={[
            styles.messageRow,
            isMe
              ? styles.messageRowMe
              : styles.messageRowOther,
          ]}
        >
          {!isMe && (
            <View style={styles.avatar}>
              <Image
                source={
                  characterImages[
                    plant?.character_id || 1
                  ]?.happy
                }
                style={styles.avatarImage}
              />
            </View>
          )}

          <View
            style={[
              styles.messageColumn,
              isMe
                ? styles.messageColumnMe
                : styles.messageColumnOther,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                isMe
                  ? styles.messageBubbleMe
                  : styles.messageBubbleOther,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  isMe
                    ? styles.messageTextMe
                    : styles.messageTextOther,
                ]}
              >
                {item.text}
              </Text>
            </View>

            <Text
              style={[
                styles.messageTime,
                isMe
                  ? styles.messageTimeMe
                  : styles.messageTimeOther,
              ]}
            >
              {item.time}
            </Text>
          </View>
        </View>
      );
    };

  return (
    <View style={styles.screen}>
      <Header
        title={title}
        navigation={navigation}
        type="full"
      />

      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? 8
            : 0
        }
      >
        <View style={styles.body}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={styles.messageListViewport}
            contentContainerStyle={[
              styles.messageList,
              !isAtBottom
                ? styles.messageListLifted
                : null,
            ]}
            ListHeaderComponent={
              <View style={styles.dateWrap}>
                <Text style={styles.dateText}>
                  {todayText}
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            nestedScrollEnabled
            scrollEnabled
            scrollEventThrottle={16}
            onScrollBeginDrag={() => {
              Keyboard.dismiss();
            }}
            onScroll={event => {
              const {
                contentOffset,
                contentSize,
                layoutMeasurement,
              } = event.nativeEvent;

              const distanceFromBottom =
                contentSize.height -
                (
                  contentOffset.y +
                  layoutMeasurement.height
                );

              setIsAtBottom(
                distanceFromBottom < 80
              );
            }}
          />

          {!isAtBottom && (
            <TouchableOpacity
              style={
                styles.scrollToBottomButton
              }
              activeOpacity={0.85}
              onPress={() => {
                flatListRef.current?.scrollToEnd({
                  animated: true,
                });

                setIsAtBottom(true);
              }}
            >
              <Text
                style={
                  styles.scrollToBottomIcon
                }
              >
                ↓
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputRow}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder={
                isRoomCreating
                  ? '채팅방 준비 중...'
                  : '말걸기'
              }
              placeholderTextColor="#aaa"
              multiline
              editable={
                !isRoomCreating &&
                !!roomId
              }
              blurOnSubmit={false}
              textAlignVertical="top"
              onContentSizeChange={event => {
                const nextHeight =
                  Math.max(
                    52,
                    Math.min(
                      120,
                      event.nativeEvent
                        .contentSize.height
                    )
                  );

                setInputHeight(
                  nextHeight
                );
              }}
              style={[
                styles.input,
                { height: inputHeight },
              ]}
            />

            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.85}
              disabled={
                isRoomCreating ||
                !roomId
              }
              onPress={() =>
                sendMessage(message)
              }
            >
              <Text style={styles.sendIcon}>
                ➤
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}