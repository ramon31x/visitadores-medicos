// src/navigation/RootNavigator.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stores
import { useAuthStore } from '../stores';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Components
import { Loading } from '../components/ui';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, isLoading, isInitialized, initializeAuth } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicializar autenticación desde storage
        await initializeAuth();
      } catch (error) {
        console.log('Error initializing auth:', error);
      }
    };

    initializeApp();
  }, [initializeAuth]);

  // Mostrar loading mientras se inicializa la app
  if (!isInitialized || isLoading) {
    return (
      <Loading.Overlay 
        visible={true} 
        text="Inicializando aplicación..." 
      />
    );
  }

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
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;