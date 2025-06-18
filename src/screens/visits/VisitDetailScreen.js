// src/screens/visits/VisitDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui';
import { Header } from '../../components/layout';
import { colors, typography, spacing } from '../../theme';

const VisitDetailScreen = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary }}>
    <Header.Back title="Detalle de Visita" onBackPress={() => navigation.goBack()} />
    <View style={{ flex: 1, padding: spacing.md, justifyContent: 'center' }}>
      <Card padding="large" style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 60, marginBottom: spacing.lg }}>🏥</Text>
        <Text style={{ 
          fontSize: typography.fontSize.xl, 
          fontWeight: '600', 
          marginBottom: spacing.md,
          color: colors.text.primary 
        }}>
          Detalle de Visita
        </Text>
        <Text style={{ 
          fontSize: typography.fontSize.base, 
          color: colors.text.secondary, 
          textAlign: 'center' 
        }}>
          Pantalla en desarrollo.
        </Text>
      </Card>
    </View>
  </SafeAreaView>
);

export default VisitDetailScreen;