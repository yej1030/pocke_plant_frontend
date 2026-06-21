import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FAF7',
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 36,
  },

  heroCard: {
    marginTop: 12,
    paddingTop: 24,
    paddingBottom: 16,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E0EEE6',
    backgroundColor: '#F7FFFF',
    alignItems: 'center',
    overflow: 'hidden',
  },

  speechBubble: {
    minWidth: 150,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D8E6DE',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  speechText: {
    fontSize: 14,
    color: '#2E3A34',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },

  heroImage: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    marginTop: 4,
  },

  quickReplyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  quickReplyButton: {
    borderWidth: 1,
    borderColor: '#79D791',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
  },

  quickReplyText: {
    fontSize: 12,
    color: '#1F3B2B',
    fontWeight: '600',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  actionButton: {
    flex: 1,
    height: 46,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CBE8D2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  actionText: {
    fontSize: 15,
    color: '#3D6B4F',
    fontWeight: '700',
  },

  actionPrimary: {
    backgroundColor: '#5CD79E',
    borderColor: '#5CD79E',
  },

  actionPrimaryText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  hardwareButton: {
    marginTop: 14,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7E2DC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  hardwareText: {
    fontSize: 15,
    color: '#6C7A73',
    fontWeight: '700',
  },

  hardwareHint: {
    marginTop: 14,
    fontSize: 13,
    color: '#96A39D',
    textAlign: 'center',
  },

  summaryCard: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: '#1F2D26',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  summaryTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  summarySubText: {
    marginTop: 4,
    fontSize: 12,
    color: '#BFD3C7',
    fontWeight: '500',
  },

  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#30443A',
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#5CD79E',
  },

  liveText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  statsGrid: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  miniSensorCard: {
    width: '48.5%',
    minHeight: 124,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4EFE8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    elevation: 2,
  },

  miniSensorCardActive: {
    borderColor: '#5CD79E',
    backgroundColor: '#F1FFF7',
  },

  miniSensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  miniSensorIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

  miniSensorLabel: {
    flex: 1,
    fontSize: 13,
    color: '#51645A',
    fontWeight: '700',
  },

  miniSensorValue: {
    marginTop: 12,
    fontSize: 24,
    color: '#15251D',
    fontWeight: '900',
  },

  miniSensorUnit: {
    fontSize: 13,
    color: '#53645B',
    fontWeight: '700',
  },

  miniSensorTarget: {
    marginTop: 2,
    fontSize: 11,
    color: '#98A8A0',
    fontWeight: '600',
  },

  miniBarTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E8F5EC',
    overflow: 'hidden',
  },

  miniBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#5CD79E',
  },

  chartCard: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E4EFE8',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  chartHeader: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },

  chartTitle: {
    fontSize: 17,
    color: '#15251D',
    fontWeight: '900',
  },

  chartSubText: {
    marginTop: 4,
    fontSize: 12,
    color: '#8A9B92',
    fontWeight: '600',
  },

  chartCurrentValue: {
    fontSize: 22,
    color: '#15251D',
    fontWeight: '900',
  },

  chartCurrentUnit: {
    fontSize: 12,
    color: '#6D7D74',
    fontWeight: '700',
  },

  chartAxisText: {
    fontSize: 10,
    color: '#94A39B',
    fontWeight: '600',
  },

  chartEmpty: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#F7FAF8',
  },

  chartEmptyText: {
    fontSize: 13,
    color: '#8A9B92',
    fontWeight: '600',
    textAlign: 'center',
  },

  pointerLabel: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#1F2D26',
  },

  pointerLabelText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  waterButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },

  waterIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  waterText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '700',
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },

  emptyText: {
    fontSize: 14,
    color: '#7B7B7B',
  },

  statsList: {
    marginTop: 14,
    gap: 10,
  },

  sensorCard: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  sensorTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  sensorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  sensorIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },

  sensorLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  sensorRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },

  sensorTarget: {
    fontSize: 12,
    color: '#AAA',
    fontWeight: '500',
    paddingRight: 20,
    paddingBottom: 3,
  },

  sensorValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 28,
  },

  sensorUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  sensorBarTrack: {
    height: 10,
    borderRadius: 30,
    backgroundColor: '#E8F5EC',
    overflow: 'hidden',
  },

  sensorBarFill: {
    height: '100%',
    borderRadius: 30,
  },

  chartsSection: {
  marginTop: 14,
},

sectionTitle: {
  fontSize: 18,
  color: '#15251D',
  fontWeight: '900',
},

sectionSubText: {
  marginTop: 4,
  marginBottom: 10,
  fontSize: 12,
  color: '#8A9B92',
  fontWeight: '600',
},

});