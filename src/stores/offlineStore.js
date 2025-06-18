import { create } from 'zustand';
// NetInfo no está disponible en Expo Go
// import NetInfo from '@react-native-community/netinfo';
import { 
  saveToCache, 
  getFromCache, 
  clearCache, 
  getCacheKeys 
} from '../services/storage/cache';

const useOfflineStore = create((set, get) => ({
  // Estado inicial
  isOnline: true,
  isConnected: true,
  connectionType: 'unknown',
  lastSyncTime: null,
  pendingOperations: [],
  cacheSize: 0,
  
  // Acciones

  // Inicializar monitoreo de conexión (simulado para Expo Go)
  initializeNetworkMonitoring: () => {
    console.log('📱 Ejecutando en Expo Go - Network monitoring simulado');
    
    // Simular que siempre está conectado en Expo Go
    set({
      isOnline: true,
      isConnected: true,
      connectionType: 'wifi',
    });
    
    return () => {}; // Cleanup vacío
  },

  // Cleanup del monitoreo
  cleanupNetworkMonitoring: () => {
    const { unsubscribeNetInfo } = get();
    if (unsubscribeNetInfo) {
      unsubscribeNetInfo();
    }
  },

  // Agregar operación pendiente
  addPendingOperation: async (operation) => {
    try {
      const { pendingOperations } = get();
      const newOperation = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...operation,
      };
      
      const updatedOperations = [...pendingOperations, newOperation];
      
      // Guardar en cache
      await saveToCache('pending_operations', updatedOperations);
      
      set({ pendingOperations: updatedOperations });
      
      return { success: true, operationId: newOperation.id };
    } catch (error) {
      console.error('Error adding pending operation:', error);
      return { success: false, error: error.message };
    }
  },

  // Cargar operaciones pendientes
  loadPendingOperations: async () => {
    try {
      const operations = await getFromCache('pending_operations') || [];
      set({ pendingOperations: operations });
      return { success: true, data: operations };
    } catch (error) {
      console.error('Error loading pending operations:', error);
      return { success: false, error: error.message };
    }
  },

  // Sincronizar todas las operaciones pendientes
  syncAllPendingOperations: async () => {
    try {
      const { pendingOperations, isOnline } = get();
      
      if (!isOnline) {
        return { success: false, error: 'Sin conexión a internet' };
      }
      
      if (pendingOperations.length === 0) {
        return { success: true, synced: 0 };
      }
      
      let syncedCount = 0;
      const failedOperations = [];
      
      for (const operation of pendingOperations) {
        try {
          await get().processOperation(operation);
          syncedCount++;
        } catch (error) {
          console.error('Error processing operation:', error);
          failedOperations.push(operation);
        }
      }
      
      // Actualizar operaciones pendientes (solo las que fallaron)
      await saveToCache('pending_operations', failedOperations);
      set({ 
        pendingOperations: failedOperations,
        lastSyncTime: new Date().toISOString(),
      });
      
      return { 
        success: true, 
        synced: syncedCount, 
        failed: failedOperations.length 
      };
    } catch (error) {
      console.error('Error syncing operations:', error);
      return { success: false, error: error.message };
    }
  },

  // Procesar una operación específica
  processOperation: async (operation) => {
    const { type, data } = operation;
    
    switch (type) {
      case 'create_form':
        const { createSatisfactionForm } = await import('../services/api');
        return await createSatisfactionForm(data);
        
      case 'perform_visit':
        const { performVisit } = await import('../services/api');
        return await performVisit(data);
        
      case 'update_plan':
        const { updatePlan } = await import('../services/api');
        return await updatePlan(data.planId, data.updateData);
        
      default:
        throw new Error(`Tipo de operación no soportada: ${type}`);
    }
  },

  // Guardar datos en cache
  saveToCache: async (key, data) => {
    try {
      await saveToCache(key, data);
      await get().updateCacheSize();
      return { success: true };
    } catch (error) {
      console.error('Error saving to cache:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener datos del cache
  getFromCache: async (key) => {
    try {
      const data = await getFromCache(key);
      return { success: true, data };
    } catch (error) {
      console.error('Error getting from cache:', error);
      return { success: false, error: error.message };
    }
  },

  // Limpiar cache
  clearAllCache: async () => {
    try {
      await clearCache();
      set({ 
        cacheSize: 0,
        pendingOperations: [],
      });
      return { success: true };
    } catch (error) {
      console.error('Error clearing cache:', error);
      return { success: false, error: error.message };
    }
  },

  // Actualizar tamaño del cache
  updateCacheSize: async () => {
    try {
      const keys = await getCacheKeys();
      set({ cacheSize: keys.length });
    } catch (error) {
      console.error('Error updating cache size:', error);
    }
  },

  // Forzar verificación de conectividad (simulado para Expo Go)
  checkConnectivity: async () => {
    try {
      // En Expo Go asumimos que siempre hay conexión
      const isConnected = true;
      
      set({
        isOnline: isConnected,
        isConnected: isConnected,
        connectionType: 'wifi',
      });
      
      return { success: true, isOnline: isConnected };
    } catch (error) {
      console.error('Error checking connectivity:', error);
      return { success: false, error: error.message };
    }
  },

  // Helpers/Getters
  getConnectionStatus: () => {
    const { isOnline, connectionType } = get();
    return {
      isOnline,
      connectionType,
      statusText: isOnline ? 'En línea' : 'Sin conexión',
      statusColor: isOnline ? '#10B981' : '#EF4444',
    };
  },

  getPendingOperationsCount: () => {
    const { pendingOperations } = get();
    return pendingOperations.length;
  },

  hasPendingOperations: () => {
    const { pendingOperations } = get();
    return pendingOperations.length > 0;
  },

  getLastSyncStatus: () => {
    const { lastSyncTime } = get();
    if (!lastSyncTime) return 'Nunca sincronizado';
    
    const syncDate = new Date(lastSyncTime);
    const now = new Date();
    const diffMinutes = Math.floor((now - syncDate) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Hace menos de 1 minuto';
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    return `Hace ${diffHours} horas`;
  },
}));

export default useOfflineStore;