import AsyncStorage from '@react-native-async-storage/async-storage';

// Prefijo para keys del cache
const CACHE_PREFIX = 'cache_';
const CACHE_METADATA_KEY = 'cache_metadata';

// Duración del cache (en milisegundos)
const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000,      // 5 minutos
  MEDIUM: 30 * 60 * 1000,    // 30 minutos
  LONG: 2 * 60 * 60 * 1000,  // 2 horas
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 horas
};

// Generar key del cache
const getCacheKey = (key) => `${CACHE_PREFIX}${key}`;

// Guardar datos en cache con TTL
export const saveToCache = async (key, data, ttl = CACHE_DURATION.MEDIUM) => {
  try {
    const cacheKey = getCacheKey(key);
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl,
      expiresAt: Date.now() + ttl,
    };
    
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
    await updateCacheMetadata(key, cacheData);
    
    return true;
  } catch (error) {
    console.error('Error saving to cache:', error);
    return false;
  }
};

// Obtener datos del cache
export const getFromCache = async (key) => {
  try {
    const cacheKey = getCacheKey(key);
    const cached = await AsyncStorage.getItem(cacheKey);
    
    if (!cached) {
      return null;
    }
    
    const cacheData = JSON.parse(cached);
    
    // Verificar si ha expirado
    if (Date.now() > cacheData.expiresAt) {
      await removeFromCache(key);
      return null;
    }
    
    return cacheData.data;
  } catch (error) {
    console.error('Error getting from cache:', error);
    return null;
  }
};

// Remover del cache
export const removeFromCache = async (key) => {
  try {
    const cacheKey = getCacheKey(key);
    await AsyncStorage.removeItem(cacheKey);
    await removeCacheMetadata(key);
    return true;
  } catch (error) {
    console.error('Error removing from cache:', error);
    return false;
  }
};

// Verificar si existe en cache y no ha expirado
export const isCacheValid = async (key) => {
  try {
    const cacheKey = getCacheKey(key);
    const cached = await AsyncStorage.getItem(cacheKey);
    
    if (!cached) {
      return false;
    }
    
    const cacheData = JSON.parse(cached);
    return Date.now() <= cacheData.expiresAt;
  } catch (error) {
    console.error('Error checking cache validity:', error);
    return false;
  }
};

// Obtener con fallback a API
export const getCachedOrFetch = async (key, fetchFunction, ttl = CACHE_DURATION.MEDIUM) => {
  try {
    // Intentar obtener del cache primero
    const cachedData = await getFromCache(key);
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    // Si no hay cache, fetch desde API
    const freshData = await fetchFunction();
    
    // Guardar en cache para próxima vez
    await saveToCache(key, freshData, ttl);
    
    return { data: freshData, fromCache: false };
  } catch (error) {
    console.error('Error in getCachedOrFetch:', error);
    
    // Como último recurso, intentar cache expirado
    const cacheKey = getCacheKey(key);
    const expired = await AsyncStorage.getItem(cacheKey);
    if (expired) {
      const expiredData = JSON.parse(expired);
      console.warn('Using expired cache data due to fetch error');
      return { data: expiredData.data, fromCache: true, expired: true };
    }
    
    throw error;
  }
};

// METADATOS DEL CACHE

// Actualizar metadatos del cache
const updateCacheMetadata = async (key, cacheData) => {
  try {
    const metadata = await getCacheMetadata();
    metadata[key] = {
      timestamp: cacheData.timestamp,
      expiresAt: cacheData.expiresAt,
      size: JSON.stringify(cacheData.data).length,
    };
    
    await AsyncStorage.setItem(CACHE_METADATA_KEY, JSON.stringify(metadata));
  } catch (error) {
    console.error('Error updating cache metadata:', error);
  }
};

// Remover metadatos del cache
const removeCacheMetadata = async (key) => {
  try {
    const metadata = await getCacheMetadata();
    delete metadata[key];
    await AsyncStorage.setItem(CACHE_METADATA_KEY, JSON.stringify(metadata));
  } catch (error) {
    console.error('Error removing cache metadata:', error);
  }
};

// Obtener metadatos del cache
const getCacheMetadata = async () => {
  try {
    const metadata = await AsyncStorage.getItem(CACHE_METADATA_KEY);
    return metadata ? JSON.parse(metadata) : {};
  } catch (error) {
    console.error('Error getting cache metadata:', error);
    return {};
  }
};

// UTILIDADES DEL CACHE

// Obtener todas las keys del cache
export const getCacheKeys = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    return allKeys.filter(key => key.startsWith(CACHE_PREFIX));
  } catch (error) {
    console.error('Error getting cache keys:', error);
    return [];
  }
};

// Limpiar cache expirado
export const clearExpiredCache = async () => {
  try {
    const cacheKeys = await getCacheKeys();
    const expiredKeys = [];
    
    for (const fullKey of cacheKeys) {
      const key = fullKey.replace(CACHE_PREFIX, '');
      const isValid = await isCacheValid(key);
      if (!isValid) {
        expiredKeys.push(key);
      }
    }
    
    // Remover keys expiradas
    await Promise.all(expiredKeys.map(key => removeFromCache(key)));
    
    return { removedCount: expiredKeys.length };
  } catch (error) {
    console.error('Error clearing expired cache:', error);
    return { removedCount: 0 };
  }
};

// Limpiar todo el cache
export const clearCache = async () => {
  try {
    const cacheKeys = await getCacheKeys();
    await AsyncStorage.multiRemove([...cacheKeys, CACHE_METADATA_KEY]);
    return { clearedCount: cacheKeys.length };
  } catch (error) {
    console.error('Error clearing cache:', error);
    return { clearedCount: 0 };
  }
};

// Obtener estadísticas del cache
export const getCacheStats = async () => {
  try {
    const metadata = await getCacheMetadata();
    const keys = Object.keys(metadata);
    
    const stats = {
      totalItems: keys.length,
      totalSize: 0,
      validItems: 0,
      expiredItems: 0,
    };
    
    const now = Date.now();
    
    keys.forEach(key => {
      const item = metadata[key];
      stats.totalSize += item.size || 0;
      
      if (now <= item.expiresAt) {
        stats.validItems++;
      } else {
        stats.expiredItems++;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return {
      totalItems: 0,
      totalSize: 0,
      validItems: 0,
      expiredItems: 0,
    };
  }
};

// Constantes exportadas
export { CACHE_DURATION };