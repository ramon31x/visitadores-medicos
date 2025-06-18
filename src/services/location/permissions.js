import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

// Solicitar permisos de ubicación
export const requestLocationPermissions = async () => {
  try {
    // Verificar si ya tenemos permisos
    const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
    
    if (existingStatus === 'granted') {
      return true;
    }
    
    // Solicitar permisos
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      return true;
    }
    
    // Si no se conceden, mostrar explicación
    if (status === 'denied') {
      showPermissionDeniedAlert();
    }
    
    return false;
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return false;
  }
};

// Verificar estado actual de permisos
export const checkLocationPermissions = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    
    return {
      granted: status === 'granted',
      denied: status === 'denied',
      canAskAgain: status !== 'denied',
      status,
    };
  } catch (error) {
    console.error('Error checking location permissions:', error);
    return {
      granted: false,
      denied: true,
      canAskAgain: false,
      status: 'undetermined',
    };
  }
};

// Mostrar alerta cuando se deniegan permisos
const showPermissionDeniedAlert = () => {
  Alert.alert(
    'Permisos de Ubicación Requeridos',
    'Esta aplicación necesita acceso a tu ubicación para registrar las visitas médicas con precisión.\n\n¿Deseas abrir la configuración para habilitar los permisos?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Abrir Configuración',
        onPress: () => Linking.openSettings(),
      },
    ],
    { cancelable: false }
  );
};

// Mostrar alerta cuando el GPS está deshabilitado
export const showGPSDisabledAlert = () => {
  Alert.alert(
    'GPS Deshabilitado',
    'El GPS de tu dispositivo está deshabilitado. Para registrar visitas médicas necesitas habilitar la ubicación.\n\n¿Deseas abrir la configuración?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Abrir Configuración',
        onPress: () => Linking.openSettings(),
      },
    ],
    { cancelable: false }
  );
};

// Verificar si el GPS está habilitado
export const checkGPSEnabled = async () => {
  try {
    const enabled = await Location.hasServicesEnabledAsync();
    
    if (!enabled) {
      showGPSDisabledAlert();
    }
    
    return enabled;
  } catch (error) {
    console.error('Error checking GPS enabled:', error);
    return false;
  }
};

// Verificación completa de ubicación (permisos + GPS)
export const ensureLocationAvailable = async () => {
  try {
    // 1. Verificar si el GPS está habilitado
    const gpsEnabled = await checkGPSEnabled();
    if (!gpsEnabled) {
      return {
        available: false,
        reason: 'GPS deshabilitado',
      };
    }
    
    // 2. Verificar/solicitar permisos
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) {
      return {
        available: false,
        reason: 'Permisos denegados',
      };
    }
    
    return {
      available: true,
      reason: 'Ubicación disponible',
    };
  } catch (error) {
    console.error('Error ensuring location available:', error);
    return {
      available: false,
      reason: `Error: ${error.message}`,
    };
  }
};

// Guía paso a paso para habilitar ubicación
export const showLocationSetupGuide = () => {
  Alert.alert(
    'Configurar Ubicación',
    'Para usar esta función necesitas:\n\n1. Habilitar GPS en tu dispositivo\n2. Conceder permisos de ubicación a la app\n3. Permitir ubicación precisa\n\n¿Quieres ir a configuración?',
    [
      {
        text: 'Más tarde',
        style: 'cancel',
      },
      {
        text: 'Configurar',
        onPress: () => Linking.openSettings(),
      },
    ]
  );
};

// Verificar permisos antes de usar formularios
export const verifyLocationForForms = async () => {
  try {
    const availability = await ensureLocationAvailable();
    
    if (!availability.available) {
      Alert.alert(
        'Ubicación Requerida',
        `No se puede completar el formulario sin ubicación.\n\nMotivo: ${availability.reason}\n\nLa ubicación GPS es obligatoria para validar las visitas médicas.`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Configurar',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying location for forms:', error);
    return false;
  }
};

// Estados de permisos
export const PERMISSION_STATUS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  UNDETERMINED: 'undetermined',
};

// Mensajes de error comunes
export const LOCATION_ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Permisos de ubicación denegados',
  GPS_DISABLED: 'GPS deshabilitado en el dispositivo',
  LOCATION_UNAVAILABLE: 'Ubicación no disponible',
  TIMEOUT: 'Tiempo de espera agotado para obtener ubicación',
  ACCURACY_LOW: 'Precisión GPS muy baja',
};