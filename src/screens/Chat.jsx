import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [roomId, setRoomId] = useState(null);
  const plant = route?.params?.plant;
  const title = useMemo(
    () => route?.params?.title || plant?.name || '',
    [plant, route]
  );
  const quickReplies = route?.params?.quickReplies ?? [];
  const initialMessages = route?.params?.initialMessages ?? [];
  const flatListRef = useRef(null);
  const pendingAutoScrollRef = useRef(false);
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(52);
  const [messages, setMessages] = useState(initialMessages);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const todayText = useMemo(
    () =>
      new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  const buildMessagePayload = (text, time) => ({
    text,
    time,
    role: 'me',
    context: {
      plant: plant
        ? {
            id: plant.id ?? null,
            name: plant.name ?? null,
            imageUri: plant.imageUri ?? null,
          }
        : null,
    },
  });

  useEffect(() => {
    if (!pendingAutoScrollRef.current) {
      return undefined;
    }

    pendingAutoScrollRef.current = false;

    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
      setIsAtBottom(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  const sendMessage = async text => {

  const trimmed =
    String(text ?? '').trim();

  if (!trimmed) {
    return;
  }

  if (!roomId) {

    console.log(
      '채팅방이 아직 생성되지 않았습니다.'
    );

    return;
  }

  pendingAutoScrollRef.current =
    true;

  const now = new Date();

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

    setMessages(current => [
      ...current,
      {
        id:
          `${Date.now()}-ai`,

        text:
  aiAnswer?.choices?.[0]
    ?.message?.content
  ?? '응답 없음',

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
        id:
          `${Date.now()}-error`,

        text:
          'AI 응답을 가져오지 못했습니다.',

        time,

        role: 'other',
      },
    ]);
  }
};

  const renderItem = ({ item }) => {
    const isMe = item.role === 'me';

    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.messageRowMe : styles.messageRowOther,
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
            isMe ? styles.messageColumnMe : styles.messageColumnOther,
          ]}
        >
          <View
            style={[
              styles.messageBubble,
              isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isMe ? styles.messageTextMe : styles.messageTextOther,
              ]}
            >
              {item.text}
            </Text>
          </View>
          <Text
            style={[
              styles.messageTime,
              isMe ? styles.messageTimeMe : styles.messageTimeOther,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {

  const createRoom =
    async () => {

      try {

        const room =
          await createAiChatRoom();

        console.log(
          '채팅방 생성:',
          room
        );

        setRoomId(room.id);

      } catch (error) {

        console.log(
          '채팅방 생성 실패:',
          error.response?.data
        );

      }
    };

  createRoom();

}, []);

  return (
    <View style={styles.screen}>
      <Header title={title} navigation={navigation} type="full" />

      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
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
              !isAtBottom ? styles.messageListLifted : null,
            ]}
            ListHeaderComponent={
              <View style={styles.dateWrap}>
                <Text style={styles.dateText}>{todayText}</Text>
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
              const { contentOffset, contentSize, layoutMeasurement } =
                event.nativeEvent;
              const distanceFromBottom =
                contentSize.height -
                (contentOffset.y + layoutMeasurement.height);

              setIsAtBottom(distanceFromBottom < 80);
            }}
          />

          {!isAtBottom && (
            <TouchableOpacity
              style={styles.scrollToBottomButton}
              activeOpacity={0.85}
              onPress={() => {
                flatListRef.current?.scrollToEnd({ animated: true });
                setIsAtBottom(true);
              }}
            >
              <Text style={styles.scrollToBottomIcon}>↓</Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputRow}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="말걸기"
              placeholderTextColor="#aaa"
              multiline
              blurOnSubmit={false}
              textAlignVertical="top"
              onContentSizeChange={event => {
                const nextHeight = Math.max(
                  52,
                  Math.min(120, event.nativeEvent.contentSize.height)
                );

                setInputHeight(nextHeight);
              }}
              style={[styles.input, { height: inputHeight }]}
            />
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.85}
              onPress={() => sendMessage(message)}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
