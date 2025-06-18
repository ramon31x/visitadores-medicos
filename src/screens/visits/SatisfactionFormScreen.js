// src/screens/visits/SatisfactionFormScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui';
import { Header } from '../../components/layout';
import { colors, typography, spacing } from '../../theme';

const SatisfactionFormScreen = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary }}>
    <Header.Back title="Formulario de Satisfacción" onBackPress={() => navigation.goBack()} />
    <View style={{ flex: 1, padding: spacing.md, justifyContent: 'center' }}>
      <Card padding="large" style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 60, marginBottom: spacing.lg }}>📝</Text>
        <Text style={{ 
          fontSize: typography.fontSize.xl, 
          fontWeight: '600', 
          marginBottom: spacing.md,
          color: colors.text.primary 
        }}>
          Formulario de Satisfacción
        </Text>
        <Text style={{ 
          fontSize: typography.fontSize.base, 
          color: colors.text.secondary, 
          textAlign: 'center' 
        }}>
          Pantalla en desarrollo.{'\n'}Aquí se capturará la firma digital y GPS.
        </Text>
      </Card>
    </View>
  </SafeAreaView>
);

export default SatisfactionFormScreen;