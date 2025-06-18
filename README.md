# 🏥 Sistema Visitadores Médicos

> Aplicación móvil para gestión de visitas médicas con firma digital y geolocalización

## 📱 **Descripción**

Sistema completo para visitadores médicos que permite planificar visitas, gestionar médicos, realizar formularios de satisfacción con firma digital y GPS, y generar reportes de rendimiento.

## 🎯 **Características Principales**

- 🔐 **Autenticación JWT** con persistencia
- 👨‍⚕️ **Gestión de médicos** por rutas asignadas
- 📅 **Planificación semanal** de visitas (mín. 8 médicos/día)
- 🏥 **Registro de visitas** realizadas
- 📝 **Formularios de satisfacción** con firma digital obligatoria
- 📍 **GPS obligatorio** para validar ubicación de visitas
- 📊 **Dashboard** con estadísticas y KPIs
- 💾 **Funcionamiento offline** con sincronización

## 🛠️ **Stack Tecnológico**

- **Frontend**: React Native + Expo
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Styling**: Theme system personalizado
- **Storage**: AsyncStorage + SecureStore
- **API**: Axios con interceptors
- **Firma Digital**: react-native-signature-canvas
- **Geolocalización**: expo-location
- **Backend**: Django REST API

## 📁 **Estructura del Proyecto**

```
visitadores-medicos/
├── 📱 src/
│   ├── 🎨 components/
│   │   ├── ui/                    # ✅ COMPLETO - Componentes base
│   │   │   ├── Button/           # ✅ Botones con variants
│   │   │   ├── Input/            # ✅ Inputs con validación
│   │   │   ├── Card/             # ✅ Cards con sombras
│   │   │   ├── Modal/            # ✅ Modales + Alert/Confirm
│   │   │   └── Loading/          # ✅ Loading + Skeleton + Overlay
│   │   ├── layout/               # ✅ COMPLETO - Layout components
│   │   │   ├── Header/           # ✅ Headers con variants
│   │   │   └── TabBar/           # ✅ TabBar personalizado
│   │   ├── forms/                # 🔄 PENDIENTE - Formularios específicos
│   │   │   ├── LoginForm/        # 📝 Por implementar
│   │   │   ├── PlanningForm/     # 📝 Por implementar
│   │   │   └── SatisfactionForm/ # 📝 Por implementar
│   │   └── signature/            # 🔄 PENDIENTE - Firma digital
│   │       └── SignatureCanvas/ # 📝 Por implementar
│   ├── 📱 screens/
│   │   ├── auth/                 # ✅ COMPLETO - Autenticación
│   │   │   ├── SplashScreen     # ✅ Pantalla inicial
│   │   │   └── LoginScreen      # ✅ Login funcional
│   │   ├── dashboard/            # 🔄 BÁSICO - Dashboard
│   │   │   ├── DashboardScreen  # ✅ Pantalla principal básica
│   │   │   └── StatisticsScreen # 🔄 Placeholder
│   │   ├── planning/             # 🔄 PLACEHOLDER - Planificación
│   │   │   ├── WeeklyPlanScreen # 🔄 Placeholder
│   │   │   ├── PlanDetailScreen # 🔄 Placeholder
│   │   │   └── AddVisitScreen   # 🔄 Placeholder
│   │   ├── doctors/              # 🔄 PLACEHOLDER - Médicos
│   │   │   ├── DoctorsListScreen # 🔄 Placeholder
│   │   │   └── DoctorDetailScreen # 🔄 Placeholder
│   │   ├── visits/               # 🔄 PLACEHOLDER - Visitas
│   │   │   ├── VisitsListScreen    # 🔄 Placeholder
│   │   │   ├── VisitDetailScreen   # 🔄 Placeholder
│   │   │   └── SatisfactionFormScreen # 🔄 Placeholder
│   │   └── profile/              # 🔄 PLACEHOLDER - Perfil
│   │       └── ProfileScreen    # 🔄 Placeholder
│   ├── 🗺️ navigation/            # ✅ COMPLETO - Navegación
│   │   ├── AuthNavigator        # ✅ Stack de autenticación
│   │   ├── MainNavigator        # ✅ Bottom tabs + stacks
│   │   └── RootNavigator        # ✅ Navegador principal
│   ├── 🏪 stores/                # ✅ COMPLETO - State management
│   │   ├── authStore            # ✅ Autenticación con persistencia
│   │   ├── doctorsStore         # ✅ Store para médicos
│   │   ├── planningStore        # ✅ Store para planificación
│   │   ├── visitsStore          # ✅ Store para visitas
│   │   ├── formsStore           # ✅ Store para formularios
│   │   └── offlineStore         # ✅ Store para datos offline
│   ├── 🌐 services/              # ✅ COMPLETO - Servicios
│   │   ├── api/                 # ✅ Cliente API completo
│   │   │   ├── client           # ✅ Axios con interceptors
│   │   │   ├── auth             # ✅ Endpoints de autenticación
│   │   │   ├── doctors          # ✅ Endpoints de médicos
│   │   │   ├── planning         # ✅ Endpoints de planificación
│   │   │   ├── visits           # ✅ Endpoints de visitas
│   │   │   └── forms            # ✅ Endpoints de formularios
│   │   ├── storage/             # ✅ Storage completo
│   │   │   ├── auth             # ✅ Persistencia de autenticación
│   │   │   ├── cache            # ✅ Cache de datos
│   │   │   └── offline          # ✅ Datos offline
│   │   └── location/            # ✅ Servicios GPS
│   │       ├── gps              # ✅ Obtener ubicación
│   │       └── permissions      # ✅ Permisos de ubicación
│   ├── 🎨 theme/                 # ✅ COMPLETO - Sistema de diseño
│   │   ├── colors               # ✅ Paleta de colores
│   │   ├── typography           # ✅ Tipografías
│   │   ├── spacing              # ✅ Espaciados
│   │   └── dimensions           # ✅ Dimensiones
│   ├── 🔧 utils/                 # ✅ COMPLETO - Utilidades
│   │   ├── constants            # ✅ Configuración API
│   │   ├── helpers              # ✅ Funciones auxiliares
│   │   ├── validators           # ✅ Validaciones
│   │   └── formatters           # ✅ Formateo de datos
│   ├── 🪝 hooks/                 # 🔄 BÁSICO - Hooks personalizados
│   │   └── useStatusBar         # ✅ Hook para StatusBar
│   └── App.js                   # ✅ COMPLETO - App principal
├── 📦 package.json              # ✅ Dependencias instaladas
├── 🔧 app.json                  # ✅ Configuración Expo
└── 📝 babel.config.js           # ✅ Configuración Babel
```

## 🚀 **Estado Actual**

### ✅ **COMPLETADO (100% Funcional)**

#### 🎨 **UI/UX System**
- **Componentes UI**: Button, Input, Card, Modal, Loading con variants
- **Layout Components**: Header, TabBar personalizados
- **Theme System**: Colores, tipografías, espaciados consistentes
- **Navegación**: 5 tabs principales + stacks anidados

#### 🔐 **Autenticación**
- **Login completo** con validaciones
- **JWT persistence** con AsyncStorage
- **Auto-login** en reinicio de app
- **Logout** con limpieza de datos

#### 🗺️ **Navegación**
- **Bottom Tabs**: Dashboard, Planning, Doctors, Visits, Profile
- **Stack Navigation** en cada sección
- **Auth Flow**: Splash → Login → Main
- **Back buttons** funcionando

#### 🏪 **State Management**
- **Zustand stores** configurados
- **API client** con Axios + interceptors
- **Storage services** para persistencia
- **GPS services** configurados

#### 🌐 **Backend Integration**
- **API endpoints** mapeados
- **Authentication flow** funcionando
- **Error handling** implementado
- **Network interceptors** configurados

### 🔄 **EN DESARROLLO**

#### 📱 **Pantallas Funcionales**
- **DashboardScreen**: Básico funcional, falta conectar APIs
- **Pantallas principales**: Placeholder, falta implementar lógica

### 📝 **PENDIENTE (Por Implementar)**

#### 🏥 **Funcionalidades Core**
1. **Lista de Médicos**: Conectar con API `/api/medicos`
2. **Planificación Semanal**: CRUD de planes con validaciones
3. **Gestión de Visitas**: Realizar y listar visitas
4. **Formulario de Satisfacción**: Forma compleja con firma + GPS
5. **Dashboard Real**: Estadísticas desde API

#### 📝 **Componentes Específicos**
- **SignatureCanvas**: Captura de firma digital
- **Forms**: LoginForm, SatisfactionForm, PlanningForm
- **Maps Integration**: Mostrar ubicaciones
- **Offline Sync**: Sincronización de datos

#### 🪝 **Hooks Personalizados**
- **useAuth**: Hook de autenticación
- **useLocation**: Hook de geolocalización
- **useApi**: Hook para llamadas API
- **useOffline**: Hook para modo offline

## 🔧 **Instalación y Configuración**

### **Prerrequisitos**
```bash
Node.js >= 16
npm >= 8
Expo CLI
Android Studio (para Android)
```

### **Instalación**
```bash
# Clonar repositorio
git clone [repo-url]
cd visitadores-medicos

# Instalar dependencias
npm install

# Instalar dependencias adicionales de Expo
npx expo install react-native-safe-area-context

# Ejecutar aplicación
npx expo start
```

### **Configuración del Backend**
```javascript
// src/utils/constants.js
export const API_CONFIG = {
  BASE_URL: 'http://10.20.100.62:8590/api', // Cambiar por tu URL
  TIMEOUT: 10000,
};
```

### **Credenciales de Prueba**
```
Usuario: visitador1
Contraseña: 123456
```

## 📋 **API Endpoints Disponibles**

### 🔐 **Autenticación**
- `POST /api/auth/login` - Login con JWT
- `POST /api/auth/refresh` - Renovar token
- `GET /api/perfil` - Perfil del usuario

### 👨‍⚕️ **Médicos**
- `GET /api/medicos` - Lista de médicos de la ruta
- `GET /api/medicos/{id}` - Detalle de médico

### 📅 **Planificación**
- `GET /api/planes` - Planes semanales
- `POST /api/planes` - Crear plan semanal
- `GET /api/planes/{id}` - Detalle del plan
- `POST /api/planes/{id}/visitas` - Agregar visita

### 🏥 **Visitas**
- `POST /api/visitas/realizar` - Realizar visita
- `GET /api/visitas/realizadas` - Historial de visitas

### 📝 **Formularios**
- `POST /api/formularios` - Crear formulario de satisfacción
- `GET /api/formularios` - Lista de formularios

### 📊 **Estadísticas**
- `GET /api/estadisticas` - Stats del visitador
- `GET /api/analytics/kpis` - KPIs principales

## 🎯 **Roadmap de Desarrollo**

### **FASE 1 - Funcionalidades Core** (Próximo)
- [ ] Lista de Médicos con datos reales
- [ ] Planificación semanal funcional
- [ ] Formulario de satisfacción básico

### **FASE 2 - Características Avanzadas**
- [ ] Firma digital con SignatureCanvas
- [ ] GPS obligatorio en formularios
- [ ] Validaciones de negocio
- [ ] Dashboard con estadísticas reales

### **FASE 3 - Optimizaciones**
- [ ] Modo offline completo
- [ ] Sincronización automática
- [ ] Notificaciones push
- [ ] Performance optimizations

## 🧪 **Testing**

### **Funcionalidades Probadas**
- ✅ Login/Logout
- ✅ Navegación entre pantallas
- ✅ Persistencia de sesión
- ✅ Componentes UI
- ✅ Responsive design

### **Por Probar**
- [ ] Integración con API real
- [ ] Formularios complejos
- [ ] GPS y permisos
- [ ] Funcionamiento offline

## 📱 **Compatibilidad**

- **Platform**: Android (desarrollo principal)
- **Expo Go**: ✅ Compatible
- **Build**: Listo para builds de producción
- **Minimum SDK**: Android 21+

## 👥 **Equipo de Desarrollo**

- **Frontend**: React Native + Expo
- **Backend**: Django REST API
- **Database**: PostgreSQL

## 📄 **Licencia**

Proyecto propietario - Todos los derechos reservados

---

## 🚀 **Para Continuar el Desarrollo**

### **Estado Actual**: 
Base funcional completa con navegación, autenticación y componentes UI profesionales.

### **Próximo Paso**: 
Implementar funcionalidades reales comenzando por la **Lista de Médicos** conectada al API.

### **Tiempo Estimado**: 
- Lista de Médicos: 2-3 horas
- Planificación: 4-5 horas  
- Formularios con Firma + GPS: 6-8 horas
- Dashboard completo: 3-4 horas

**Total para MVP funcional: ~15-20 horas de desarrollo**