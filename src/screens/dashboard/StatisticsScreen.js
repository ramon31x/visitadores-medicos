// src/screens/dashboard/StatisticsScreen.js - ACTUALIZADO
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../../components/ui';
import { Header } from '../../components/layout';
import { useTheme } from '../../theme/ThemeProvider';

const StatisticsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const mockData = {
    visits: 74,
    doctors: 12,
    forms: 18,
    efficiency: 92
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
    backIcon: {
      fontSize: 20,
      color: theme.colors.text.primary,
    },
    cardTitle: {
      ...theme.typography.styles.h4,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[4],
    },
    periodCard: {
      marginBottom: theme.spacing[6],
    },
    periodButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    periodButton: {
      flex: 1,
      marginHorizontal: theme.spacing[1],
    },
    overviewCard: {
      marginBottom: theme.spacing[6],
    },
    overviewGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    overviewItem: {
      width: '48%',
      alignItems: 'center',
      marginBottom: theme.spacing[4],
    },
    overviewNumber: {
      ...theme.typography.styles.h2,
      color: theme.colors.primary[500],
      fontWeight: 'bold',
    },
    overviewLabel: {
      ...theme.typography.styles.caption,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginTop: theme.spacing[1],
    },
    chartCard: {
      marginBottom: theme.spacing[6],
    },
    chartPlaceholder: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.neutral[50],
      borderRadius: theme.borderRadius.md,
      borderWidth: 2,
      borderColor: theme.colors.border.light,
      borderStyle: 'dashed',
    },
    placeholderText: {
      ...theme.typography.styles.body,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[2],
    },
    placeholderSubtext: {
      ...theme.typography.styles.caption,
      color: theme.colors.text.tertiary,
      textAlign: 'center',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Estadísticas"
        subtitle="Análisis de rendimiento"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Card variant="default" padding="md" style={styles.periodCard}>
          <Text style={styles.cardTitle}>Período</Text>
          <View style={styles.periodButtons}>
            {['week', 'month', 'quarter'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'primary' : 'ghost'}
                size="sm"
                onPress={() => setSelectedPeriod(period)}
                style={styles.periodButton}
              >
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Trimestre'}
              </Button>
            ))}
          </View>
        </Card>

        <Card variant="elevated" padding="lg" style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Resumen General</Text>
          
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>{mockData.visits}</Text>
              <Text style={styles.overviewLabel}>Total Visitas</Text>
            </View>
            
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>{mockData.doctors}</Text>
              <Text style={styles.overviewLabel}>Médicos Visitados</Text>
            </View>
            
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>{mockData.forms}</Text>
              <Text style={styles.overviewLabel}>Formularios</Text>
            </View>
            
            <View style={styles.overviewItem}>
              <Text style={[styles.overviewNumber, { color: theme.colors.secondary[500] }]}>
                {mockData.efficiency}%
              </Text>
              <Text style={styles.overviewLabel}>Eficiencia</Text>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.chartCard}>
          <Text style={styles.cardTitle}>Gráfico de Rendimiento</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              📊 Gráfico de visitas por día
            </Text>
            <Text style={styles.placeholderSubtext}>
              Próximamente: Integración con librerías de gráficos
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;