// API Endpoints organizados por módulo
export const endpoints = {
  // Autenticación
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
  },
  
  // Perfil del usuario
  profile: '/perfil',
  
  // Médicos
  doctors: {
    list: '/medicos',
    detail: (id) => `/medicos/${id}`,
  },
  
  // Planificación
  planning: {
    list: '/planes',
    detail: (id) => `/planes/${id}`,
    create: '/planes',
    update: (id) => `/planes/${id}`,
    addVisit: (id) => `/planes/${id}/visitas`,
    removeVisit: (planId, visitId) => `/planes/${planId}/visitas/${visitId}`,
  },
  
  // Visitas
  visits: {
    perform: '/visitas/realizar',
    list: '/visitas/realizadas',
  },
  
  // Formularios
  forms: {
    create: '/formularios',
    list: '/formularios',
    detail: (visitId) => `/formularios/${visitId}`,
  },
  
  // Estadísticas
  stats: '/estadisticas',
  
  // Sistema
  system: {
    health: '/health',
    version: '/version',
  },
  
  // Analytics
  analytics: {
    kpis: '/analytics/kpis',
    ranking: '/analytics/ranking-visitadores',
    rutas: '/analytics/rutas-performance',
    stats: '/analytics/stats',
  },
};

// Helper para construir URLs con parámetros
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  
  // Reemplazar parámetros en la URL
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

// Helper para construir query strings
export const buildQuery = (params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      queryParams.append(key, params[key]);
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};