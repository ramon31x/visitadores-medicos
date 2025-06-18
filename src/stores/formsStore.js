import { create } from 'zustand';
import { 
  createSatisfactionForm, 
  getForms, 
  getFormByVisitId,
  getFormsByDateRange,
  validateFormData 
} from '../services/api';
import { saveOfflineForm, getOfflineForms, removeOfflineForm } from '../services/storage/offline';

const useFormsStore = create((set, get) => ({
  // Estado inicial
  forms: [],
  selectedForm: null,
  pendingForms: [], // Formularios offline pendientes
  isLoading: false,
  error: null,
  isOnline: true,

  // Acciones

  // Cargar formularios
  loadForms: async (filters = {}) => {
    try {
      set({ isLoading: true, error: null });
      
      const forms = await getForms(filters);
      
      set({
        forms,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: forms };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar formularios';
      set({
        forms: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Crear formulario de satisfacción
  createForm: async (formData) => {
    try {
      set({ isLoading: true, error: null });
      
      // Validar datos primero
      const validation = validateFormData(formData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      
      // Intentar enviar online
      if (get().isOnline) {
        try {
          const result = await createSatisfactionForm(formData);
          
          // Actualizar lista de formularios
          await get().loadForms();
          
          set({
            isLoading: false,
            error: null,
          });
          
          return { success: true, data: result, fromCache: false };
        } catch (onlineError) {
          console.warn('Error enviando online, guardando offline:', onlineError);
          // Si falla online, guardar offline
          return await get().saveFormOffline(formData);
        }
      } else {
        // Si está offline, guardar directamente
        return await get().saveFormOffline(formData);
      }
    } catch (error) {
      const errorMessage = error.message || 'Error al crear formulario';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Guardar formulario offline
  saveFormOffline: async (formData) => {
    try {
      const offlineForm = {
        ...formData,
        id: Date.now(), // ID temporal
        timestamp: new Date().toISOString(),
        status: 'pending',
      };
      
      await saveOfflineForm(offlineForm);
      
      // Actualizar lista de pendientes
      await get().loadPendingForms();
      
      set({
        isLoading: false,
        error: null,
      });
      
      return { 
        success: true, 
        data: offlineForm, 
        fromCache: true,
        message: 'Formulario guardado offline. Se enviará cuando haya conexión.' 
      };
    } catch (error) {
      const errorMessage = error.message || 'Error al guardar formulario offline';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar formularios pendientes (offline)
  loadPendingForms: async () => {
    try {
      const pendingForms = await getOfflineForms();
      set({ pendingForms });
      return { success: true, data: pendingForms };
    } catch (error) {
      console.error('Error loading pending forms:', error);
      return { success: false, error: error.message };
    }
  },

  // Sincronizar formularios offline
  syncPendingForms: async () => {
    try {
      const { pendingForms } = get();
      
      if (pendingForms.length === 0) {
        return { success: true, synced: 0 };
      }
      
      set({ isLoading: true, error: null });
      
      let syncedCount = 0;
      const errors = [];
      
      for (const form of pendingForms) {
        try {
          // Intentar enviar cada formulario
          await createSatisfactionForm(form);
          
          // Si se envía exitosamente, remover del cache offline
          await removeOfflineForm(form.id);
          syncedCount++;
        } catch (error) {
          console.error('Error syncing form:', error);
          errors.push(`Formulario ${form.id}: ${error.message}`);
        }
      }
      
      // Recargar formularios pendientes y enviados
      await get().loadPendingForms();
      await get().loadForms();
      
      set({
        isLoading: false,
        error: errors.length > 0 ? errors.join('; ') : null,
      });
      
      return { 
        success: true, 
        synced: syncedCount, 
        errors: errors.length,
        message: `${syncedCount} formularios sincronizados${errors.length > 0 ? `, ${errors.length} con errores` : ''}` 
      };
    } catch (error) {
      const errorMessage = error.message || 'Error al sincronizar formularios';
      set({
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Obtener formulario por ID de visita
  loadFormByVisitId: async (visitId) => {
    try {
      set({ isLoading: true, error: null });
      
      const form = await getFormByVisitId(visitId);
      
      set({
        selectedForm: form,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: form };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar formulario';
      set({
        selectedForm: null,
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Cargar formularios por rango de fechas
  loadFormsByDateRange: async (startDate, endDate) => {
    try {
      set({ isLoading: true, error: null });
      
      const forms = await getFormsByDateRange(startDate, endDate);
      
      set({
        forms,
        isLoading: false,
        error: null,
      });
      
      return { success: true, data: forms };
    } catch (error) {
      const errorMessage = error.message || 'Error al cargar formularios por fecha';
      set({
        forms: [],
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Establecer estado de conexión
  setOnlineStatus: (isOnline) => {
    set({ isOnline });
    
    // Si se conecta, intentar sincronizar automáticamente
    if (isOnline) {
      setTimeout(() => {
        get().syncPendingForms();
      }, 1000);
    }
  },

  // Seleccionar formulario
  selectForm: (form) => {
    set({ selectedForm: form });
  },

  // Limpiar formulario seleccionado
  clearSelectedForm: () => {
    set({ selectedForm: null });
  },

  // Limpiar errores
  clearError: () => {
    set({ error: null });
  },

  // Refrescar
  refresh: async () => {
    await Promise.all([
      get().loadForms(),
      get().loadPendingForms(),
    ]);
  },

  // Helpers/Getters
  getFormById: (id) => {
    const { forms } = get();
    return forms.find(form => form.id === id) || null;
  },

  getPendingFormsCount: () => {
    const { pendingForms } = get();
    return pendingForms.length;
  },

  hasPendingForms: () => {
    const { pendingForms } = get();
    return pendingForms.length > 0;
  },

  getFormsCount: () => {
    const { forms } = get();
    return forms.length;
  },

  getAverageSatisfaction: () => {
    const { forms } = get();
    if (forms.length === 0) return 0;
    
    const total = forms.reduce((sum, form) => sum + form.satisfaccion_general, 0);
    return (total / forms.length).toFixed(1);
  },

  // Validar formulario antes de enviar
  validateForm: (formData) => {
    return validateFormData(formData);
  },

  // Obtener opciones de satisfacción
  getSatisfactionOptions: () => {
    return [
      { value: 1, label: 'Muy Insatisfecho', icon: '😞', color: '#EF4444' },
      { value: 2, label: 'Insatisfecho', icon: '😟', color: '#F59E0B' },
      { value: 3, label: 'Neutral', icon: '😐', color: '#6B7280' },
      { value: 4, label: 'Satisfecho', icon: '😊', color: '#22C55E' },
      { value: 5, label: 'Muy Satisfecho', icon: '😍', color: '#10B981' },
    ];
  },
}));

export default useFormsStore;