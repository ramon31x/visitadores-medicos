// src/stores/visitsStore.js - STORE COMPLETO DE VISITAS
import { create } from 'zustand';
import { getVisitsHistory, performVisit } from '../services/api/visits';

const useVisitsStore = create((set, get) => ({
  // Estado inicial
  visits: [],
  selectedVisit: null,
  isLoading: false,
  error: null,
  lastFetch: null,
  
  // Filtros
  filters: {
    fecha_desde: null,
    fecha_hasta: null,
    estado: null,
  },
  
  // Stats calculadas
  stats: {
    total: 0,
    realizadas: 0,
    pendientes: 0,
    conFormulario: 0,
  },

  // Acciones

  // Cargar historial de visitas
  loadVisits: async (forceRefresh = false) => {
    const { lastFetch, filters } = get();
    
    // Caché de 3 minutos para visitas
    const threeMinutesAgo = Date.now() - 3 * 60 * 1000;
    if (!forceRefresh && lastFetch && lastFetch > threeMinutesAgo) {
      console.log('🏥 Usando visitas del caché');
      return { success: true };
    }

    try {
      set({ isLoading: true, error: null });
      
      // Preparar filtros para API (solo enviar los que tienen valor)
      const apiFilters = {};
      if (filters.fecha_desde) apiFilters.fecha_desde = filters.fecha_desde;
      if (filters.fecha_hasta) apiFilters.fecha_hasta = filters.fecha_hasta;
      if (filters.estado) apiFilters.estado = filters.estado;
      
      const visits = await getVisitsHistory(apiFilters);
      
      // Calcular estadísticas
      const stats = get().calculateStats(visits);
      
      set({
        visits,
        stats,
        isLoading: false,
        error: null,
        lastFetch: Date.now(),
      });
      
      console.log('✅ Visitas cargadas exitosamente:', visits.length);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al cargar visitas';
      set({
        visits: [],
        stats: { total: 0, realizadas: 0, pendientes: 0, conFormulario: 0 },
        isLoading: false,
        error: errorMessage,
      });
      
      console.error('❌ Error cargando visitas:', errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Realizar nueva visita
  createVisit: async (visitData) => {
    try {
      set({ isLoading: true, error: null });
      
      const newVisit = await performVisit(visitData);
      
      // Recargar la lista después de crear
      await get().loadVisits(true);
      
      set({ isLoading: false, error: null });
      
      console.log('✅ Visita creada exitosamente:', newVisit);
      return { success: true, visit: newVisit };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al realizar visita';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Gestión de filtros
  setDateFilter: (fecha_desde, fecha_hasta) => {
    set({ 
      filters: { 
        ...get().filters, 
        fecha_desde, 
        fecha_hasta 
      } 
    });
    // Auto-recargar con nuevos filtros
    get().loadVisits(true);
  },

  setStatusFilter: (estado) => {
    set({ 
      filters: { 
        ...get().filters, 
        estado 
      } 
    });
    // Auto-recargar con nuevo filtro
    get().loadVisits(true);
  },

  clearFilters: () => {
    set({ 
      filters: {
        fecha_desde: null,
        fecha_hasta: null,
        estado: null,
      }
    });
    // Recargar sin filtros
    get().loadVisits(true);
  },

  // Seleccionar visita
  setSelectedVisit: (visit) => {
    set({ selectedVisit: visit });
  },

  clearSelectedVisit: () => {
    set({ selectedVisit: null });
  },

  // Limpiar error
  clearError: () => {
    set({ error: null });
  },

  // Helpers y cálculos
  calculateStats: (visits) => {
    const total = visits.length;
    const realizadas = visits.filter(v => v.estado === 'realizada').length;
    const pendientes = visits.filter(v => v.estado === 'pendiente').length;
    const conFormulario = visits.filter(v => v.tiene_formulario).length;
    
    return { total, realizadas, pendientes, conFormulario };
  },

  getVisitsByDate: (date) => {
    const { visits } = get();
    const targetDate = new Date(date).toDateString();
    return visits.filter(visit => 
      new Date(visit.fecha_visita).toDateString() === targetDate
    );
  },

  getVisitsByDoctor: (doctorId) => {
    const { visits } = get();
    return visits.filter(visit => visit.medico.id === doctorId);
  },

  // Formateo de fechas para UI
  formatVisitDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatVisitTime: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },
}));

export default useVisitsStore;