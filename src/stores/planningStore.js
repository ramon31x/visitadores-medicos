import { create } from 'zustand';
import { 
  getPlans, 
  getPlanDetail, 
  createPlan, 
  updatePlan,
  addVisitToPlan,
  removeVisitFromPlan,
  getCurrentWeekPlan 
} from '../services/api';

const usePlanningStore = create((set, get) => ({
  // Estado inicial
  plans: [],
  currentPlan: null,
  selectedPlan: null,
  isLoading: false,
  error: null,
  
  // Acciones

  // Cargar planes semanales
  loadPlans: async (filters = {}) => {
    try {
      set({ isLoading: true, error: null });
      
      const plans = await getPlans(filters);
      
      set({
        plans,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: plans };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar planes';
      set({
        plans: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar plan de la semana actual
  loadCurrentWeekPlan: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const plan = await getCurrentWeekPlan();
      
      set({
        currentPlan: plan,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: plan };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar plan actual';
      set({
        currentPlan: null,
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar detalle de un plan
  loadPlanDetail: async (planId) => {
    try {
      set({ isLoading: true, error: null });
      
      const plan = await getPlanDetail(planId);
      
      set({
        selectedPlan: plan,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: plan };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar detalle del plan';
      set({
        selectedPlan: null,
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Crear nuevo plan
  createNewPlan: async (planData) => {
    try {
      set({ isLoading: true, error: null });
      
      const newPlan = await createPlan(planData);
      
      // Actualizar lista de planes
      const currentPlans = get().plans;
      set({
        plans: [newPlan, ...currentPlans],
        selectedPlan: newPlan,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: newPlan };
    } catch (error) {
      const errorMessage = error.message || 'Error al crear plan';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Actualizar plan
  updateExistingPlan: async (planId, updateData) => {
    try {
      set({ isLoading: true, error: null });
      
      const updatedPlan = await updatePlan(planId, updateData);
      
      // Actualizar en la lista
      const currentPlans = get().plans;
      const updatedPlans = currentPlans.map(plan => 
        plan.id === planId ? updatedPlan : plan
      );
      
      set({
        plans: updatedPlans,
        selectedPlan: updatedPlan,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: updatedPlan };
    } catch (error) {
      const errorMessage = error.message || 'Error al actualizar plan';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Agregar visita al plan
  addVisit: async (planId, visitData) => {
    try {
      set({ isLoading: true, error: null });
      
      const result = await addVisitToPlan(planId, visitData);
      
      // Recargar detalle del plan para obtener datos actualizados
      await get().loadPlanDetail(planId);
      
      set({
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message || 'Error al agregar visita';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Quitar visita del plan
  removeVisit: async (planId, visitId) => {
    try {
      set({ isLoading: true, error: null });
      
      const result = await removeVisitFromPlan(planId, visitId);
      
      // Recargar detalle del plan
      await get().loadPlanDetail(planId);
      
      set({
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message || 'Error al quitar visita';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Seleccionar plan
  selectPlan: (plan) => {
    set({ selectedPlan: plan });
  },

  // Limpiar plan seleccionado
  clearSelectedPlan: () => {
    set({ selectedPlan: null });
  },

  // Limpiar errores
  clearError: () => {
    set({ error: null });
  },

  // Refrescar
  refresh: async () => {
    await get().loadPlans();
    await get().loadCurrentWeekPlan();
  },

  // Helpers/Getters
  getPlanById: (id) => {
    const { plans } = get();
    return plans.find(plan => plan.id === id) || null;
  },

  hasCurrentPlan: () => {
    const { currentPlan } = get();
    return !!currentPlan;
  },

  getCurrentPlanValidation: () => {
    const { currentPlan } = get();
    if (!currentPlan) return { isValid: false, errors: ['No hay plan activo'] };
    
    return {
      isValid: currentPlan.es_valido,
      errors: currentPlan.es_valido ? [] : ['Plan no cumple requisitos mínimos'],
      totalMedicos: currentPlan.total_medicos,
    };
  },

  getWeekDays: () => {
    return [
      { id: 1, name: 'Lunes', shortName: 'Lun' },
      { id: 2, name: 'Martes', shortName: 'Mar' },
      { id: 3, name: 'Miércoles', shortName: 'Mie' },
      { id: 4, name: 'Jueves', shortName: 'Jue' },
      { id: 5, name: 'Viernes', shortName: 'Vie' },
    ];
  },
}));

export default usePlanningStore;