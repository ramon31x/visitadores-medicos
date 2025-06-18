// src/screens/dashboard/DashboardScreen.js - ACTUALIZADO
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Loading } from '../../components/ui';
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
    sectionTitle: {
      ...theme.typography.styles.h3,
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
      ...theme.typography.styles.h2,
      color: theme.colors.primary[500],
      fontWeight: 'bold',
      marginBottom: theme.spacing[2],
    },
    statLabel: {
      ...theme.typography.styles.caption,
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
      ...theme.typography.styles.body,
      color: theme.colors.text.primary,
      flex: 1,
    },
    activityTime: {
      ...theme.typography.styles.caption,
      color: theme.colors.text.tertiary,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Dashboard"
        subtitle={`Bienvenido, ${user?.name || 'Visitador'}`}
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