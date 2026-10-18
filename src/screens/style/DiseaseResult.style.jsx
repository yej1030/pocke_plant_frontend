import { StyleSheet } from 'react-native';

export default StyleSheet.create({

background: {
flex: 1,
backgroundColor: '#F8FAFC',
},

container: {
backgroundColor: '#FFFFFF',
padding: 20,
paddingBottom: 120,
flexGrow: 1,
},

scroll: {
  flex: 1,
},

image: {
width: '100%',
height: 160,
borderRadius: 8,
resizeMode: 'contain',
backgroundColor: '#F8FAFC',
marginBottom: 16,
},

noImage: {
width: '100%',
height: 300,
backgroundColor: '#E5E7EB',
borderRadius: 8,
marginBottom: 16,
justifyContent: 'center',
alignItems: 'center',
},

headerText: {
fontWeight: '700',
marginBottom: 12,
fontSize: 16,
color: '#1F2937',
},

sectionLabel: {
color: '#52645C',
fontSize: 13,
marginBottom: 6,
},

diseaseTitle: {
color: '#183B2A',
fontSize: 22,
fontWeight: '700',
lineHeight: 30,
marginBottom: 12,
},

guidanceCard: {
backgroundColor: '#F2F6F3',
padding: 16,
borderRadius: 12,
marginBottom: 12,
},

actionCard: {
backgroundColor: '#E9F5EA',
padding: 16,
borderRadius: 12,
marginBottom: 16,
},

resultStatus: {
fontSize: 12,
color: '#64748B',
marginTop: 12,
},

resultRow: {
marginBottom: 18,
},

resultHeader: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 6,
},

resultLabel: {
color: '#1F2937',
fontSize: 14,
fontWeight: '600',
},

resultPercent: {
color: '#B85A5A',
fontSize: 12,
fontWeight: '500',
},

barTrack: {
height: 10,
backgroundColor: '#f2dede',
borderRadius: 6,
overflow: 'hidden',
},

barFill: {
height: '100%',
backgroundColor: '#b85a5a',
},

divider: {
height: 1,
backgroundColor: '#E5E7EB',
marginTop: 4,
marginBottom: 12,
},

tipCard: {
paddingVertical: 2,
},

tipText: {
color: '#475569',
fontSize: 14,
lineHeight: 22,
},


});
