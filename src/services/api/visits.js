// src/services/api/visits.js - SERVICIO API VISITAS
import apiClient from './client';
import { endpoints } from './endpoints';

// Obtener visitas realizadas con filtros
export const getVisitsHistory = async (filters = {}) => {
  try {
    console.log('🏥 Obteniendo historial de visitas...');
    console.log('🔍 Filtros aplicados:', filters);
    
    const response = await apiClient.get(endpoints.visits.list, {
      params: filters
    });
    
    console.log('✅ Visitas obtenidas:', response.length);
    return response;
  } catch (error) {
    console.error('❌ Error obteniendo visitas:', error);
    console.error('❌ Response:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};

// Realizar una nueva visita
export const performVisit = async (visitData) => {
  try {
    console.log('🏥 Realizando nueva visita...');
    console.log('📝 Datos de visita:', visitData);
    
    const response = await apiClient.post(endpoints.visits.perform, visitData);
    
    console.log('✅ Visita realizada exitosamente:', response);
    return response;
  } catch (error) {
    console.error('❌ Error realizando visita:', error);
    console.error('❌ Response:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};