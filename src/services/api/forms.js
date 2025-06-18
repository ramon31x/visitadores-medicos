import apiClient from './client';
import { endpoints, buildQuery } from './endpoints';

// Crear formulario de satisfacción (CON FIRMA + GPS)
export const createSatisfactionForm = async (formData) => {
  try {
    const {
      visita_realizada_id,
      satisfaccion_general,
      comentarios = '',
      firma_medico,
      datos_gps,
    } = formData;
    
    // Validaciones críticas
    if (!visita_realizada_id) {
      throw new Error('ID de visita realizada requerido');
    }
    
    if (satisfaccion_general === undefined || satisfaccion_general < 1 || satisfaccion_general > 5) {
      throw new Error('Calificación de satisfacción debe ser entre 1 y 5');
    }
    
    if (!firma_medico) {
      throw new Error('Firma del médico es obligatoria');
    }
    
    if (!datos_gps) {
      throw new Error('Datos de GPS son obligatorios');
    }
    
    const payload = {
      visita_realizada_id,
      satisfaccion_general,
      comentarios,
      firma_medico,
      datos_gps,
    };
    
    return await apiClient.post(endpoints.forms.create, payload);
  } catch (error) {
    console.error('Create satisfaction form error:', error);
    throw new Error(error.response?.data?.message || 'Error al crear formulario de satisfacción');
  }
};

// Obtener lista de formularios
export const getForms = async (filters = {}) => {
  try {
    const query = buildQuery(filters);
    const url = `${endpoints.forms.list}${query}`;
    
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get forms error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener formularios');
  }
};

// Obtener formulario específico por ID de visita
export const getFormByVisitId = async (visitId) => {
  try {
    if (!visitId) {
      throw new Error('ID de visita requerido');
    }
    
    const url = endpoints.forms.detail(visitId);
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get form by visit ID error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener formulario');
  }
};

// Obtener formularios por rango de fechas
export const getFormsByDateRange = async (startDate, endDate) => {
  try {
    const filters = {
      fecha_desde: startDate,
      fecha_hasta: endDate,
    };
    
    return await getForms(filters);
  } catch (error) {
    console.error('Get forms by date range error:', error);
    throw error;
  }
};

// Validar datos del formulario antes de enviar
export const validateFormData = (formData) => {
  const errors = [];
  
  if (!formData.visita_realizada_id) {
    errors.push('ID de visita realizada es requerido');
  }
  
  if (!formData.satisfaccion_general || formData.satisfaccion_general < 1 || formData.satisfaccion_general > 5) {
    errors.push('Calificación debe ser entre 1 y 5 estrellas');
  }
  
  if (!formData.firma_medico) {
    errors.push('Firma del médico es obligatoria');
  }
  
  if (!formData.datos_gps) {
    errors.push('Ubicación GPS es obligatoria');
  } else {
    if (!formData.datos_gps.latitude || !formData.datos_gps.longitude) {
      errors.push('Coordenadas GPS inválidas');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};