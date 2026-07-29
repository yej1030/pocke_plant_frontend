import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { PlantsProvider } from './src/context/PlantsContext';
import { BoardProvider } from './src/context/BoardContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PlantsProvider>
				<BoardProvider>
					<AppNavigator />
				</BoardProvider>
			</PlantsProvider>
		</GestureHandlerRootView>
	);
}