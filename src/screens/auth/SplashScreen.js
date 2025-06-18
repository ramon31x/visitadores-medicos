// src/screens/auth/SplashScreen.js - ACTUALIZADO
import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loading } from '../../components/ui';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores';

const SplashScreen = ({ navigation }) => {
  const theme = useTheme();


  useEffect(() => {
    console.log('📱 SplashScreen cargado');
  }, []);
  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary[500],
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[12],
    },
    logoContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    logoCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.text.inverse,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing[8],
      ...theme.shadows.xl,
    },
    logoIcon: {
      fontSize: 48,
      textAlign: 'center',
    },
    appName: {
      ...theme.typography.styles.h1,
      color: theme.colors.text.inverse,
      textAlign: 'center',
      marginBottom: theme.spacing[3],
      fontWeight: 'bold',
    },
    tagline: {
      ...theme.typography.styles.bodyLarge,
      color: theme.colors.primary[100],
      textAlign: 'center',
      maxWidth: 280,
    },
    loadingContainer: {
      marginBottom: theme.spacing[8],
    },
    footer: {
      alignItems: 'center',
    },
    footerText: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.primary[200],
      textAlign: 'center',
      marginBottom: theme.spacing[2],
    },
    versionText: {
      ...theme.typography.styles.caption,
      color: theme.colors.primary[300],
      fontSize: 11,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={theme.colors.primary[500]} 
      />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🏥</Text>
          </View>
          <Text style={styles.appName}>Visitadores Médicos</Text>
          <Text style={styles.tagline}>Sistema de Gestión Médica</Text>
        </View>

        <View style={styles.loadingContainer}>
          <Loading 
            size="large" 
            color={theme.colors.text.inverse}
            text="Cargando aplicación..."
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Profesional • Seguro • Confiable
          </Text>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;