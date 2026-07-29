import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function PrimaryButton({ title, onPress }) {
	return (
        <View style={styles.container}>
		<TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
	button: {
    backgroundColor: '#7fc77c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 20,
	},
	text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
	},  
});