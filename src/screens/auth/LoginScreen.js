// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Button, Input, Card, Loading } from '../../components/ui';
import { Header } from '../../components/layout';

// Stores
import { useAuthStore } from '../../stores';

// Theme
import { colors, typography, spacing } from '../../theme';

const LoginScreen = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: 'visitador1', // Pre-filled para testing
    password: '123456',     // Pre-filled para testing
  });
  
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'El usuario es requerido';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    // Limpiar error anterior
    clearError();
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }
    
    try {
      const result = await login(formData);
      
      if (!result.success) {
        Alert.alert(
          'Error de autenticación',
          result.error || 'Credenciales incorrectas',
          [{ text: 'OK' }]
        );
      }
      // Si es exitoso, el RootNavigator se encargará de la navegación
    } catch (error) {
      Alert.alert(
        'Error',
        'Ocurrió un error inesperado. Intenta de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Header.Auth title="Iniciar Sesión" />
      
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logoIcon}>🏥</Text>
            <Text style={styles.logoText}>VisitaMed</Text>
            <Text style={styles.welcomeText}>
              Bienvenido de vuelta
            </Text>
          </View>
          
          {/* Login Form */}
          <Card style={styles.formCard} padding="large">
            <View style={styles.form}>
              <Input
                label="Usuario"
                placeholder="Ingresa tu usuario"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                error={formErrors.username}
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Text style={styles.inputIcon}>👤</Text>}
              />
              
              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                error={formErrors.password}
                secureTextEntry
                leftIcon={<Text style={styles.inputIcon}>🔒</Text>}
              />
              
              {error && (
                <Text style={styles.errorText}>
                  {error}
                </Text>
              )}
              
              <Button
                title={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
                fullWidth
              />
            </View>
          </Card>
          
          {/* Demo Credentials Info */}
          <Card style={styles.demoCard} variant="filled" padding="medium">
            <Text style={styles.demoTitle}>🧪 Credenciales de prueba:</Text>
            <Text style={styles.demoText}>
              <Text style={styles.demoLabel}>Usuario:</Text> visitador1{'\n'}
              <Text style={styles.demoLabel}>Contraseña:</Text> 123456
            </Text>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  content: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  
  logoIcon: {
    fontSize: 60,
    marginBottom: spacing.md,
  },
  
  logoText: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  
  welcomeText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  formCard: {
    marginBottom: spacing.xl,
  },
  
  form: {
    gap: spacing.md,
  },
  
  inputIcon: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  
  loginButton: {
    marginTop: spacing.lg,
  },
  
  errorText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    textAlign: 'center',
    backgroundColor: colors.error + '10',
    padding: spacing.sm,
    borderRadius: 8,
  },
  
  demoCard: {
    marginTop: spacing.lg,
  },
  
  demoTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  
  demoText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  
  demoLabel: {
    fontWeight: '600',
    color: colors.text.primary,
  },
};

export default LoginScreen;