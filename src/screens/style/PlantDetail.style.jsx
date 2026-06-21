import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const CARD_WIDTH =
  (Dimensions.get('window').width - 50) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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

  heroBlobTopRight: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#5CD79E',
    opacity: 0.15,
  },

  heroBlobBottomLeft: {
    position: 'absolute',
    bottom: -50,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ffbd16',
    opacity: 0.12,
  },

  speechBubble: {
    minWidth: 130,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D8E6DE',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },

  speechText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },

  heroImage: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
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
    borderColor: '#E0EEE6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
  },

  quickReplyText: {
    fontSize: 12,
    color: '#000000',
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
    borderColor: '#5CD79E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  actionText: {
    fontSize: 15,
    color: '#1d8a55',
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
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0EEE6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  summaryTitle: {
    fontSize: 16,
    color: '#30443A',
    fontWeight: '800',
  },

  summarySubText: {
    marginTop: 4,
    fontSize: 12,
    color: '#8ea798',
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
    width: CARD_WIDTH,
    minHeight: 124,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4EFE8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    marginTop: 4,
    fontSize: 22,
    color: '#15251D',
    fontWeight: '900',
    textAlign: 'left',
  },

  miniSensorUnit: {
    fontSize: 13,
    color: '#53645B',
    fontWeight: '700',
  },

  miniSensorTarget: {
    marginTop: 4,
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
    marginTop: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
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
    fontSize: 16,
    color: '#30443A',
    fontWeight: '700',
  },

  chartSubText: {
    marginTop: 4,
    fontSize: 12,
    color: '#8ea798',
    fontWeight: '500',
  },

  chartCurrentValue: {
    fontSize: 22,
    color: '#15251D',
    fontWeight: '900',
  },

  chartCurrentUnit: {
    fontSize: 12,
    color: '#6D7D74',
    fontWeight: '600',
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
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 10,
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
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#5CD79E',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#5CD79E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  waterIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  waterText: {
    fontSize: 15,
    color: '#1d8a55',
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

  chartsSection: {
    marginTop: 14,
  },

  sectionTitle: {
    paddingLeft: 6,
    fontSize: 16,
    color: '#30443A',
    fontWeight: '800',
  },

  sectionSubText: {
    marginTop: 2,
    paddingLeft: 6,
    fontSize: 12,
    color: '#8ea798',
    fontWeight: '500',
  },

});