// src/screens/doctors/DoctorsListScreen.js - FIX NAVEGACIÓN
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Input, Button, Loading } from '../../components/ui';
import { Header } from '../../components/layout';
import { useTheme } from '../../theme/ThemeProvider';
import { useDoctorsStore } from '../../stores';

const DoctorsListScreen = ({ navigation }) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  
  const {
    doctors,
    isLoading,
    error,
    searchQuery,
    showActiveOnly,
    loadDoctors,
    setSearchQuery,
    toggleActiveFilter,
    getFilteredDoctors,
    clearError,
    getTotalDoctors,
    getActiveDoctors,
  } = useDoctorsStore();

  useEffect(() => {
    loadDoctorsData();
  }, []);

  const loadDoctorsData = async () => {
    const result = await loadDoctors();
    if (!result.success && result.error) {
      Alert.alert('Error', result.error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDoctors(true);
    setRefreshing(false);
  };

  // 🔧 FIX: Navegación funcionando
  const handleDoctorPress = (doctor) => {
    console.log('🔄 Navegando a detalle del médico:', doctor.id);
    navigation.navigate('DoctorDetail', { 
      doctorId: doctor.id,
      doctorName: `${doctor.nombre} ${doctor.apellido}`
    });
  };

  const filteredDoctors = getFilteredDoctors();
  const totalDoctors = getTotalDoctors();
  const activeDoctors = getActiveDoctors().length;

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.secondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing[5],
      paddingVertical: theme.spacing[4],
    },
    
    // Stats Header
    statsCard: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: theme.spacing[4],
      marginBottom: theme.spacing[4],
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary[500],
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[1],
    },
    
    // Search and Filters
    searchContainer: {
      marginBottom: theme.spacing[4],
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing[4],
    },
    filterButton: {
      flex: 1,
      marginLeft: theme.spacing[3],
    },
    
    // List
    listContent: {
      paddingBottom: theme.spacing[4],
    },
    doctorCard: {
      marginBottom: theme.spacing[3],
      paddingVertical: theme.spacing[4],
      paddingHorizontal: theme.spacing[4],
    },
    doctorHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing[3],
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    doctorCedula: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[2],
    },
    doctorContact: {
      fontSize: 14,
      color: theme.colors.text.tertiary,
      marginBottom: theme.spacing[1],
    },
    doctorAddress: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
      fontStyle: 'italic',
    },
    statusBadge: {
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
      borderRadius: theme.borderRadius.sm,
      minWidth: 60,
      alignItems: 'center',
    },
    activeBadge: {
      backgroundColor: theme.colors.secondary[100],
    },
    inactiveBadge: {
      backgroundColor: theme.colors.neutral[200],
    },
    statusText: {
      fontSize: 12,
      fontWeight: '500',
    },
    activeText: {
      color: theme.colors.secondary[700],
    },
    inactiveText: {
      color: theme.colors.neutral[600],
    },
    
    // Empty State
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[8],
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: theme.spacing[4],
    },
    
    // Error State
    errorContainer: {
      margin: theme.spacing[4],
      padding: theme.spacing[4],
      backgroundColor: theme.colors.status.error + '10',
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.status.error + '30',
    },
    errorText: {
      color: theme.colors.status.error,
      textAlign: 'center',
      marginBottom: theme.spacing[3],
    },
  };

  // 🔧 FIX: TouchableOpacity envolviendo Card
  const renderDoctor = ({ item: doctor }) => (
    <TouchableOpacity 
      onPress={() => handleDoctorPress(doctor)}
      activeOpacity={0.8}
    >
      <Card variant="default" style={styles.doctorCard}>
        <View style={styles.doctorHeader}>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>
              Dr. {doctor.nombre} {doctor.apellido}
            </Text>
            <Text style={styles.doctorCedula}>
              📋 {doctor.cedula}
            </Text>
            <Text style={styles.doctorContact}>
              📞 {doctor.telefono}
            </Text>
            <Text style={styles.doctorContact}>
              📧 {doctor.email}
            </Text>
            {doctor.direccion && (
              <Text style={styles.doctorAddress}>
                📍 {doctor.direccion}
              </Text>
            )}
          </View>
          
          <View style={[
            styles.statusBadge,
            doctor.activo ? styles.activeBadge : styles.inactiveBadge
          ]}>
            <Text style={[
              styles.statusText,
              doctor.activo ? styles.activeText : styles.inactiveText
            ]}>
              {doctor.activo ? 'Activo' : 'Inactivo'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery ? 
          `No se encontraron médicos que coincidan con "${searchQuery}"` :
          'No hay médicos disponibles en tu ruta'
        }
      </Text>
      {searchQuery && (
        <Button
          variant="outline"
          onPress={() => setSearchQuery('')}
        >
          Limpiar búsqueda
        </Button>
      )}
    </View>
  );

  if (isLoading && !refreshing && doctors.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Médicos" subtitle="Cargando..." />
        <Loading text="Cargando médicos..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Mis Médicos"
        subtitle={`${filteredDoctors.length} médicos en tu ruta`}
      />
      
      <View style={styles.content}>
        {/* Stats Header */}
        <Card variant="elevated" style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalDoctors}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{activeDoctors}</Text>
            <Text style={styles.statLabel}>Activos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredDoctors.length}</Text>
            <Text style={styles.statLabel}>Mostrados</Text>
          </View>
        </Card>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Buscar por nombre, cédula o email..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <Text style={{ color: theme.colors.text.secondary }}>
            Mostrar solo activos:
          </Text>
          <Button
            variant={showActiveOnly ? 'primary' : 'outline'}
            size="sm"
            onPress={toggleActiveFilter}
            style={styles.filterButton}
          >
            {showActiveOnly ? 'SÍ' : 'NO'}
          </Button>
        </View>

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button variant="outline" size="sm" onPress={clearError}>
              Cerrar
            </Button>
          </View>
        )}

        {/* Doctors List */}
        <FlatList
          data={filteredDoctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  );
};

export default DoctorsListScreen;