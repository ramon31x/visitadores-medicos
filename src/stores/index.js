// Exportar todos los stores
export { default as useAuthStore } from './authStore';
export { default as useDoctorsStore } from './doctorsStore';
export { default as usePlanningStore } from './planningStore';
export { default as useVisitsStore } from './visitsStore';
export { default as useFormsStore } from './formsStore';
export { default as useOfflineStore } from './offlineStore';

// Hook combinado para inicializar todos los stores
import { useEffect } from 'react';
import useAuthStore from './authStore';
import useOfflineStore from './offlineStore';

export const useInitializeApp = () => {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const initializeNetworkMonitoring = useOfflineStore(state => state.initializeNetworkMonitoring);
  const cleanupNetworkMonitoring = useOfflineStore(state => state.cleanupNetworkMonitoring);
  const loadPendingOperations = useOfflineStore(state => state.loadPendingOperations);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicializar autenticación
        await initializeAuth();
        
        // Inicializar monitoreo de red
        const unsubscribe = initializeNetworkMonitoring();
        
        // Cargar operaciones pendientes
        await loadPendingOperations();
        
        console.log('✅ App inicializada correctamente');
        
        // Cleanup function
        return () => {
          cleanupNetworkMonitoring();
          if (unsubscribe) unsubscribe();
        };
      } catch (error) {
        console.error('❌ Error inicializando app:', error);
      }
    };

    const cleanup = initializeApp();
    
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => {
          if (cleanupFn) cleanupFn();
        });
      }
    };
  }, []);
};

// Helpers para acceder a estados comunes
export const useAppStatus = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isOnline = useOfflineStore(state => state.isOnline);
  const hasPendingOperations = useOfflineStore(state => state.hasPendingOperations());
  
  return {
    isAuthenticated,
    isOnline,
    hasPendingOperations,
    isReady: isAuthenticated !== null, // Indica si ya se inicializó
  };
};

// Hook para datos de usuario
export const useUserData = () => {
  const user = useAuthStore(state => state.user);
  const getUserName = useAuthStore(state => state.getUserName);
  const getRouteName = useAuthStore(state => state.getRouteName);
  const isVisitador = useAuthStore(state => state.isVisitador);
  
  return {
    user,
    userName: getUserName(),
    routeName: getRouteName(),
    isVisitador: isVisitador(),
  };
};

// Hook para estado de conectividad
export const useConnectivity = () => {
  const isOnline = useOfflineStore(state => state.isOnline);
  const connectionType = useOfflineStore(state => state.connectionType);
  const getConnectionStatus = useOfflineStore(state => state.getConnectionStatus);
  const checkConnectivity = useOfflineStore(state => state.checkConnectivity);
  
  return {
    isOnline,
    connectionType,
    status: getConnectionStatus(),
    checkConnectivity,
  };
};