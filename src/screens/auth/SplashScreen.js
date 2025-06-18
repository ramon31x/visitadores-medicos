// src/screens/auth/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../../components/ui';
import { colors, typography, spacing } from '../../theme';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Logo o icono de la app */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🏥</Text>
          <Text style={styles.logoText}>VisitaMed</Text>
          <Text style={styles.subtitle}>Sistema de Visitadores Médicos</Text>
        </View>
        
        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <Loading size="large" color={colors.white} />
          <Text style={styles.loadingText}>Inicializando aplicación...</Text>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  
  logoIcon: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  
  logoText: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  
  loadingContainer: {
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: '#FFFFFF',
    marginTop: spacing.md,
    opacity: 0.8,
  },
  
  footer: {
    paddingBottom: spacing.xl,
  },
  
  footerText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: '#FFFFFF',
    opacity: 0.7,
  },
};

export default SplashScreen;