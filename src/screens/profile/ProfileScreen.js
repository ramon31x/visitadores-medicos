// src/screens/profile/ProfileScreen.js - DETALLADO CON DATOS REALES
import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../../components/ui';
import { Header } from '../../components/layout';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      '¿Cerrar Sesión?',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  // 🎯 Formatear información del usuario
  const getUserDetails = () => {
    if (!user) return null;
    
    const initials = user.nombre_completo 
      ? user.nombre_completo.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : 'U';
    
    // Formatear fecha de inicio
    const formatDate = (dateString) => {
      if (!dateString) return 'No disponible';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return {
      initials,
      name: user.nombre_completo || 'Usuario',
      username: user.username || 'Sin username',
      phone: user.telefono || 'No disponible',
      startDate: formatDate(user.fecha_inicio),
      routeInfo: user.ruta || null
    };
  };

  const userDetails = getUserDetails();

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
    
    // 👤 Profile Header
    profileHeader: {
      alignItems: 'center',
      marginBottom: theme.spacing[8],
    },
    avatarContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.primary[500],
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing[6],
      ...theme.shadows.lg,
    },
    avatarText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.colors.text.inverse,
    },
    profileName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: theme.spacing[2],
    },
    profileUsername: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    
    // 📋 Info Cards
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[4],
      marginTop: theme.spacing[2],
    },
    infoCard: {
      marginBottom: theme.spacing[4],
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    infoLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text.secondary,
      flex: 1,
    },
    infoValue: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 2,
      textAlign: 'right',
    },
    
    // 🗺️ Route Card
    routeCard: {
      marginBottom: theme.spacing[6],
    },
    routeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing[4],
    },
    routeName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary[600],
      marginLeft: theme.spacing[2],
    },
    routeDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      lineHeight: 20,
      marginBottom: theme.spacing[3],
    },
    routeStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: theme.spacing[2],
    },
    statusText: {
      fontSize: 14,
      fontWeight: '500',
    },
    
    // 🔧 Actions
    actionsContainer: {
      marginTop: theme.spacing[4],
    },
    actionButton: {
      marginBottom: theme.spacing[3],
    },
    logoutButton: {
      marginTop: theme.spacing[6],
    },
    
    // 📱 App Info
    appInfoCard: {
      marginTop: theme.spacing[4],
      marginBottom: theme.spacing[6],
    },
    appInfoText: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
      textAlign: 'center',
      lineHeight: 18,
    },
  };

  if (!userDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Mi Perfil" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.text.secondary }}>
            Cargando información del usuario...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Mi Perfil"
        subtitle="Información personal"
      />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 👤 Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userDetails.initials}</Text>
          </View>
          <Text style={styles.profileName}>{userDetails.name}</Text>
          <Text style={styles.profileUsername}>@{userDetails.username}</Text>
        </View>

        {/* 📋 Información Personal */}
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <Card variant="default" padding="lg" style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Nombre Completo</Text>
            <Text style={styles.infoValue}>{userDetails.name}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📧 Usuario</Text>
            <Text style={styles.infoValue}>{userDetails.username}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📞 Teléfono</Text>
            <Text style={styles.infoValue}>{userDetails.phone}</Text>
          </View>
          
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>📅 Fecha de Inicio</Text>
            <Text style={styles.infoValue}>{userDetails.startDate}</Text>
          </View>
        </Card>

        {/* 🗺️ Información de Ruta */}
        {userDetails.routeInfo && (
          <>
            <Text style={styles.sectionTitle}>Mi Ruta Asignada</Text>
            <Card variant="elevated" padding="lg" style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <Text style={{ fontSize: 20 }}>🗺️</Text>
                <Text style={styles.routeName}>{userDetails.routeInfo.nombre}</Text>
              </View>
              
              <Text style={styles.routeDescription}>
                {userDetails.routeInfo.descripcion}
              </Text>
              
              <View style={styles.routeStatus}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: userDetails.routeInfo.activa ? theme.colors.secondary[500] : theme.colors.status.error }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: userDetails.routeInfo.activa ? theme.colors.secondary[600] : theme.colors.status.error }
                ]}>
                  {userDetails.routeInfo.activa ? 'Ruta Activa' : 'Ruta Inactiva'}
                </Text>
              </View>
            </Card>
          </>
        )}

        {/* ⚙️ Acciones */}
       {/*  <Text style={styles.sectionTitle}>Configuración</Text>
        <Card variant="default" padding="lg" style={styles.actionsContainer}>
          <Button
            variant="outline"
            size="lg"
            onPress={() => Alert.alert('Próximamente', 'Función en desarrollo')}
            style={styles.actionButton}
          >
            ⚙️ Configuraciones
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onPress={() => Alert.alert('Próximamente', 'Función en desarrollo')}
            style={styles.actionButton}
          >
            📊 Mis Estadísticas
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onPress={() => Alert.alert('Próximamente', 'Función en desarrollo')}
            style={styles.actionButton}
          >
            📱 Acerca de la App
          </Button>
        </Card>
 */}
        {/* 🚪 Logout */}
        <Button
          variant="danger"
          size="lg"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          🚪 Cerrar Sesión
        </Button>

        {/* 📱 App Info */}
       {/*  <Card variant="ghost" padding="md" style={styles.appInfoCard}>
          <Text style={styles.appInfoText}>
            Visitadores Médicos v1.0.0{'\n'}
            Sistema de gestión médica profesional{'\n'}
            Desarrollado para optimizar tu trabajo diario
          </Text>
        </Card> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;