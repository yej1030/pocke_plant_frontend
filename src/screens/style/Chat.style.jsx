import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f4f1',
  },
  keyboardWrap: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dateWrap: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  messageList: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 72,
    flexGrow: 1,
  },
  messageListViewport: {
    flex: 1,
  },
  messageListLifted: {
    paddingBottom: 72,
  },
  messageRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageRowMe: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  messageColumn: {
    maxWidth: '72%',
  },
  messageColumnMe: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  messageColumnOther: {
    alignItems: 'flex-start',
  },
avatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#D9E3DC',
  backgroundColor: '#EEF7EF',
  marginRight: 4,
  overflow: 'hidden',
},
avatarImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
},
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 15,
    borderWidth: 1,
  },
  messageBubbleMe: {
    backgroundColor: '#D9F4DF',
    borderColor: '#C6E6CD',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  messageBubbleOther: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    color: '#1F2937',
  },
  messageTextMe: {
    color: '#1F2937',
  },
  messageTextOther: {
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  messageTimeMe: {
    marginRight: 4,
  },
  messageTimeOther: {
    marginLeft: 4,
  },
inputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderTopColor: '#E5E7EB',
},

input: {
  flex: 1,
  height: 45,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 6,
  paddingHorizontal: 14,
  fontSize: 15,
  color: '#1F2937',
},
sendButton: {
  width: 48,
  height: 48,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 6,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
},
sendIcon: {
  fontSize: 18,
  color: '#9CA3AF',
  fontWeight: '700',
},
  scrollToBottomButton: {
    position: 'absolute',
    left: '50%',
    bottom: 133,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E3DC',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
    transform: [{ translateX: -20 }],
  },
  scrollToBottomIcon: {
    fontSize: 16,
    lineHeight: 20,
    color: '#6F7C75',
    fontWeight: '700',
  },
});
