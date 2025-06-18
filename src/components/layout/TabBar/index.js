// src/components/layout/TabBar/index.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

const TabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  // Configuración de iconos para cada tab
  const getTabIcon = (routeName, focused) => {
    const iconMap = {
      Dashboard: focused ? '🏠' : '🏠',
      Planning: focused ? '📅' : '📅',
      Doctors: focused ? '👨‍⚕️' : '👨‍⚕️',
      Visits: focused ? '🏥' : '🏥',
      Profile: focused ? '👤' : '👤',
    };
    
    return iconMap[routeName] || '📄';
  };

  // Configuración de labels más legibles
  const getTabLabel = (routeName) => {
    const labelMap = {
      Dashboard: 'Inicio',
      Planning: 'Planificación',
      Doctors: 'Médicos',
      Visits: 'Visitas',
      Profile: 'Perfil',
    };
    
    return labelMap[routeName] || routeName;
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = getTabLabel(route.name);
        const icon = getTabIcon(route.name, state.index === index);
        
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tab,
              isFocused && styles.tabActive,
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Text style={[
                styles.icon,
                isFocused && styles.iconActive,
              ]}>
                {icon}
              </Text>
              <Text style={[
                styles.label,
                isFocused && styles.labelActive,
              ]}>
                {label}
              </Text>
              {isFocused && <View style={styles.indicator} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// TabBar personalizado para diferentes variantes
TabBar.Custom = ({ 
  tabs = [], 
  activeTab = 0, 
  onTabPress, 
  variant = 'default',
  showLabels = true,
  showIcons = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      styles[variant],
      { paddingBottom: insets.bottom }
    ]}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === index;
        
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              isActive && styles.tabActive,
            ]}
            onPress={() => onTabPress && onTabPress(index)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              {showIcons && tab.icon && (
                <Text style={[
                  styles.icon,
                  isActive && styles.iconActive,
                ]}>
                  {tab.icon}
                </Text>
              )}
              {showLabels && (
                <Text style={[
                  styles.label,
                  isActive && styles.labelActive,
                ]}>
                  {tab.label}
                </Text>
              )}
              {isActive && <View style={styles.indicator} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// TabBar con badge de notificaciones
TabBar.WithBadge = ({ state, descriptors, navigation, badges = {} }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = getTabLabel(route.name);
        const icon = getTabIcon(route.name, state.index === index);
        const badge = badges[route.name];
        
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.tabActive]}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconContainer}>
                <Text style={[styles.icon, isFocused && styles.iconActive]}>
                  {icon}
                </Text>
                {badge && badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {badge > 99 ? '99+' : badge}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[styles.label, isFocused && styles.labelActive]}>
                {label}
              </Text>
              {isFocused && <View style={styles.indicator} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;