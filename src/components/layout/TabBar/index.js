// src/components/layout/TabBar/index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import styles from './styles';

const TabBar = ({ state, descriptors, navigation }) => {
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
    <View style={styles.container}>
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
              styles.tab,
              isFocused && styles.tabFocused
            ]}
          >
            <View style={[
              styles.tabIconContainer,
              isFocused && styles.tabIconContainerFocused
            ]}>
              <Text style={[
                styles.tabIcon,
                isFocused && styles.tabIconFocused
              ]}>
                {getTabIcon(route.name)}
              </Text>
            </View>
            
            <Text style={[
              styles.tabLabel,
              isFocused && styles.tabLabelFocused
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
