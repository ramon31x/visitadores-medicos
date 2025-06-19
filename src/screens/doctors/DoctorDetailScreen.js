// src/screens/doctors/DoctorDetailScreen.js - COMPLETAMENTE MODERNIZADO
import React, { useEffect } from 'react';
import { View, Text, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Loading } from '../../components/ui';
import { Header } from '../../components/layout';
import { useTheme } from '../../theme/ThemeProvider';
import { useDoctorsStore } from '../../stores';

const DoctorDetailScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { doctorId, doctorName } = route.params;
  
  const {
    selectedDoctor,
    isLoading,
    error,
    loadDoctorDetail,
    clearSelectedDoctor,
    clearError,
    getDoctorById,
  } = useDoctorsStore();

  useEffect(() => {
    loadDoctorData();
    
    return () => {
      clearSelectedDoctor();
    };
  }, [doctorId]);

  const loadDoctorData = async () => {
    // Primero intentar obtener del caché
    const cachedDoctor = getDoctorById(doctorId);
    if (cachedDoctor) {
      console.log('👨‍⚕️ Usando médico del caché');
      return;
    }
    
    // Si no está en caché, cargar del API
    const result = await loadDoctorDetail(doctorId);
    if (!result.success && result.error) {
      Alert.alert('Error', result.error);
    }
  };

  const handleCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Error', 'No se puede realizar llamadas en este dispositivo');
        }
      })
      .catch((err) => {
        console.error('Error opening phone:', err);
        Alert.alert('Error', 'No se pudo abrir la aplicación de teléfono');
      });
  };

  const handleEmail = (email) => {
    const emailUrl = `mailto:${email}`;
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl);
        } else {
          Alert.alert('Error', 'No hay aplicación de email configurada');
        }
      })
      .catch((err) => {
        console.error('Error opening email:', err);
        Alert.alert('Error', 'No se pudo abrir la aplicación de email');
      });
  };

  const handlePlanVisit = () => {
    Alert.alert(
      'Planificar Visita',
      `¿Deseas agregar una visita a ${doctorName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Planificar', 
          onPress: () => {
            // TODO: Navegar a planning con médico preseleccionado
            navigation.navigate('Planning', { 
              preSelectedDoctor: selectedDoctor 
            });
          }
        }
      ]
    );
  };

  // Usar datos del caché si están disponibles, sino usar selectedDoctor
  const doctor = getDoctorById(doctorId) || selectedDoctor;

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
    
    // Doctor Header
    doctorHeader: {
      alignItems: 'center',
      marginBottom: theme.spacing[8],
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.primary[500],
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing[4],
      ...theme.shadows.lg,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text.inverse,
    },
    doctorName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: theme.spacing[2],
    },
    statusContainer: {
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
    
    // Info Sections
    sectionTitle: {
      fontSize: 18,
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
      alignItems: 'center',
      paddingVertical: theme.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    infoIcon: {
      fontSize: 18,
      marginRight: theme.spacing[3],
      width: 24,
      textAlign: 'center',
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
      marginBottom: theme.spacing[1],
    },
    infoValue: {
      fontSize: 16,
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    
    // Actions
    actionsContainer: {
      marginTop: theme.spacing[4],
    },
    actionRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing[3],
    },
    actionButton: {
      flex: 1,
      marginHorizontal: theme.spacing[1],
    },
    planButton: {
      marginTop: theme.spacing[4],
    },
    
    // Error State
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[8],
    },
    errorText: {
      fontSize: 16,
      color: theme.colors.status.error,
      textAlign: 'center',
      marginBottom: theme.spacing[4],
    },
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="Cargando..."
          leftIcon={<Text style={{ fontSize: 20, color: theme.colors.text.primary }}>←</Text>}
          onLeftPress={() => navigation.goBack()}
        />
        <Loading text="Cargando información del médico..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="Error"
          leftIcon={<Text style={{ fontSize: 20, color: theme.colors.text.primary }}>←</Text>}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button variant="outline" onPress={clearError}>
            Reintentar
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="No encontrado"
          leftIcon={<Text style={{ fontSize: 20, color: theme.colors.text.primary }}>←</Text>}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No se pudo encontrar la información del médico
          </Text>
          <Button variant="outline" onPress={() => navigation.goBack()}>
            Volver
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const initials = `${doctor.nombre[0]}${doctor.apellido[0]}`.toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Detalle del Médico"
        leftIcon={<Text style={{ fontSize: 20, color: theme.colors.text.primary }}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Doctor Header */}
        <View style={styles.doctorHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.doctorName}>
            Dr. {doctor.nombre} {doctor.apellido}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: doctor.activo ? theme.colors.secondary[500] : theme.colors.status.error }
            ]} />
            <Text style={[
              styles.statusText,
              { color: doctor.activo ? theme.colors.secondary[600] : theme.colors.status.error }
            ]}>
              {doctor.activo ? 'Médico Activo' : 'Médico Inactivo'}
            </Text>
          </View>
        </View>

        {/* Información Personal */}
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <Card variant="default" padding="lg" style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📋</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>CÉDULA</Text>
              <Text style={styles.infoValue}>{doctor.cedula}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📞</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>TELÉFONO</Text>
              <Text style={styles.infoValue}>{doctor.telefono}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📧</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>EMAIL</Text>
              <Text style={styles.infoValue}>{doctor.email}</Text>
            </View>
          </View>
          
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>DIRECCIÓN</Text>
              <Text style={styles.infoValue}>{doctor.direccion}</Text>
            </View>
          </View>
        </Card>

        {/* Acciones Rápidas */}
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <Card variant="default" padding="lg" style={styles.actionsContainer}>
          <View style={styles.actionRow}>
            <Button
              variant="primary"
              size="lg"
              onPress={() => handleCall(doctor.telefono)}
              style={styles.actionButton}
            >
              📞 Llamar
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onPress={() => handleEmail(doctor.email)}
              style={styles.actionButton}
            >
              📧 Email
            </Button>
          </View>
          
          <Button
            variant="outline"
            size="lg"
            onPress={handlePlanVisit}
            style={styles.planButton}
          >
            📅 Planificar Visita
          </Button>
        </Card>

        {/* TODO: Secciones futuras */}
        <Text style={styles.sectionTitle}>Historial de Visitas</Text>
        <Card variant="default" padding="lg">
          <Text style={{ 
            color: theme.colors.text.secondary, 
            textAlign: 'center',
            fontStyle: 'italic' 
          }}>
            Próximamente: Historial de visitas realizadas
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDetailScreen;