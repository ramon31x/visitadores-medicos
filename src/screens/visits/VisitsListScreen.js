// src/screens/visits/VisitsListScreen.js - PANTALLA PRINCIPAL DE VISITAS
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Loading } from '../../components/ui';
import { Header } from '../../components/layout';
import { useTheme } from '../../theme/ThemeProvider';
import { useVisitsStore } from '../../stores';

const VisitsListScreen = ({ navigation }) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  
  const {
    visits,
    stats,
    isLoading,
    error,
    filters,
    loadVisits,
    setStatusFilter,
    clearFilters,
    clearError,
    formatVisitDate,
    formatVisitTime,
  } = useVisitsStore();

  useEffect(() => {
    loadVisitsData();
  }, []);

  const loadVisitsData = async () => {
    const result = await loadVisits();
    if (!result.success && result.error) {
      Alert.alert('Error', result.error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadVisits(true);
    setRefreshing(false);
  };

  const handleVisitPress = (visit) => {
    navigation.navigate('VisitDetail', { 
      visitId: visit.id,
      doctorName: `${visit.medico.nombre} ${visit.medico.apellido}`
    });
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'realizada':
        return {
          bg: theme.colors.secondary[100],
          text: theme.colors.secondary[700],
          dot: theme.colors.secondary[500]
        };
      case 'pendiente':
        return {
          bg: theme.colors.status.warning + '20',
          text: theme.colors.status.warning,
          dot: theme.colors.status.warning
        };
      default:
        return {
          bg: theme.colors.neutral[100],
          text: theme.colors.neutral[600],
          dot: theme.colors.neutral[400]
        };
    }
  };

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
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primary[500],
    },
    statLabel: {
      fontSize: 10,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[1],
      textAlign: 'center',
    },
    
    // Filters
    filtersContainer: {
      marginBottom: theme.spacing[4],
    },
    filterRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing[3],
    },
    filterButton: {
      flex: 1,
      marginHorizontal: theme.spacing[1],
    },
    clearButton: {
      alignSelf: 'center',
      marginTop: theme.spacing[2],
    },
    
    // List
    listContent: {
      paddingBottom: theme.spacing[4],
    },
    visitCard: {
      marginBottom: theme.spacing[3],
      paddingVertical: theme.spacing[4],
      paddingHorizontal: theme.spacing[4],
    },
    visitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing[3],
    },
    visitInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    visitDate: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[1],
    },
    visitTime: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
    },
    statusBadge: {
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
      borderRadius: theme.borderRadius.sm,
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 80,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: theme.spacing[1],
    },
    statusText: {
      fontSize: 11,
      fontWeight: '500',
    },
    visitNotes: {
      fontSize: 12,
      color: theme.colors.text.tertiary,
      fontStyle: 'italic',
      marginTop: theme.spacing[2],
    },
    formIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing[2],
    },
    formText: {
      fontSize: 11,
      color: theme.colors.secondary[600],
      marginLeft: theme.spacing[1],
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

  const renderVisit = ({ item: visit }) => {
    const statusColors = getStatusColor(visit.estado);
    
    return (
      <Card 
        variant="default" 
        style={styles.visitCard}
        onPress={() => handleVisitPress(visit)}
      >
        <View style={styles.visitHeader}>
          <View style={styles.visitInfo}>
            <Text style={styles.doctorName}>
              Dr. {visit.medico.nombre} {visit.medico.apellido}
            </Text>
            <Text style={styles.visitDate}>
              📅 {formatVisitDate(visit.fecha_visita)}
            </Text>
            <Text style={styles.visitTime}>
              🕐 {formatVisitTime(visit.fecha_visita)}
            </Text>
          </View>
          
          <View style={[
            styles.statusBadge,
            { backgroundColor: statusColors.bg }
          ]}>
            <View style={[
              styles.statusDot,
              { backgroundColor: statusColors.dot }
            ]} />
            <Text style={[
              styles.statusText,
              { color: statusColors.text }
            ]}>
              {visit.estado === 'realizada' ? 'Realizada' : 'Pendiente'}
            </Text>
          </View>
        </View>
        
        {visit.notas && (
          <Text style={styles.visitNotes}>
            📝 {visit.notas}
          </Text>
        )}
        
        {visit.tiene_formulario && (
          <View style={styles.formIndicator}>
            <Text style={{ color: theme.colors.secondary[500] }}>📋</Text>
            <Text style={styles.formText}>Formulario completado</Text>
          </View>
        )}
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No hay visitas registradas aún
      </Text>
      <Button
        variant="primary"
        onPress={() => navigation.navigate('Planning')}
      >
        Planificar Primera Visita
      </Button>
    </View>
  );

  if (isLoading && !refreshing && visits.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Visitas" subtitle="Cargando..." />
        <Loading text="Cargando historial de visitas..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Mis Visitas"
        subtitle={`${visits.length} visitas registradas`}
      />
      
      <View style={styles.content}>
        {/* Stats Header */}
        <Card variant="elevated" style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.realizadas}</Text>
            <Text style={styles.statLabel}>Realizadas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.pendientes}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.conFormulario}</Text>
            <Text style={styles.statLabel}>Con Formulario</Text>
          </View>
        </Card>

        {/* Filters */}
        <Card variant="default" padding="md" style={styles.filtersContainer}>
          <View style={styles.filterRow}>
            <Button
              variant={!filters.estado ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setStatusFilter(null)}
              style={styles.filterButton}
            >
              Todas
            </Button>
            <Button
              variant={filters.estado === 'realizada' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setStatusFilter('realizada')}
              style={styles.filterButton}
            >
              Realizadas
            </Button>
            <Button
              variant={filters.estado === 'pendiente' ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setStatusFilter('pendiente')}
              style={styles.filterButton}
            >
              Pendientes
            </Button>
          </View>
          
          {(filters.fecha_desde || filters.fecha_hasta || filters.estado) && (
            <Button
              variant="ghost"
              size="sm"
              onPress={clearFilters}
              style={styles.clearButton}
            >
              Limpiar Filtros
            </Button>
          )}
        </Card>

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button variant="outline" size="sm" onPress={clearError}>
              Cerrar
            </Button>
          </View>
        )}

        {/* Visits List */}
        <FlatList
          data={visits}
          renderItem={renderVisit}
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

export default VisitsListScreen;