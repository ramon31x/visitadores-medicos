import apiClient from './client';
import { endpoints } from './endpoints';
import { saveAuthSession, getRefreshToken, saveToken } from '../storage/auth';

// Login del usuario
export const login = async (credentials) => {
  try {
    console.log('📡 Enviando request de login...');
    const response = await apiClient.post(endpoints.auth.login, credentials);
    
    console.log('✅ Response de login recibida:', response);
    
    const { access_token, token_type, expires_in } = response;
    
    if (!access_token) {
      throw new Error('Token no recibido del servidor');
    }
    
    console.log('🔑 Token recibido, obteniendo perfil...');
    
    // Obtener datos del perfil después del login
    const userProfile = await getUserProfile(access_token);
    
    console.log('👤 Perfil obtenido:', userProfile);
    
    // Guardar sesión completa (refresh_token puede ser null)
    await saveAuthSession(access_token, null, userProfile);
    
    console.log('💾 Sesión guardada exitosamente');
    
    return {
      token: access_token,
      tokenType: token_type,
      expiresIn: expires_in,
      user: userProfile,
    };
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    throw new Error(error.response?.data?.message || error.message || 'Error al iniciar sesión');
  }
};

// Obtener perfil del usuario (con token específico)
const getUserProfile = async (token) => {
  try {
    console.log('🔍 Obteniendo perfil con token...');
    
    // Crear headers específicos para esta petición
    const response = await apiClient.get(endpoints.profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('✅ Perfil obtenido exitosamente:', response);
    return response;
  } catch (error) {
    console.error('❌ Error getting user profile:', error);
    console.error('❌ Profile error response:', error.response?.data);
    console.error('❌ Profile error status:', error.response?.status);
    console.error('❌ Endpoint usado:', endpoints.profile);
    throw error;
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const currentRefreshToken = await getRefreshToken();
    
    if (!currentRefreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiClient.post(endpoints.auth.refresh, {
      refresh_token: currentRefreshToken,
    });
    
    const { access_token, expires_in } = response;
    
    // Actualizar solo el token, mantener user data
    await saveToken(access_token);
    
    return {
      token: access_token,
      expiresIn: expires_in,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async () => {
  try {
    return await apiClient.get(endpoints.profile);
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};