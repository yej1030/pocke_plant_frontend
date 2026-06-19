import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  progressWrap: {
    flexDirection: 'row',
    marginBottom: 40,
    gap: 8,
  },

  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#E6E6E6',
  },

  progressBarActive: {
    backgroundColor: '#5CD79E',
  },

  /* STEP1 */

  scanWrap: {
    alignItems: 'center',
    marginTop: 40,
  },

  pulseOuter: {
    position: 'absolute',
    top: 0,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },

  pulseMiddle: {
    position: 'absolute',
    top: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  pulseInner: {
    position: 'absolute',
    top: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#5CD79E',
  },

  // ✅ marginTop 줄여서 아이콘 서클 안으로
  iconCircle: {
    marginTop: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  iotIcon: {
    width: 40,
    height: 40,
  },

  /* 공통 */

  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    textAlign: 'center',
  },

  /* STEP2 */

  deviceWrap: {
    alignItems: 'center',
  },

  deviceIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: '#5CD79E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  partyIcon: {
    fontSize: 30,
  },

  deviceCard: {
    marginTop: 35,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  deviceIcon: {
    width: 35,
    height: 35,
  },

  deviceInfo: {
    flex: 1,
    marginLeft: 12,
  },

  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  deviceIp: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },

radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#5CD79E',
    justifyContent: 'center', // ✅ 추가
    alignItems: 'center',     // ✅ 추가
},

  // ✅ 선택됐을 때 카드 테두리 색 변경
deviceCardSelected: {
    borderColor: '#5CD79E',
},

// ✅ 라디오 버튼 내부 점
radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5CD79E',
},

  /* STEP3 */

  wifiWrap: {
    alignItems: 'center',
  },

  wifiIcon: {
    fontSize: 30,
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 12,
    fontSize: 15,
    color: '#333',
  },

  noticeBox: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#FFFBEF',
    borderWidth: 1,
    borderColor: '#F2DE99',
    borderRadius: 10,
    padding: 12,
  },

  noticeText: {
    fontSize: 12,
    color: '#8A7D4F',
    lineHeight: 18,
  },

  /* STEP4 */

  doneWrap: {
    alignItems: 'center',
  },

  doneCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: '#5CD79E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  doneIcon: {
    fontSize: 34,
    color: '#5CD79E',
    fontWeight: '700',
  },

  summaryCard: {
    width: '100%',
    marginTop: 35,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    overflow: 'hidden',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },

  summaryRowLast: {
    borderBottomWidth: 0,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#999',
  },

  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});