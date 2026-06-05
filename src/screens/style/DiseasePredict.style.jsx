import { StyleSheet } from 'react-native';

export default StyleSheet.create({

background: {
flex: 1,
backgroundColor: '#fafafa',
},

container: {
backgroundColor: '#fff',
paddingBottom: 120,
minHeight: '100%',
},

labelMain: {
fontSize: 16,
color: '#222',
fontWeight: '500',
marginTop: 16,
marginBottom: 24,
marginLeft: 16,
},

row: {
flexDirection: 'row',
alignItems: 'flex-start',
marginBottom: 22,
paddingHorizontal: 16,
},

label: {
width: 70,
color: '#b0b0b0',
textAlign: 'center',
fontSize: 15,
paddingRight: 16,
paddingTop: 8,
},

contentWrap: {
flex: 1,
},

imageBox: {
height: 100,
borderWidth: 1,
borderColor: '#d7e7d7',
borderStyle: 'dashed',
borderRadius: 10,
backgroundColor: '#f8fcf8',
alignItems: 'center',
justifyContent: 'center',
},

imageIcon: {
width: 42,
height: 42,
opacity: 0.3,
},

selectedImage: {
width: '100%',
height: 220,
borderRadius: 12,
resizeMode: 'cover',
},

input: {
borderBottomWidth: 1,
borderColor: '#e0e0e0',
borderWidth: 0,
fontSize: 15,
paddingVertical: 8,
paddingLeft: 8,
color: '#222',
backgroundColor: 'transparent',
alignSelf: 'flex-start',
width: '98%',
},

});
