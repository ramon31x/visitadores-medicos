// src/components/layout/Header/index.js - ACTUALIZADO
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
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
  const theme = useTheme();
  const headerStyles = styles.getHeaderStyles(variant, theme);

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={headerStyles.backgroundColor} 
      />
      <View style={[headerStyles, style]} {...props}>
        <View style={styles.content(theme)}>
          {leftIcon && (
            <TouchableOpacity 
              onPress={onLeftPress}
              style={styles.iconButton(theme)}
            >
              {leftIcon}
            </TouchableOpacity>
          )}
          
          <View style={styles.titleContainer(theme)}>
            {title && (
              <Text style={styles.title(theme)} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle(theme)} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
          
          {rightIcon && (
            <TouchableOpacity 
              onPress={onRightPress}
              style={styles.iconButton(theme)}
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
