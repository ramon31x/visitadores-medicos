// src/screens/profile/ProfileScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../../components/ui';
import { Header } from '../../components/layout';
import { theme } from '../../theme';
import { useAuthStore } from '../../stores/authStore';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Mi Perfil"
        subtitle="Información personal"
      />
      <View style={styles.content}>
        <Card padding="lg" style={styles.card}>
          <Text style={styles.emoji}>👤</Text>
          <Text style={styles.title}>
            {user?.name || 'Usuario'}
          </Text>
          <Text style={styles.subtitle}>
            {user?.email || 'usuario@ejemplo.com'}
          </Text>
          <Text style={styles.description}>
            Pantalla en desarrollo.{'\n'}
            Próximamente: Edición de perfil, configuraciones y estadísticas personales.
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              variant="danger"
              size="lg"
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              🚪 Cerrar Sesión
            </Button>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1, 
    backgroundColor: theme.colors.surface.secondary
  },
  content: {
    flex: 1, 
    padding: theme.spacing[5], 
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 60, 
    marginBottom: theme.spacing[6]
  },
  title: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
    textAlign: 'center'
  },
  subtitle: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[6],
    textAlign: 'center'
  },
  description: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing[8]
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing[4]
  },
  logoutButton: {
    marginTop: theme.spacing[4]
  }
};

export default ProfileScreen;