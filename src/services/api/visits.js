import apiClient from './client';
import { endpoints, buildQuery } from './endpoints';

// Realizar/marcar visita como completada
export const performVisit = async (visitData) => {
  try {
    const { visita_planificada_id, notas = '', estado = 'realizada' } = visitData;
    
    if (!visita_planificada_id) {
      throw new Error('ID de visita planificada requerido');
    }
    
    const payload = {
      visita_planificada_id,
      notas,
      estado,
    };
    
    return await apiClient.post(endpoints.visits.perform, payload);
  } catch (error) {
    console.error('Perform visit error:', error);
    throw new Error(error.response?.data?.message || 'Error al registrar visita');
  }
};

// Obtener lista de visitas realizadas
export const getPerformedVisits = async (filters = {}) => {
  try {
    const query = buildQuery(filters);
    const url = `${endpoints.visits.list}${query}`;
    
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get performed visits error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener visitas realizadas');
  }
};

// Obtener visitas por rango de fechas
export const getVisitsByDateRange = async (startDate, endDate) => {
  try {
    const filters = {
      fecha_desde: startDate,
      fecha_hasta: endDate,
    };
    
    return await getPerformedVisits(filters);
  } catch (error) {
    console.error('Get visits by date range error:', error);
    throw error;
  }
};

// Obtener visitas del día actual
export const getTodayVisits = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const filters = {
      fecha_desde: today,
      fecha_hasta: today,
    };
    
    return await getPerformedVisits(filters);
  } catch (error) {
    console.error('Get today visits error:', error);
    throw error;
  }
};

// Obtener visitas por estado
export const getVisitsByStatus = async (status) => {
  try {
    const filters = { estado: status };
    return await getPerformedVisits(filters);
  } catch (error) {
    console.error('Get visits by status error:', error);
    throw error;
  }
};