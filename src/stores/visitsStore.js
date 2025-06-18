import { create } from 'zustand';
import { 
  performVisit, 
  getPerformedVisits, 
  getVisitsByDateRange,
  getTodayVisits,
  getVisitsByStatus 
} from '../services/api';

const useVisitsStore = create((set, get) => ({
  // Estado inicial
  visits: [],
  todayVisits: [],
  selectedVisit: null,
  isLoading: false,
  error: null,
  filters: {
    fecha_desde: null,
    fecha_hasta: null,
    estado: null,
  },

  // Acciones

  // Cargar visitas realizadas
  loadVisits: async (filters = {}) => {
    try {
      set({ isLoading: true, error: null });
      
      const mergedFilters = { ...get().filters, ...filters };
      const visits = await getPerformedVisits(mergedFilters);
      
      set({
        visits,
        filters: mergedFilters,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: visits };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar visitas';
      set({
        visits: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar visitas del día
  loadTodayVisits: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const visits = await getTodayVisits();
      
      set({
        todayVisits: visits,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: visits };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar visitas del día';
      set({
        todayVisits: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Realizar/registrar visita
  performVisit: async (visitData) => {
    try {
      set({ isLoading: true, error: null });
      
      const result = await performVisit(visitData);
      
      // Actualizar listas
      await get().loadVisits();
      await get().loadTodayVisits();
      
      set({
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message || 'Error al registrar visita';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar visitas por rango de fechas
  loadVisitsByDateRange: async (startDate, endDate) => {
    try {
      set({ isLoading: true, error: null });
      
      const visits = await getVisitsByDateRange(startDate, endDate);
      
      set({
        visits,
        filters: {
          fecha_desde: startDate,
          fecha_hasta: endDate,
          estado: null,
        },
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: visits };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar visitas por fecha';
      set({
        visits: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar visitas por estado
  loadVisitsByStatus: async (status) => {
    try {
      set({ isLoading: true, error: null });
      
      const visits = await getVisitsByStatus(status);
      
      set({
        visits,
        filters: {
          fecha_desde: null,
          fecha_hasta: null,
          estado: status,
        },
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: visits };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar visitas por estado';
      set({
        visits: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Seleccionar visita
  selectVisit: (visit) => {
    set({ selectedVisit: visit });
  },

  // Limpiar visita seleccionada
  clearSelectedVisit: () => {
    set({ selectedVisit: null });
  },

  // Limpiar filtros
  clearFilters: () => {
    set({
      filters: {
        fecha_desde: null,
        fecha_hasta: null,
        estado: null,
      }
    });
    get().loadVisits();
  },

  // Limpiar errores
  clearError: () => {
    set({ error: null });
  },

  // Refrescar
  refresh: async () => {
    await Promise.all([
      get().loadVisits(),
      get().loadTodayVisits(),
    ]);
  },

  // Helpers/Getters
  getVisitById: (id) => {
    const { visits } = get();
    return visits.find(visit => visit.id === id) || null;
  },

  getTodayVisitsCount: () => {
    const { todayVisits } = get();
    return todayVisits.length;
  },

  getCompletedVisitsCount: () => {
    const { visits } = get();
    return visits.filter(visit => visit.estado === 'realizada').length;
  },

  getVisitsByStatusCount: (status) => {
    const { visits } = get();
    return visits.filter(visit => visit.estado === status).length;
  },

  getVisitsWithFormsCount: () => {
    const { visits } = get();
    return visits.filter(visit => visit.tiene_formulario).length;
  },

  // Estados disponibles para visitas
  getVisitStatuses: () => {
    return [
      { key: 'realizada', label: 'Realizada', color: '#10B981' },
      { key: 'cancelada', label: 'Cancelada', color: '#EF4444' },
      { key: 'reprogramada', label: 'Reprogramada', color: '#F59E0B' },
      { key: 'no_encontrado', label: 'No Encontrado', color: '#6B7280' },
    ];
  },
}));

export default useVisitsStore;