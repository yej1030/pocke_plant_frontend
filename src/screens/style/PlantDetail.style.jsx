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

  // ── 히어로 카드 ─────────────────────────────────────
  heroCard: {
    marginTop: 10,
    paddingTop: 30,
    paddingVertical: 16,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#e4ece7',
    backgroundColor: '#f9fffc',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#5CD79E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  // 배경 장식 블롭
  heroBlobTopRight: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#5CD79E',
    opacity: 0.16,
  },
  heroBlobBottomLeft: {
    position: 'absolute',
    bottom: -50,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFD66B',
    opacity: 0.14,
  },

  // ── 말풍선 ──────────────────────────────────────────
  speechBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#cfe6da',
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  speechText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '600',
  },

  heroImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },

  // ── 빠른 질문 버튼 ──────────────────────────────────
  quickReplyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 10,
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
    fontSize: 12.5,
    color: '#1d1d1d',
    fontWeight: '600',
  },

  // ── 액션 버튼 행 ────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    width: '48%',
    height: 45,
    borderRadius: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#79d791',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  actionText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  actionPrimary: {
    backgroundColor: '#79d791',
    borderColor: '#79d791',
  },
  actionPrimaryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },

  // ── 하드웨어 버튼 ────────────────────────────────────
  hardwareButton: {
    marginTop: 20,
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

  // ── 센서 카드 ────────────────────────────────────────
  statsList: {
    marginTop: 20,
    gap: 10,
  },
  sensorCard: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
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
    color: '#1a1a1a',
  },
  sensorRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  sensorTarget: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
    paddingRight: 20,
    paddingBottom: 3,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 28,
  },
  sensorUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
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

  // ── 물주기 버튼 ──────────────────────────────────────
  waterButton: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#79d791',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#79d791',
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

  // ── 빈 상태 ──────────────────────────────────────────
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
});