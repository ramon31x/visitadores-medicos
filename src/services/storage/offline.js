import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys para diferentes tipos de datos offline
const KEYS = {
  OFFLINE_FORMS: 'offline_forms',
  PENDING_OPERATIONS: 'pending_operations',
  OFFLINE_VISITS: 'offline_visits',
  CACHE_TIMESTAMP: 'cache_timestamp',
};

// FORMULARIOS OFFLINE

// Guardar formulario offline
export const saveOfflineForm = async (formData) => {
  try {
    const existingForms = await getOfflineForms();
    const newForm = {
      ...formData,
      id: `offline_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    
    const updatedForms = [...existingForms, newForm];
    await AsyncStorage.setItem(KEYS.OFFLINE_FORMS, JSON.stringify(updatedForms));
    
    return newForm;
  } catch (error) {
    console.error('Error saving offline form:', error);
    throw new Error('Error al guardar formulario offline');
  }
};

// Obtener formularios offline
export const getOfflineForms = async () => {
  try {
    const forms = await AsyncStorage.getItem(KEYS.OFFLINE_FORMS);
    return forms ? JSON.parse(forms) : [];
  } catch (error) {
    console.error('Error getting offline forms:', error);
    return [];
  }
};

// Remover formulario offline (después de sync exitoso)
export const removeOfflineForm = async (formId) => {
  try {
    const existingForms = await getOfflineForms();
    const updatedForms = existingForms.filter(form => form.id !== formId);
    await AsyncStorage.setItem(KEYS.OFFLINE_FORMS, JSON.stringify(updatedForms));
    return true;
  } catch (error) {
    console.error('Error removing offline form:', error);
    return false;
  }
};

// OPERACIONES PENDIENTES

// Guardar operación pendiente
export const savePendingOperation = async (operation) => {
  try {
    const existingOps = await getPendingOperations();
    const newOperation = {
      ...operation,
      id: `op_${Date.now()}`,
      timestamp: new Date().toISOString(),
      retryCount: 0,
    };
    
    const updatedOps = [...existingOps, newOperation];
    await AsyncStorage.setItem(KEYS.PENDING_OPERATIONS, JSON.stringify(updatedOps));
    
    return newOperation;
  } catch (error) {
    console.error('Error saving pending operation:', error);
    throw error;
  }
};

// Obtener operaciones pendientes
export const getPendingOperations = async () => {
  try {
    const operations = await AsyncStorage.getItem(KEYS.PENDING_OPERATIONS);
    return operations ? JSON.parse(operations) : [];
  } catch (error) {
    console.error('Error getting pending operations:', error);
    return [];
  }
};

// Remover operación pendiente
export const removePendingOperation = async (operationId) => {
  try {
    const existingOps = await getPendingOperations();
    const updatedOps = existingOps.filter(op => op.id !== operationId);
    await AsyncStorage.setItem(KEYS.PENDING_OPERATIONS, JSON.stringify(updatedOps));
    return true;
  } catch (error) {
    console.error('Error removing pending operation:', error);
    return false;
  }
};

// VISITAS OFFLINE

// Guardar visita offline
export const saveOfflineVisit = async (visitData) => {
  try {
    const existingVisits = await getOfflineVisits();
    const newVisit = {
      ...visitData,
      id: `visit_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    
    const updatedVisits = [...existingVisits, newVisit];
    await AsyncStorage.setItem(KEYS.OFFLINE_VISITS, JSON.stringify(updatedVisits));
    
    return newVisit;
  } catch (error) {
    console.error('Error saving offline visit:', error);
    throw error;
  }
};

// Obtener visitas offline
export const getOfflineVisits = async () => {
  try {
    const visits = await AsyncStorage.getItem(KEYS.OFFLINE_VISITS);
    return visits ? JSON.parse(visits) : [];
  } catch (error) {
    console.error('Error getting offline visits:', error);
    return [];
  }
};

// Remover visita offline
export const removeOfflineVisit = async (visitId) => {
  try {
    const existingVisits = await getOfflineVisits();
    const updatedVisits = existingVisits.filter(visit => visit.id !== visitId);
    await AsyncStorage.setItem(KEYS.OFFLINE_VISITS, JSON.stringify(updatedVisits));
    return true;
  } catch (error) {
    console.error('Error removing offline visit:', error);
    return false;
  }
};

// UTILIDADES

// Limpiar todos los datos offline
export const clearAllOfflineData = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(KEYS.OFFLINE_FORMS),
      AsyncStorage.removeItem(KEYS.PENDING_OPERATIONS),
      AsyncStorage.removeItem(KEYS.OFFLINE_VISITS),
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing offline data:', error);
    return false;
  }
};

// Obtener estadísticas de datos offline
export const getOfflineStats = async () => {
  try {
    const [forms, operations, visits] = await Promise.all([
      getOfflineForms(),
      getPendingOperations(),
      getOfflineVisits(),
    ]);
    
    return {
      formsCount: forms.length,
      operationsCount: operations.length,
      visitsCount: visits.length,
      totalPending: forms.length + operations.length + visits.length,
    };
  } catch (error) {
    console.error('Error getting offline stats:', error);
    return {
      formsCount: 0,
      operationsCount: 0,
      visitsCount: 0,
      totalPending: 0,
    };
  }
};

// Actualizar timestamp del cache
export const updateCacheTimestamp = async () => {
  try {
    const timestamp = new Date().toISOString();
    await AsyncStorage.setItem(KEYS.CACHE_TIMESTAMP, timestamp);
    return timestamp;
  } catch (error) {
    console.error('Error updating cache timestamp:', error);
    return null;
  }
};

// Obtener último timestamp del cache
export const getCacheTimestamp = async () => {
  try {
    return await AsyncStorage.getItem(KEYS.CACHE_TIMESTAMP);
  } catch (error) {
    console.error('Error getting cache timestamp:', error);
    return null;
  }
};