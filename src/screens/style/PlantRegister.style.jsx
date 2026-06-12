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

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 8,
    paddingLeft: 8,
  },

  dateText: {
    fontSize: 15,
    color: '#222',
  },

dateArrowIcon: {
  width: 24,
  height: 24,
},

  ageWrap: {
    width: 95,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
    paddingBottom: 1,
  },

  ageInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 8,
    paddingLeft: 8,
    fontSize: 15,
    color: '#222',
    marginRight: 4,
    textAlign: 'center',
  },

  ageText: {
    fontSize: 15,
    color: '#222',
    marginTop: 2,
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

  personalityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  personalityBtn: {
    borderWidth: 1,
    borderColor: '#5CD79E',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },

  personalityBtnSelected: {
    backgroundColor: '#99DDAA',
    borderColor: '#99DDAA',
  },

  personalityText: {
    color: '#5CD79E',
    fontWeight: '500',
    fontSize: 14,
  },

  personalityTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },

  inputUnderPersonality: {
    marginTop: 12,
  },
  aiGuide: {
  marginTop: 10,
  fontSize: 13,
  color: '#5CD79E',
},

analyzeButton: {
  marginTop: 14,
  borderWidth: 1,
  borderColor: '#5CD79E',
  borderRadius: 12,
  paddingVertical: 14,
  alignItems: 'center',
},

analyzeButtonText: {
  color: '#5CD79E',
  fontSize: 15,
  fontWeight: '600',
},

aiResultCard: {
  marginTop: 14,
  backgroundColor: '#F7FCF8',
  borderRadius: 14,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderWidth: 1,
  borderColor: '#DDF3E4',
},

aiResultTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

aiResultTitle: {
  fontSize: 15,
  fontWeight: '600',
  color: '#2E7D57',
},

aiRetry: {
  fontSize: 13,
  color: '#777777',
  fontWeight: '600',
  transform: [{ translateY: 12 }],
},

aiResultDesc: {
  marginTop: 6,
  fontSize: 13,
  color: '#7BA892',
}

 ,
 suggestionList: {
   marginTop: 6,
   backgroundColor: '#fff',
   borderWidth: 1,
   borderColor: '#e6e6e6',
   borderRadius: 8,
   overflow: 'hidden',
   maxHeight: 200,
 },

 suggestionItem: {
   paddingVertical: 10,
   paddingHorizontal: 12,
   borderBottomWidth: 1,
   borderBottomColor: '#f1f1f1',
 },

 suggestionText: {
   fontSize: 15,
   color: '#333',
 },

characterTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#222',
},

characterSub: {
  fontSize: 13,
  color: '#888',
  marginTop: 4,
  marginBottom: 12,
},

characterSelector: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

arrowButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: '#F3F7F3',
  alignItems: 'center',
  justifyContent: 'center',
},

arrowText: {
  fontSize: 18,
  color: '#444',
  fontWeight: '500',
},

characterImage: {
  width: 140,
  height: 140,
  resizeMode: 'contain',
},

characterCount: {
  textAlign: 'center',
  marginTop: 8,
  fontSize: 15,
  fontWeight: '600',
  color: '#333',
},

dotContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 10,
},

dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#D9D9D9',
  marginHorizontal: 4,
},

activeDot: {
  backgroundColor: '#99DDAA',
},

});