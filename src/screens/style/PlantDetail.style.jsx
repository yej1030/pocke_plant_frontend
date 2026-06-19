import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroCard: {
    marginTop: 10,
    paddingTop: 30,
    paddingVertical: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e4ece7',
    backgroundColor: '#F7FFFF',
    alignItems: 'center',
  },
  speechBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#989898',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  speechText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
  heroImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfe3c9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  actionText: {
    fontSize: 16,
    color: '#3d6b4f',
    fontWeight: '600',
  },
  actionPrimary: {
    backgroundColor: '#93d3a8',
    borderColor: '#93d3a8',
  },
  actionPrimaryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  hardwareButton: {
    marginTop: 14,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d7e2dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hardwareText: {
    fontSize: 15,
    color: '#6c7a73',
    fontWeight: '600',
  },
  hardwareHint: {
    marginTop: 10,
    fontSize: 13,
    color: '#96a39d',
    textAlign: 'center',
  },
  statsList: {
    marginTop: 14,
    gap: 10,
  },
  
  waterButton: {
    marginTop: 14,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  waterIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  waterText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 14,
    color: '#7b7b7b',
  },

quickReplyWrap: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 8,
  paddingHorizontal: 16,
  paddingBottom: 12,
},

quickReplyButton: {
  borderWidth: 1,
  borderColor: '#79d791',
  borderRadius: 18,
  paddingHorizontal: 12,
  paddingVertical: 6,
  backgroundColor: '#fff',
},

quickReplyText: {
  fontSize: 12,
  color: '#1d1d1d',
},

sensorCard: {
  borderWidth: 1,
  borderColor: '#dcdcdc',
  borderRadius: 16,
  backgroundColor: '#fff',
  padding: 16,
},

sensorTop: {
  flexDirection: 'row',
  justifyContent:
    'space-between',
  alignItems: 'center',
},

sensorLeft: {
  flexDirection: 'row',
  alignItems: 'center',
},

sensorIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

sensorLabel: {
  marginLeft: 12,
  fontSize: 20,
  fontWeight: '700',
  color: '#222',
},

sensorRight: {
  alignItems: 'flex-end',
},

sensorTarget: {
  fontSize: 14,
  color: '#999',
  fontWeight: '600',
},

sensorValue: {
  fontSize: 34,
  fontWeight: '800',
  color: '#222',
},

sensorUnit: {
  fontSize: 20,
},

sensorBarTrack: {
  marginTop: 12,
  height: 16,
  borderRadius: 10,
  backgroundColor: '#DDE8D9',
  overflow: 'hidden',
},

sensorBarFill: {
  height: '100%',
  borderRadius: 10,
},

});
