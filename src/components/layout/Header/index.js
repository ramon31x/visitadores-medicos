// src/components/layout/Header/index.js
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { theme } from '../../../theme';
import styles from './styles';

const Header = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'default',
  style,
  ...props
}) => {
  const headerStyles = styles.getHeaderStyles(variant);

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={headerStyles.backgroundColor} 
      />
      <View style={[headerStyles, style]} {...props}>
        <View style={styles.content}>
          {leftIcon && (
            <TouchableOpacity 
              onPress={onLeftPress}
              style={styles.iconButton}
            >
              {leftIcon}
            </TouchableOpacity>
          )}
          
          <View style={styles.titleContainer}>
            {title && (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
          
          {rightIcon && (
            <TouchableOpacity 
              onPress={onRightPress}
              style={styles.iconButton}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default Header;