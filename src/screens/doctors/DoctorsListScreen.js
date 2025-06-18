// src/screens/doctors/DoctorsListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Input, Button } from '../../components/ui';
import { Header } from '../../components/layout';
import { theme } from '../../theme';

const DoctorsListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockDoctors = [
    { id: 1, name: 'Dr. García Pérez', specialty: 'Cardiología', hospital: 'Hospital Central' },
    { id: 2, name: 'Dra. María López', specialty: 'Pediatría', hospital: 'Clínica San José' },
    { id: 3, name: 'Dr. Carlos Ruiz', specialty: 'Neurología', hospital: 'Hospital Nacional' },
  ];

  const renderDoctor = ({ item }) => (
    <Card variant="default" padding="md" style={styles.doctorCard}>
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        <Text style={styles.doctorHospital}>{item.hospital}</Text>
      </View>
      <Button
        variant="outline"
        size="sm"
        onPress={() => navigation.navigate('DoctorDetail', { doctorId: item.id })}
      >
        Ver Detalle
      </Button>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Médicos"
        subtitle="Lista de médicos asignados"
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.content}>
        <Input
          placeholder="Buscar médico..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        
        <FlatList
          data={mockDoctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[6],
  },
  backIcon: {
    fontSize: 20,
    color: theme.colors.text.primary,
  },
  searchInput: {
    marginBottom: theme.spacing[4],
  },
  listContent: {
    paddingBottom: theme.spacing[4],
  },
  doctorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...theme.typography.styles.label,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  doctorSpecialty: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[1],
  },
  doctorHospital: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
};

export default DoctorsListScreen;