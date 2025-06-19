// src/stores/doctorsStore.js - STORE ACTUALIZADO
import { create } from 'zustand';
import { getDoctors, getDoctorDetail } from '../services/api/doctors';

const useDoctorsStore = create((set, get) => ({
  // Estado inicial
  doctors: [],
  selectedDoctor: null,
  isLoading: false,
  error: null,
  lastFetch: null,
  searchQuery: '',
  showActiveOnly: true,

  // Acciones

  // Cargar lista de médicos
  loadDoctors: async (forceRefresh = false) => {
    const { lastFetch, showActiveOnly } = get();
    
    // Evitar llamadas innecesarias (caché de 5 minutos)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (!forceRefresh && lastFetch && lastFetch > fiveMinutesAgo) {
      console.log('📋 Usando médicos del caché');
      return { success: true };
    }

    try {
      set({ isLoading: true, error: null });
      
      const doctors = await getDoctors(showActiveOnly);
      
      set({
        doctors,
        isLoading: false,
        error: null,
        lastFetch: Date.now(),
      });
      
      console.log('✅ Médicos cargados exitosamente:', doctors.length);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al cargar médicos';
      set({
        doctors: [],
        isLoading: false,
        error: errorMessage,
      });
      
      console.error('❌ Error cargando médicos:', errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Cargar detalle de médico
  loadDoctorDetail: async (medicoId) => {
    try {
      set({ isLoading: true, error: null });
      
      const doctor = await getDoctorDetail(medicoId);
      
      set({
        selectedDoctor: doctor,
        isLoading: false,
        error: null,
      });
      
      console.log('✅ Detalle médico cargado:', doctor);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al cargar médico';
      set({
        selectedDoctor: null,
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Filtros y búsqueda
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  toggleActiveFilter: () => {
    const { showActiveOnly } = get();
    set({ showActiveOnly: !showActiveOnly });
    // Recargar automáticamente con el nuevo filtro
    get().loadDoctors(true);
  },

  // Obtener médicos filtrados
  getFilteredDoctors: () => {
    const { doctors, searchQuery } = get();
    
    if (!searchQuery.trim()) return doctors;
    
    const query = searchQuery.toLowerCase();
    return doctors.filter(doctor => 
      doctor.nombre.toLowerCase().includes(query) ||
      doctor.apellido.toLowerCase().includes(query) ||
      doctor.cedula.includes(query) ||
      doctor.email.toLowerCase().includes(query) ||
      `${doctor.nombre} ${doctor.apellido}`.toLowerCase().includes(query)
    );
  },

  // Limpiar estado
  clearSelectedDoctor: () => {
    set({ selectedDoctor: null });
  },

  clearError: () => {
    set({ error: null });
  },

  // Helpers
  getDoctorById: (doctorId) => {
    const { doctors } = get();
    return doctors.find(doctor => doctor.id === doctorId) || null;
  },

  getTotalDoctors: () => {
    const { doctors } = get();
    return doctors.length;
  },

  getActiveDoctors: () => {
    const { doctors } = get();
    return doctors.filter(doctor => doctor.activo);
  },
}));

export default useDoctorsStore;