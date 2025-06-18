// src/components/ui/Button/index.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { theme } from '../../../theme';
import styles from './styles';

const Button = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  onPress, 
  disabled = false, 
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...props 
}) => {
  const buttonStyle = styles.getButtonStyle(variant, size, disabled);
  const textStyles = styles.getTextStyle(variant, size, disabled);

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={textStyles.color} 
          size="small" 
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[textStyles, textStyle]}>{children}</Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;