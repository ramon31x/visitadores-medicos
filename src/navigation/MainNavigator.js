// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Layout Components
import { TabBar } from '../components/layout';

// Screens
import { DashboardScreen, StatisticsScreen } from '../screens/dashboard';
import { WeeklyPlanScreen, PlanDetailScreen, AddVisitScreen } from '../screens/planning';
import { DoctorsListScreen, DoctorDetailScreen } from '../screens/doctors';
import { VisitsListScreen, VisitDetailScreen, SatisfactionFormScreen } from '../screens/visits';
import { ProfileScreen } from '../screens/profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigators para cada tab
const DashboardStack = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="DashboardHome" component={DashboardScreen} />
    <Stack.Screen name="Statistics" component={StatisticsScreen} />
  </Stack.Navigator>
);

const PlanningStack = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="WeeklyPlan" component={WeeklyPlanScreen} />
    <Stack.Screen name="PlanDetail" component={PlanDetailScreen} />
    <Stack.Screen name="AddVisit" component={AddVisitScreen} />
  </Stack.Navigator>
);

const DoctorsStack = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="DoctorsList" component={DoctorsListScreen} />
    <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
  </Stack.Navigator>
);

const VisitsStack = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="VisitsList" component={VisitsListScreen} />
    <Stack.Screen name="VisitDetail" component={VisitDetailScreen} />
    <Stack.Screen 
      name="SatisfactionForm" 
      component={SatisfactionFormScreen}
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="ProfileHome" component={ProfileScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardStack}
        options={{
          tabBarLabel: 'Inicio',
        }}
      />
      
      <Tab.Screen 
        name="Planning" 
        component={PlanningStack}
        options={{
          tabBarLabel: 'Planificación',
        }}
      />
      
      <Tab.Screen 
        name="Doctors" 
        component={DoctorsStack}
        options={{
          tabBarLabel: 'Médicos',
        }}
      />
      
      <Tab.Screen 
        name="Visits" 
        component={VisitsStack}
        options={{
          tabBarLabel: 'Visitas',
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;