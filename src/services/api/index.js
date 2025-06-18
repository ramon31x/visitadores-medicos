// Cliente base
export { default as apiClient } from './client';

// Endpoints
export * from './endpoints';

// Servicios por módulo
export * as authAPI from './auth';
export * as doctorsAPI from './doctors';
export * as planningAPI from './planning';
export * as visitsAPI from './visits';
export * as formsAPI from './forms';

// Re-export individual functions for convenience
export {
  // Auth
  login,
  refreshToken,
  getProfile,
} from './auth';

export {
  // Doctors
  getDoctors,
  getDoctorDetail,
  searchDoctors,
  getActiveDoctors,
} from './doctors';

export {
  // Planning
  getPlans,
  getPlanDetail,
  createPlan,
  updatePlan,
  addVisitToPlan,
  removeVisitFromPlan,
  getCurrentWeekPlan,
} from './planning';

export {
  // Visits
  performVisit,
  getPerformedVisits,
  getVisitsByDateRange,
  getTodayVisits,
  getVisitsByStatus,
} from './visits';

export {
  // Forms
  createSatisfactionForm,
  getForms,
  getFormByVisitId,
  getFormsByDateRange,
  validateFormData,
} from './forms';