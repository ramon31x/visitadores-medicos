// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://10.20.100.62:8590/api',
  TIMEOUT: 10000,
};

// Keys para AsyncStorage
export const STORAGE_KEYS = {
  JWT_TOKEN: 'visitador_token',
  REFRESH_TOKEN: 'visitador_refresh_token',
  USER_DATA: 'visitador_user_data',
};

// Configuración de la app
export const APP_CONFIG = {
  NAME: 'Visitadores Médicos',
  VERSION: '1.0.0',
  DEBUG_MODE: true,
};