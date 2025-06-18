// src/components/ui/Card/styles.js
import { theme } from '../../../theme';

const styles = {
  getCardStyle: (variant, padding) => {
    const baseStyle = {
      borderRadius: theme.borderRadius.component.card,
      ...theme.shadows.card,
    };

    // Padding variants
    const paddingStyles = {
      none: { padding: 0 },
      sm: { padding: theme.spacing[3] },
      md: { padding: theme.spacing[4] },
      lg: { padding: theme.spacing[6] }
    };

    // Variant styles
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
  }
};

export default styles;