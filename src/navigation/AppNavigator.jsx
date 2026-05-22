import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login_1';
import Login_2 from '../screens/Login_2';
import Signup from '../screens/Signup';
import Main from '../screens/Main';
import PlantRegister from '../screens/PlantRegister';
import FindPassword from '../screens/FindPassword';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login_1" component={Login} />
        <Stack.Screen name="Login_2" component={Login_2} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="PlantRegister" component={PlantRegister} />
        <Stack.Screen name="FindPassword" component={FindPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}