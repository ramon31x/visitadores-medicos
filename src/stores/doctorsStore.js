import { create } from 'zustand';
import { 
  getDoctors, 
  getDoctorDetail, 
  searchDoctors,
  getActiveDoctors 
} from '../services/api';

const useDoctorsStore = create((set, get) => ({
  // Estado inicial
  doctors: [],
  selectedDoctor: null,
  isLoading: false,
  error: null,
  searchTerm: '',
  filters: {
    activo: true,
  },

  // Acciones

  // Cargar lista de médicos
  loadDoctors: async (filters = {}) => {
    try {
      set({ isLoading: true, error: null });
      
      const mergedFilters = { ...get().filters, ...filters };
      const doctors = await getDoctors(mergedFilters);
      
      set({
        doctors,
        filters: mergedFilters,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: doctors };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar médicos';
      set({
        doctors: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar solo médicos activos
  loadActiveDoctors: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const doctors = await getActiveDoctors();
      
      set({
        doctors,
        filters: { activo: true },
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: doctors };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar médicos activos';
      set({
        doctors: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Buscar médicos
  searchDoctors: async (searchTerm) => {
    try {
      set({ isLoading: true, error: null, searchTerm });
      
      if (!searchTerm.trim()) {
        // Si no hay término de búsqueda, cargar todos los activos
        return await get().loadActiveDoctors();
      }
      
      const doctors = await searchDoctors(searchTerm);
      
      set({
        doctors,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: doctors };
    } catch (error) {
      const errorMessage = error.message || 'Error al buscar médicos';
      set({
        doctors: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Obtener detalle de médico
  loadDoctorDetail: async (doctorId) => {
    try {
      set({ isLoading: true, error: null });
      
      const doctor = await getDoctorDetail(doctorId);
      
      set({
        selectedDoctor: doctor,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: doctor };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar detalle del médico';
      set({
        selectedDoctor: null,
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Seleccionar médico (para navegación)
  selectDoctor: (doctor) => {
    set({ selectedDoctor: doctor });
  },

  // Limpiar médico seleccionado
  clearSelectedDoctor: () => {
    set({ selectedDoctor: null });
  },

  // Limpiar búsqueda
  clearSearch: () => {
    set({ searchTerm: '' });
    get().loadActiveDoctors();
  },

  // Limpiar errores
  clearError: () => {
    set({ error: null });
  },

  // Refrescar lista
  refresh: async () => {
    const { filters } = get();
    return await get().loadDoctors(filters);
  },

  // Helpers/Getters
  getDoctorById: (id) => {
    const { doctors } = get();
    return doctors.find(doctor => doctor.id === id) || null;
  },

  getDoctorsCount: () => {
    const { doctors } = get();
    return doctors.length;
  },

  getActiveDoctorsCount: () => {
    const { doctors } = get();
    return doctors.filter(doctor => doctor.activo).length;
  },
}));

export default useDoctorsStore;