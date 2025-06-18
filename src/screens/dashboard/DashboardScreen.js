// src/screens/dashboard/DashboardScreen.js
import React, { useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Card, Button, Loading } from '../../components/ui';
import { Header } from '../../components/layout';

// Stores
import { useAuthStore } from '../../stores';

// Theme
import { colors, typography, spacing } from '../../theme';

const DashboardScreen = ({ navigation }) => {
  const { user, logout, getUserName, getRouteName } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header.Main 
        title="Dashboard"
        subtitle={`Bienvenido, ${getUserName()}`}
        onMenuPress={() => {}}
        onNotificationPress={() => {}}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Usuario Info */}
        <Card style={styles.userCard} padding="large">
          <Text style={styles.welcomeText}>
            ¡Hola, {getUserName()}! 👋
          </Text>
          <Text style={styles.userInfo}>
            Ruta: {getRouteName() || 'Sin asignar'}
          </Text>
          <Text style={styles.userInfo}>
            Usuario: {user?.username}
          </Text>
        </Card>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard} padding="medium">
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Visitas este mes</Text>
          </Card>
          
          <Card style={styles.statCard} padding="medium">
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Médicos activos</Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard} padding="medium">
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Formularios</Text>
          </Card>
          
          <Card style={styles.statCard} padding="medium">
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Efectividad</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard} padding="large">
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <View style={styles.actionsList}>
            <Button
              title="📅 Ver Planificación"
              variant="outline"
              onPress={() => navigation.navigate('Planning')}
              style={styles.actionButton}
            />
            
            <Button
              title="👨‍⚕️ Lista de Médicos"
              variant="outline"
              onPress={() => navigation.navigate('Doctors')}
              style={styles.actionButton}
            />
            
            <Button
              title="🏥 Mis Visitas"
              variant="outline"
              onPress={() => navigation.navigate('Visits')}
              style={styles.actionButton}
            />
          </View>
        </Card>

        {/* Debug/Test Section */}
        <Card style={styles.debugCard} variant="filled" padding="large">
          <Text style={styles.debugTitle}>🛠️ Funciones de Prueba</Text>
          
          <Button
            title="Cerrar Sesión"
            variant="danger"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </Card>
      </ScrollView>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  
  userCard: {
    marginBottom: spacing.lg,
  },
  
  welcomeText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  
  userInfo: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  
  statLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  actionsCard: {
    marginVertical: spacing.lg,
  },
  
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  
  actionsList: {
    gap: spacing.sm,
  },
  
  actionButton: {
    marginBottom: spacing.xs,
  },
  
  debugCard: {
    marginTop: spacing.lg,
  },
  
  debugTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  
  logoutButton: {
    marginTop: spacing.sm,
  },
};

export default DashboardScreen;