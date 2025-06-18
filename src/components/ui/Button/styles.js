// src/components/ui/Button/styles.js
import { theme } from '../../../theme';

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
  },

  getButtonStyle: (variant, size, disabled) => {
    const baseStyle = {
      borderRadius: theme.borderRadius.component.button,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows.button,
    };

    // Size variants
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

    // Variant styles
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
  },

  getTextStyle: (variant, size, disabled) => {
    const baseStyle = {
      ...theme.typography.styles.button,
      textAlign: 'center',
    };

    // Size text styles
    const sizeStyles = {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 }
    };

    // Variant text colors
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
  }
};

export default styles;