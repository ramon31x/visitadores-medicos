import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';

// Token management
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
  } catch (error) {
    console.error('Error saving token:', error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Refresh token management
export const saveRefreshToken = async (refreshToken) => {
  try {
    if (refreshToken) {
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    } else {
      // Si es null/undefined, remover la key
      await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
  } catch (error) {
    console.error('Error saving refresh token:', error);
    throw error;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

// User data management
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Session management
export const saveAuthSession = async (token, refreshToken, userData) => {
  try {
    const savePromises = [
      saveToken(token),
      saveUserData(userData),
    ];
    
    // Solo guardar refresh token si existe
    if (refreshToken) {
      savePromises.push(saveRefreshToken(refreshToken));
    } else {
      // Si no hay refresh token, asegurar que no quede uno viejo
      savePromises.push(AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN));
    }
    
    await Promise.all(savePromises);
  } catch (error) {
    console.error('Error saving auth session:', error);
    throw error;
  }
};

export const getAuthSession = async () => {
  try {
    const [token, refreshToken, userData] = await Promise.all([
      getToken(),
      getRefreshToken(),
      getUserData(),
    ]);
    
    return {
      token,
      refreshToken,
      userData,
      isAuthenticated: !!(token && userData),
    };
  } catch (error) {
    console.error('Error getting auth session:', error);
    return {
      token: null,
      refreshToken: null,
      userData: null,
      isAuthenticated: false,
    };
  }
};

export const logout = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};