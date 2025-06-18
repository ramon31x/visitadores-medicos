// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Alert,
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Card } from '../../components/ui';
import { theme } from '../../theme';
import { useAuthStore } from '../../stores/authStore';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuthStore();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error cuando usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 3) {
      newErrors.password = 'La contraseña debe tener al menos 3 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const success = await login(formData.username, formData.password);
      
      if (success) {
        // El navigation se maneja automáticamente por el RootNavigator
        // cuando el estado de auth cambia
      } else {
        Alert.alert(
          'Error de Login',
          'Usuario o contraseña incorrectos. Intenta nuevamente.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Ocurrió un error inesperado. Verifica tu conexión.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setFormData({
      username: 'visitador1',
      password: '123456'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface.primary} />
      
      <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding">
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>🏥</Text>
            </View>
            <Text style={styles.title}>Visitadores Médicos</Text>
            <Text style={styles.subtitle}>
              Inicia sesión para gestionar tus visitas médicas
            </Text>
          </View>

          {/* Login Form */}
          <Card variant="elevated" padding="lg" style={styles.formCard}>
            <Text style={styles.formTitle}>Iniciar Sesión</Text>
            
            <Input
              label="Usuario"
              placeholder="Ingresa tu usuario"
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              error={errors.username}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <View style={styles.buttonContainer}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.loginButton}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

              {/* Test Credentials Button - Solo para desarrollo */}
              <Button
                variant="ghost"
                size="md"
                onPress={fillTestCredentials}
                disabled={loading}
                style={styles.testButton}
              >
                Usar credenciales de prueba
              </Button>
            </View>
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Sistema de gestión médica profesional
            </Text>
            <Text style={styles.versionText}>
              v1.0.0
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.secondary,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[8],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[10],
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
    ...theme.shadows.lg,
  },
  logoIcon: {
    fontSize: 36,
    textAlign: 'center',
  },
  title: {
    ...theme.typography.styles.h1,
    textAlign: 'center',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
  },
  subtitle: {
    ...theme.typography.styles.body,
    textAlign: 'center',
    color: theme.colors.text.secondary,
    maxWidth: 280,
    lineHeight: 22,
  },
  formCard: {
    marginBottom: theme.spacing[8],
  },
  formTitle: {
    ...theme.typography.styles.h3,
    textAlign: 'center',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[6],
  },
  buttonContainer: {
    marginTop: theme.spacing[4],
  },
  loginButton: {
    marginBottom: theme.spacing[4],
  },
  testButton: {
    alignSelf: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing[6],
  },
  footerText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  },
  versionText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.disabled,
    fontSize: 11,
  },
};

export default LoginScreen;