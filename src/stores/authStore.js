import { create } from 'zustand';
import { login as apiLogin, getProfile } from '../services/api';
import { API_CONFIG } from '../utils/constants';
import { 
  saveAuthSession, 
  getAuthSession, 
  logout as storageLogout 
} from '../services/storage/auth';

const useAuthStore = create((set, get) => ({
  // Estado inicial
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,

  // Acciones
  
  // Inicializar auth state desde storage
  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      
      const session = await getAuthSession();
      
      if (session.isAuthenticated) {
        set({
          user: session.userData,
          token: session.token,
          isAuthenticated: true,
          isInitialized: true,
          isLoading: false,
          error: null,
        });
        
        // Verificar que el token siga siendo válido
        try {
          const profile = await getProfile();
          set({ user: profile });
        } catch (error) {
          console.warn('Token inválido, limpiando sesión');
          get().logout();
        }
      } else {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isInitialized: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
        error: 'Error al inicializar autenticación',
      });
    }
  },

  // Login
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      
      console.log('🔐 Intentando login con:', credentials);
      console.log('🌐 URL del servidor:', API_CONFIG.BASE_URL);
      
      const response = await apiLogin(credentials);
      
      if (response.token && response.user) {
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        console.log('✅ Login exitoso');
        return { success: true };
      } else {
        throw new Error('Respuesta de login inválida');
      }
    } catch (error) {
      console.error('❌ Login error completo:', error);
      console.error('❌ Response data:', error.response?.data);
      console.error('❌ Status:', error.response?.status);
      
      const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ isLoading: true });
      
      // Limpiar storage
      await storageLogout();
      
      // Limpiar estado
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error durante logout:', error);
      
      // Aunque haya error, limpiar estado local
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      
      return { success: false, error: error.message };
    }
  },

  // Actualizar perfil del usuario
  updateUserProfile: async () => {
    try {
      const profile = await getProfile();
      set({ user: profile });
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  },

  // Limpiar errores
  clearError: () => {
    set({ error: null });
  },

  // Helpers/Getters
  isVisitador: () => {
    const { user } = get();
    return user?.ruta ? true : false;
  },

  getUserName: () => {
    const { user } = get();
    return user?.nombre_completo || '';
  },

  getRouteName: () => {
    const { user } = get();
    return user?.ruta?.nombre || '';
  },
}));

export default useAuthStore;