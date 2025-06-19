/* import apiClient from './client';
import { endpoints, buildQuery } from './endpoints';

// Obtener lista de médicos de mi ruta
export const getDoctors = async (filters = {}) => {
  try {
    const query = buildQuery(filters);
    const url = `${endpoints.doctors.list}${query}`;
    
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get doctors error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener médicos');
  }
};

// Obtener detalle de un médico específico
export const getDoctorDetail = async (doctorId) => {
  try {
    if (!doctorId) {
      throw new Error('ID de médico requerido');
    }
    
    const url = endpoints.doctors.detail(doctorId);
    return await apiClient.get(url);
  } catch (error) {
    console.error('Get doctor detail error:', error);
    throw new Error(error.response?.data?.message || 'Error al obtener detalle del médico');
  }
};

// Buscar médicos por nombre
export const searchDoctors = async (searchTerm) => {
  try {
    const filters = {
      search: searchTerm,
      activo: true,
    };
    
    return await getDoctors(filters);
  } catch (error) {
    console.error('Search doctors error:', error);
    throw error;
  }
};

// Obtener médicos activos únicamente
export const getActiveDoctors = async () => {
  try {
    const filters = { activo: true };
    return await getDoctors(filters);
  } catch (error) {
    console.error('Get active doctors error:', error);
    throw error;
  }
}; */

// src/services/api/doctors.js - SERVICIO API MÉDICOS
import apiClient from './client';
import { endpoints } from './endpoints';

// Obtener lista de médicos de la ruta del visitador
export const getDoctors = async (activo = true) => {
  try {
    console.log('🏥 Obteniendo lista de médicos...');
    const response = await apiClient.get(endpoints.doctors.list, {
      params: { activo }
    });
    console.log('✅ Médicos obtenidos:', response);
    return response;
  } catch (error) {
    console.error('❌ Error obteniendo médicos:', error);
    console.error('❌ Response:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};

// Obtener detalle de un médico específico
export const getDoctorDetail = async (medicoId) => {
  try {
    console.log('👨‍⚕️ Obteniendo detalle del médico:', medicoId);
    const response = await apiClient.get(endpoints.doctors.detail(medicoId));
    console.log('✅ Detalle médico obtenido:', response);
    return response;
  } catch (error) {
    console.error('❌ Error obteniendo detalle médico:', error);
    console.error('❌ Response:', error.response?.data);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};