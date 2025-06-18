// src/screens/planning/WeeklyPlanScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../../components/ui';
import { Header } from '../../components/layout';
import { theme } from '../../theme';

const WeeklyPlanScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Header 
      title="Plan Semanal"
      leftIcon={<Text style={styles.backIcon}>←</Text>}
      onLeftPress={() => navigation.goBack()}
    />
    <View style={styles.content}>
      <Card padding="lg" style={styles.card}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.title}>
          Plan Semanal
        </Text>
        <Text style={styles.description}>
          Pantalla en desarrollo.{'\n'}
          Próximamente: Creación y gestión de planes semanales de visitas médicas.
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={() => navigation.navigate('AddVisit')}
            style={styles.button}
          >
            ➕ Agregar Visita
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onPress={() => navigation.navigate('PlanDetail')}
            style={styles.button}
          >
            📄 Ver Detalles
          </Button>
        </View>
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
    lineHeight: 22,
    marginBottom: theme.spacing[8]
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing[4]
  },
  button: {
    marginBottom: theme.spacing[3]
  }
};

export default WeeklyPlanScreen;