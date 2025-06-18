// src/components/layout/TabBar/index.js - ACTUALIZADO
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import styles from './styles';

const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();

  const getTabIcon = (routeName) => {
    const icons = {
      Dashboard: '📊',
      Planning: '📅', 
      Doctors: '👨‍⚕️',
      Visits: '🏥',
      Profile: '👤'
    };
    return icons[routeName] || '📱';
  };

  const getTabLabel = (routeName) => {
    const labels = {
      Dashboard: 'Inicio',
      Planning: 'Planificar',
      Doctors: 'Médicos', 
      Visits: 'Visitas',
      Profile: 'Perfil'
    };
    return labels[routeName] || routeName;
  };

  return (
    <View style={styles.container(theme)}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
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
              styles.tab(theme),
              isFocused && styles.tabFocused(theme)
            ]}
          >
            <View style={[
              styles.tabIconContainer(theme),
              isFocused && styles.tabIconContainerFocused(theme)
            ]}>
              <Text style={[
                styles.tabIcon(theme),
                isFocused && styles.tabIconFocused(theme)
              ]}>
                {getTabIcon(route.name)}
              </Text>
            </View>
            
            <Text style={[
              styles.tabLabel(theme),
              isFocused && styles.tabLabelFocused(theme)
            ]}>
              {getTabLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;