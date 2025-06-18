// src/navigation/RootNavigator.js - VERSIÓN CON DEBUG
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '../stores';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { Loading } from '../components/ui';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  
  // 🔍 USAR SELECTORES ESPECÍFICOS
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isInitialized = useAuthStore(state => state.isInitialized);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Inicializando app...');
        await initializeAuth();
        console.log('✅ App inicializada');
        console.log('🔍 isAuthenticated:', isAuthenticated);
        console.log('🔍 isInitialized:', isInitialized);
        console.log('🔍 user:', user);
        setIsAppReady(true);
      } catch (error) {
        console.error('❌ Error inicializando app:', error);
        setIsAppReady(true);
      }
    };

    initializeApp();
  }, []);

  // 🔍 DEBUG: Log cada vez que cambie el estado
  useEffect(() => {
    console.log('🔄 Estado auth cambió:', {
      isAppReady,
      isAuthenticated,
      isInitialized,
      hasUser: !!user
    });
  }, [isAppReady, isAuthenticated, isInitialized, user]);

  // Mostrar loading mientras se inicializa
  if (!isAppReady) {
    console.log('⏳ Mostrando loading...');
    return (
      <Loading 
        overlay={true}
        text="Inicializando aplicación..." 
      />
    );
  }

  console.log('🗺️ Renderizando navegación:', isAuthenticated ? 'Main' : 'Auth');

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen 
            name="Main" 
            component={MainNavigator}
          />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;