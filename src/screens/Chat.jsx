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
} from 'react-native';
import Header from '../components/Header';
import styles from './style/Chat.style';

const defaultQuickReplies = [
  '물 줄까?',
  '햇빛은 안 부족해?',
  '기분이 어때?',
];

export default function Chat({ navigation, route }) {
  const plant = route?.params?.plant;
  const title = useMemo(
    () => route?.params?.title || plant?.name || '',
    [plant, route]
  );
  const quickReplies = route?.params?.quickReplies ?? defaultQuickReplies;
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

  const sendMessage = text => {
    const trimmed = String(text ?? '').trim();
    if (!trimmed) {
      return;
    }

    pendingAutoScrollRef.current = true;

    const now = new Date();
    const time = now
      .toTimeString()
      .slice(0, 5);

    setMessages(current => [
      ...current,
      {
        id: `${now.getTime()}-${Math.random().toString(16).slice(2)}`,
        ...buildMessagePayload(trimmed, time),
      },
      {
        id: `${now.getTime()}-${Math.random().toString(16).slice(2)}-plant`,
        text: trimmed,
        time,
        role: 'other',
        context: {
          plant: plant
            ? {
                id: plant.id ?? null,
                name: plant.name ?? null,
                imageUri: plant.imageUri ?? null,
              }
            : null,
        },
      },
    ]);
    setMessage('');
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
        {!isMe && <View style={styles.avatar} />}
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

          <View style={styles.quickReplyWrap}>
            {quickReplies.map(reply => (
              <TouchableOpacity
                key={reply}
                style={styles.quickReplyButton}
                activeOpacity={0.85}
                onPress={() => sendMessage(reply)}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </View>

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
