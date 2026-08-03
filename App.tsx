import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { PlantsProvider } from './src/context/PlantsContext';
import { BoardProvider } from './src/context/BoardContext';
import { PlantDiaryProvider } from './src/context/PlantDiaryContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PlantsProvider>
				<BoardProvider>
					<PlantDiaryProvider>
						<AppNavigator />
					</PlantDiaryProvider>
				</BoardProvider>
			</PlantsProvider>
		</GestureHandlerRootView>
	);
}