import * as Location from 'expo-location';
import { requestLocationPermissions } from './permissions';

// Configuración de precisión GPS
const GPS_CONFIG = {
  accuracy: Location.Accuracy.High,
  timeout: 15000, // 15 segundos
  maximumAge: 10000, // Cache de 10 segundos
};

// Configuración para formularios (más preciso)
const FORM_GPS_CONFIG = {
  accuracy: Location.Accuracy.Highest,
  timeout: 20000, // 20 segundos
  maximumAge: 5000, // Cache de 5 segundos
};

// Obtener ubicación actual
export const getCurrentLocation = async (config = GPS_CONFIG) => {
  try {
    // Verificar permisos primero
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) {
      throw new Error('Permisos de ubicación denegados');
    }
    
    // Obtener ubicación
    const location = await Location.getCurrentPositionAsync(config);
    
    if (!location || !location.coords) {
      throw new Error('No se pudo obtener la ubicación');
    }
    
    const { coords } = location;
    
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      heading: coords.heading,
      speed: coords.speed,
      timestamp: new Date(location.timestamp).toISOString(),
      provider: 'gps',
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    throw new Error(`Error al obtener ubicación: ${error.message}`);
  }
};

// Obtener ubicación para formularios (máxima precisión)
export const getLocationForForm = async () => {
  try {
    const location = await getCurrentLocation(FORM_GPS_CONFIG);
    
    // Validaciones adicionales para formularios
    if (!location.latitude || !location.longitude) {
      throw new Error('Coordenadas GPS inválidas');
    }
    
    if (location.accuracy > 50) { // Más de 50 metros de error
      console.warn('Baja precisión GPS:', location.accuracy);
    }
    
    // Agregar información adicional para formularios
    const enhancedLocation = {
      ...location,
      battery_level: await getBatteryLevel(),
      network_type: await getNetworkType(),
      form_timestamp: new Date().toISOString(),
    };
    
    return enhancedLocation;
  } catch (error) {
    console.error('Error getting location for form:', error);
    throw error;
  }
};

// Verificar si GPS está habilitado
export const isLocationEnabled = async () => {
  try {
    const enabled = await Location.hasServicesEnabledAsync();
    return enabled;
  } catch (error) {
    console.error('Error checking location services:', error);
    return false;
  }
};

// Obtener dirección aproximada (geocoding reverso)
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    
    if (addresses && addresses.length > 0) {
      const address = addresses[0];
      
      // Construir dirección legible
      const parts = [
        address.name,
        address.street,
        address.district,
        address.city,
        address.region,
        address.country,
      ].filter(Boolean);
      
      return {
        formatted: parts.join(', '),
        details: address,
      };
    }
    
    return {
      formatted: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      details: null,
    };
  } catch (error) {
    console.error('Error getting address:', error);
    // Fallback: devolver coordenadas
    return {
      formatted: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      details: null,
    };
  }
};

// Calcular distancia entre dos puntos (en metros)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

// Validar coordenadas GPS
export const validateCoordinates = (latitude, longitude) => {
  const errors = [];
  
  if (typeof latitude !== 'number' || isNaN(latitude)) {
    errors.push('Latitud inválida');
  } else if (latitude < -90 || latitude > 90) {
    errors.push('Latitud fuera de rango');
  }
  
  if (typeof longitude !== 'number' || isNaN(longitude)) {
    errors.push('Longitud inválida');
  } else if (longitude < -180 || longitude > 180) {
    errors.push('Longitud fuera de rango');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// FUNCIONES AUXILIARES

// Obtener nivel de batería (si está disponible)
const getBatteryLevel = async () => {
  try {
    // Nota: En Expo, necesitarías expo-battery
    // Por ahora, retornamos null
    return null;
  } catch (error) {
    return null;
  }
};

// Obtener tipo de red (si está disponible)
const getNetworkType = async () => {
  try {
    // Nota: En Expo, necesitarías @react-native-community/netinfo
    // Por ahora, retornamos 'unknown'
    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
};

// Formatear coordenadas para display
export const formatCoordinates = (latitude, longitude, precision = 6) => {
  if (!latitude || !longitude) {
    return 'Coordenadas no disponibles';
  }
  
  const lat = parseFloat(latitude).toFixed(precision);
  const lon = parseFloat(longitude).toFixed(precision);
  
  return `${lat}, ${lon}`;
};

// Obtener precisión en texto legible
export const getAccuracyText = (accuracy) => {
  if (!accuracy) return 'Precisión desconocida';
  
  if (accuracy <= 5) return 'Muy alta';
  if (accuracy <= 10) return 'Alta';
  if (accuracy <= 20) return 'Buena';
  if (accuracy <= 50) return 'Regular';
  return 'Baja';
};

// Hook personalizado para usar en componentes
export const useGPS = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const getCurrentPosition = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const position = await getCurrentLocation();
      setLocation(position);
      
      return position;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    location,
    isLoading,
    error,
    getCurrentPosition,
  };
};