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
    alignItems: 'center',
  },

  /* 진행바 */
  progressWrap: {
    flexDirection: 'row',
    marginBottom: 40,
    gap: 8,
    width: '100%',
  },

  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#E6E6E6',
  },

  progressBarActive: {
    backgroundColor: '#7fc77c',
  },

  /* STEP 1 — 펄스 스캔 */
  scanWrap: {
    alignItems: 'center',
    marginTop: 40,
    height: 200,
    justifyContent: 'center',
  },

  pulseOuter: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },

  pulseMiddle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  pulseInner: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#7fc77c',
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  iotIcon: {
    width: 36,
    height: 36,
  },

  title_1: {
    marginTop: 30,
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },

  /* 공통 */
  title: {
    marginTop: 20,
    fontSize: 26,
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

  /* STEP 0 — 전체화면 QR 카메라 오버레이 */
  qrTopOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingBottom: 12,
  },

  progressWrapOverlay: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 4,
  },

  progressBarOverlay: {
    flex: 1,
    height: 3,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  progressBarOverlayActive: {
    backgroundColor: '#7fc77c',
  },

  /* 스캔 가이드 프레임 (모서리) */
  qrFrameWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrCorner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#7fc77c',
    borderWidth: 3,
  },

  qrCornerTL: {
    top: '28%',
    left: '14%',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
  },

  qrCornerTR: {
    top: '28%',
    right: '14%',
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 4,
  },

  qrCornerBL: {
    bottom: '28%',
    left: '14%',
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
  },

  qrCornerBR: {
    bottom: '28%',
    right: '14%',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 4,
  },

  qrBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingTop: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },

  qrTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },

  qrHint: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 20,
  },

  /* STEP 2 — 기기 발견 */
  deviceWrap: {
    alignItems: 'center',
    width: '100%',
  },

  deviceIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#7fc77c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#F6FFF9',
  },

  partyIcon: {
    fontSize: 30,
  },

  deviceCard: {
    marginTop: 28,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },

  deviceCardSelected: {
    borderColor: '#7fc77c',
    backgroundColor: '#F6FFF9',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  deviceIp: {
    marginTop: 3,
    fontSize: 12,
    color: '#999',
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#7fc77c',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7fc77c',
  },

  /* STEP 3 — Wi-Fi 입력 */
  wifiWrap: {
    alignItems: 'center',
    width: '100%',
  },

  wifiIcon: {
    fontSize: 30,
  },

  subtitle_3: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    textAlign: 'center',
  },

  macBadge: {
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },

  macText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },

  noticeBox: {
    width: '100%',
    marginTop: 14,
    backgroundColor: '#FFFBEF',
    borderWidth: 1,
    borderColor: '#F2DE99',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },

  noticeIcon: {
    fontSize: 13,
    marginTop: 1,
  },

  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#8A7D4F',
    lineHeight: 18,
  },

  /* STEP 3 — 연결 중 로딩 */
  loadingWrap: {
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },

  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#7fc77c',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FFF9',
  },

  loadingText: {
    marginTop: 20,
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },

  /* STEP 4 — 완료 */
  doneWrap: {
    alignItems: 'center',
    width: '100%',
  },

  doneCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#7fc77c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#F6FFF9',
  },

  doneIcon: {
    fontSize: 34,
    color: '#7fc77c',
    fontWeight: '700',
  },

  summaryCard: {
    width: '100%',
    marginTop: 28,
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

  /* 로딩 중 센터 */
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
