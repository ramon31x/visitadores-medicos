// src/components/ui/Button/index.js - CORREGIDO
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

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
  const theme = useTheme();
  
  // Generar estilos dinámicamente
  const buttonStyle = getButtonStyle(variant, size, disabled, theme);
  const textStyles = getTextStyle(variant, size, disabled, theme);
  
  const styles = {
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      marginRight: theme.spacing[2],
    },
    rightIcon: {
      marginLeft: theme.spacing[2],
    }
  };

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

const getButtonStyle = (variant, size, disabled, theme) => {
  const baseStyle = {
    borderRadius: theme.borderRadius.component.button,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.button,
  };

  const sizeStyles = {
    sm: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      minHeight: 36,
    },
    md: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      minHeight: 44,
    },
    lg: {
      paddingHorizontal: 32,
      paddingVertical: 16,
      minHeight: 52,
    }
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? theme.colors.neutral[300] : theme.colors.primary[500],
    },
    secondary: {
      backgroundColor: disabled ? theme.colors.neutral[200] : theme.colors.secondary[500],
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: disabled ? theme.colors.neutral[300] : theme.colors.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: disabled ? theme.colors.neutral[300] : theme.colors.status.error,
    }
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

const getTextStyle = (variant, size, disabled, theme) => {
  const baseStyle = {
    ...theme.typography.styles.button,
    textAlign: 'center',
  };

  const sizeStyles = {
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 }
  };

  const variantStyles = {
    primary: {
      color: disabled ? theme.colors.text.disabled : theme.colors.text.inverse,
    },
    secondary: {
      color: disabled ? theme.colors.text.disabled : theme.colors.text.inverse,
    },
    outline: {
      color: disabled ? theme.colors.text.disabled : theme.colors.primary[500],
    },
    ghost: {
      color: disabled ? theme.colors.text.disabled : theme.colors.primary[500],
    },
    danger: {
      color: disabled ? theme.colors.text.disabled : theme.colors.text.inverse,
    }
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

export default Button;