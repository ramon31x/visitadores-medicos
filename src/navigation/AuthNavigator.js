// src/navigation/AuthNavigator.js - CORREGIDO
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens - SOLO IMPORTAR LOGIN
import { LoginScreen } from '../screens/auth';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login" // ✅ CAMBIO AQUÍ
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      {/* ❌ REMOVER SplashScreen completamente */}
      
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;