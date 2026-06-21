import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { PlantsProvider } from './src/context/PlantsContext';

import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PlantsProvider>
        <AppNavigator />
      </PlantsProvider>
    </GestureHandlerRootView>
  );
}