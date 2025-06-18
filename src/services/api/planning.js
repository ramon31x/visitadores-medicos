import apiClient from './client';
import { endpoints, buildQuery } from './endpoints';

// Obtener planes semanales
export const getPlans = async (filters = {}) => {
  try {
    const query = buildQuery(filters);
    const url = `${endpoints.planning.list}${query}`;
    
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get plans error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener planes');
  }
};

// Obtener detalle de un plan específico
export const getPlanDetail = async (planId) => {
  try {
    if (!planId) {
      throw new Error('ID de plan requerido');
    }
    
    const url = endpoints.planning.detail(planId);
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get plan detail error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener detalle del plan');
  }
};

// Crear nuevo plan semanal
export const createPlan = async (planData) => {
  try {
    const { ano, semana } = planData;
    
    if (!ano || !semana) {
      throw new Error('Año y semana son requeridos');
    }
    
    return await apiClient.post(endpoints.planning.create, { ano, semana });
  } catch (error) {
    console.error('Create plan error:', error);
    throw new Error(error.response?.data?.message || 'Error al crear plan');
  }
};

// Actualizar plan existente
export const updatePlan = async (planId, updateData) => {
  try {
    if (!planId) {
      throw new Error('ID de plan requerido');
    }
    
    const url = endpoints.planning.update(planId);
    return await apiClient.put(url, updateData);
  } catch (error) {
    console.error('Update plan error:', error);
    throw new Error(error.response?.data?.message || 'Error al actualizar plan');
  }
};

// Agregar visita al plan
export const addVisitToPlan = async (planId, visitData) => {
  try {
    const { medico_id, dia_semana } = visitData;
    
    if (!planId || !medico_id || dia_semana === undefined) {
      throw new Error('Datos incompletos para agregar visita');
    }
    
    const url = endpoints.planning.addVisit(planId);
    return await apiClient.post(url, { medico_id, dia_semana });
  } catch (error) {
    console.error('Add visit to plan error:', error);
    throw new Error(error.response?.data?.message || 'Error al agregar visita al plan');
  }
};

// Quitar visita del plan
export const removeVisitFromPlan = async (planId, visitId) => {
  try {
    if (!planId || !visitId) {
      throw new Error('ID de plan y visita requeridos');
    }
    
    const url = endpoints.planning.removeVisit(planId, visitId);
    return await apiClient.delete(url);
  } catch (error) {
    console.error('Remove visit from plan error:', error);
    throw new Error(error.response?.data?.message || 'Error al quitar visita del plan');
  }
};

// Obtener plan de la semana actual
export const getCurrentWeekPlan = async () => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Calcular número de semana
    const startOfYear = new Date(currentYear, 0, 1);
    const pastDaysOfYear = (now - startOfYear) / 86400000;
    const currentWeek = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    
    const filters = {
      ano: currentYear,
      semana: currentWeek,
    };
    
    const plans = await getPlans(filters);
    return plans.length > 0 ? plans[0] : null;
  } catch (error) {
    console.error('Get current week plan error:', error);
    throw error;
  }
};