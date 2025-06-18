// src/screens/dashboard/DashboardScreen.js - CON DATOS REALES
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../../components/ui';
import { Header } from '../../components/layout';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores';

const DashboardScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    todayVisits: 3,
    weeklyVisits: 18,
    monthlyVisits: 74,
    completedForms: 12
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      console.log('Cargando datos del dashboard...');
      // TODO: Conectar con API real para estadísticas
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const navigateToSection = (section) => {
    navigation.navigate(section);
  };

  // 🎯 Calcular información del usuario
  const getUserInfo = () => {
    if (!user) return { name: 'Visitador', route: 'Sin ruta', initials: 'V' };
    
    const name = user.nombre_completo || 'Visitador';
    const route = user.ruta?.nombre || 'Sin ruta asignada';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    return { name, route, initials };
  };

  const { name, route, initials } = getUserInfo();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.secondary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing[5],
      paddingVertical: theme.spacing[6],
    },
    
    // 🎨 User Info Card
    userCard: {
      marginBottom: theme.spacing[6],
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing[5],
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.primary[500],
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing[4],
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text.inverse,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    userRoute: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[1],
    },
    userPhone: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
    },
    
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[4],
    },
    statsContainer: {
      marginBottom: theme.spacing[8],
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statCard: {
      width: '48%',
      alignItems: 'center',
      paddingVertical: theme.spacing[6],
      marginBottom: theme.spacing[4],
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary[500],
      marginBottom: theme.spacing[2],
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    actionsContainer: {
      marginBottom: theme.spacing[8],
    },
    actionButton: {
      marginBottom: theme.spacing[3],
    },
    activityContainer: {
      marginBottom: theme.spacing[6],
    },
    activityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    activityText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 1,
    },
    activityTime: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Dashboard"
        subtitle="Bienvenido de vuelta"
        variant="default"
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 👤 User Info Card */}
        <Card variant="elevated" style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userRoute}>📍 {route}</Text>
            {user?.telefono && (
              <Text style={styles.userPhone}>📞 {user.telefono}</Text>
            )}
          </View>
        </Card>

        {/* 📊 Stats Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Resumen de Actividad</Text>
          
          <View style={styles.statsGrid}>
            <Card variant="elevated" style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.todayVisits}</Text>
              <Text style={styles.statLabel}>Visitas Hoy</Text>
            </Card>
            
            <Card variant="elevated" style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.weeklyVisits}</Text>
              <Text style={styles.statLabel}>Esta Semana</Text>
            </Card>
            
            <Card variant="elevated" style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.monthlyVisits}</Text>
              <Text style={styles.statLabel}>Este Mes</Text>
            </Card>
            
            <Card variant="elevated" style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.completedForms}</Text>
              <Text style={styles.statLabel}>Formularios</Text>
            </Card>
          </View>
        </View>

        {/* ⚡ Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <Card variant="default" padding="lg">
            <Button
              variant="primary"
              size="lg"
              onPress={() => navigateToSection('Planning')}
              style={styles.actionButton}
            >
              📅 Planificar Visitas
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onPress={() => navigateToSection('Doctors')}
              style={styles.actionButton}
            >
              👨‍⚕️ Lista de Médicos
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onPress={() => navigateToSection('Visits')}
              style={styles.actionButton}
            >
              🏥 Mis Visitas
            </Button>
          </Card>
        </View>

        {/* 📋 Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          
          <Card variant="default" padding="md">
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                ✅ Visita completada - Dr. García
              </Text>
              <Text style={styles.activityTime}>Hace 2 horas</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                📝 Formulario enviado - Hospital Central
              </Text>
              <Text style={styles.activityTime}>Ayer</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                📅 Plan semanal creado
              </Text>
              <Text style={styles.activityTime}>Hace 3 días</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;