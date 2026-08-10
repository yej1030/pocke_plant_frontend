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
height: 300,
borderRadius: 8,
resizeMode: 'cover',
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
color: '#9CA3AF',
fontSize: 12,
lineHeight: 18,
},


});
