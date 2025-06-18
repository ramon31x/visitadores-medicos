// src/screens/dashboard/StatisticsScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Card } from '../../components/ui';
import { Header } from '../../components/layout';

// Theme
import { colors, typography, spacing } from '../../theme';

const StatisticsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header.Back 
        title="Estadísticas"
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.placeholderCard} padding="large">
          <Text style={styles.placeholderIcon}>📊</Text>
          <Text style={styles.placeholderTitle}>Estadísticas</Text>
          <Text style={styles.placeholderText}>
            Pantalla de estadísticas en desarrollo.{'\n'}
            Aquí se mostrarán gráficos y métricas detalladas.
          </Text>
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
  
  placeholderCard: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  
  placeholderIcon: {
    fontSize: 60,
    marginBottom: spacing.lg,
  },
  
  placeholderTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  
  placeholderText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
};

export default StatisticsScreen;