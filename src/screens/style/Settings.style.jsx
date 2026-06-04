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
    marginBottom: 28,
  },

  name: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
  },

  email: {
    marginTop: 6,
    fontSize: 15,
    color: '#8b8b8b',
  },

  groupTitle: {
    fontSize: 15,
    color: '#999',
    marginBottom: 8,
    marginLeft: 4,
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
    paddingVertical: 18,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
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
    marginTop: 4,
    fontSize: 13,
    color: '#999',
  },

  arrow: {
    fontSize: 16,
    color: '#999',
  },

  logoutButton: {
    height: 70,
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
    height: 70,
    borderWidth: 1,
    borderColor: '#d87b7b',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  deleteText: {
    color: '#c25555',
    fontSize: 18,
    fontWeight: '700',
  },

});