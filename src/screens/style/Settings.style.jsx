import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 40,
  },

  profileSection: {
    marginBottom: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginLeft: 8,
  },

  email: {
    marginTop: 2,
    fontSize: 15,
    color: '#8b8b8b',
    marginLeft: 8,
  },

  groupTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
    marginLeft: 8,
  },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#ececec',
  },

  menuText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },

  subText: {
    marginTop: 2,
    fontSize: 13,
    color: '#999',
  },

  arrow: {
    fontSize: 16,
    color: '#999',
  },

  logoutButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#d87b7b',
    borderRadius: 8,
    backgroundColor: '#fff4f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#c25555',
    fontSize: 18,
    fontWeight: '700',
  },

  deleteButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#d87b7b',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  deleteText: {
    color: '#c25555',
    fontSize: 18,
    fontWeight: '700',
  },

});