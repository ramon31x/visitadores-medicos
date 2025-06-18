// src/screens/visits/VisitsListScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui';
import { Header } from '../../components/layout';
import { theme } from '../../theme';

const VisitsListScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Header 
      title="Mis Visitas"
      leftIcon={<Text style={styles.backIcon}>←</Text>}
      onLeftPress={() => navigation.goBack()}
    />
    <View style={styles.content}>
      <Card padding="lg" style={styles.card}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.title}>
          Lista de Visitas
        </Text>
        <Text style={styles.description}>
          Pantalla en desarrollo.{'\n'}
          Próximamente: Historial completo de visitas realizadas y pendientes.
        </Text>
      </Card>
    </View>
  </SafeAreaView>
);

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
  backIcon: {
    fontSize: 20,
    color: theme.colors.text.primary,
  },
  emoji: {
    fontSize: 60, 
    marginBottom: theme.spacing[6]
  },
  title: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
    textAlign: 'center'
  },
  description: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22
  }
};

export default VisitsListScreen;
