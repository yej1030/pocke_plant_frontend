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
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d6ded9',
    backgroundColor: '#fff',
    paddingHorizontal: 17,
    paddingVertical: 6,
    gap: 8,
  },
  statIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  statLabel: {
    width: 62,
    fontSize: 15,
    color: '#1f1f1f',
    fontWeight: '700',
  },
  statValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 58,
  },
  statValue: {
    fontSize: 20,
    color: '#1f1f1f',
    fontWeight: '800',
  },
  statUnit: {
    marginLeft: 2,
    fontSize: 12,
    color: '#7a7a7a',
    fontWeight: '600',
  },
  statBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#e7efe9',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 6,
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

});
