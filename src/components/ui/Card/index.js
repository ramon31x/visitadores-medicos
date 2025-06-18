// src/components/ui/Card/index.js - CORREGIDO
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'md',
  style,
  ...props 
}) => {
  const theme = useTheme();
  const cardStyle = getCardStyle(variant, padding, theme);

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

const getCardStyle = (variant, padding, theme) => {
  const baseStyle = {
    borderRadius: theme.borderRadius.component.card,
    ...theme.shadows.card,
  };

  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: theme.spacing[3] },
    md: { padding: theme.spacing[4] },
    lg: { padding: theme.spacing[6] }
  };

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.surface.primary,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
    },
    elevated: {
      backgroundColor: theme.colors.surface.elevated,
      ...theme.shadows.lg,
    },
    outlined: {
      backgroundColor: theme.colors.surface.primary,
      borderWidth: 1.5,
      borderColor: theme.colors.border.medium,
    },
    ghost: {
      backgroundColor: 'transparent',
    }
  };

  return {
    ...baseStyle,
    ...paddingStyles[padding],
    ...variantStyles[variant],
  };
};

export default Card;