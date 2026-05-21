import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { PlantsProvider } from './src/context/PlantsContext';

export default function App() {
  return (
    <PlantsProvider>
      <AppNavigator />
    </PlantsProvider>
  );
}