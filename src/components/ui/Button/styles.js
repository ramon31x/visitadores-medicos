// src/components/ui/Button/styles.js
import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  danger: {
    backgroundColor: colors.error,
    borderWidth: 0,
  },

  success: {
    backgroundColor: colors.success,
    borderWidth: 0,
  },

  // Sizes
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 32,
  },
  
  medium: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  
  large: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 52,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  
  loading: {
    opacity: 0.8,
  },

  fullWidth: {
    width: '100%',
  },

  // Text styles
  text: {
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },
  
  // Text variants
  primaryText: {
    color: colors.white,
    fontWeight: '600',
  },
  
  secondaryText: {
    color: colors.primary,
    fontWeight: '600',
  },
  
  outlineText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  
  ghostText: {
    color: colors.primary,
    fontWeight: '500',
  },
  
  dangerText: {
    color: colors.white,
    fontWeight: '600',
  },

  successText: {
    color: colors.white,
    fontWeight: '600',
  },
  
  // Text sizes
  smallText: {
    fontSize: typography.fontSize.sm,
  },
  
  mediumText: {
    fontSize: typography.fontSize.base,
  },
  
  largeText: {
    fontSize: typography.fontSize.lg,
  },
  
  disabledText: {
    opacity: 0.7,
  },

  // Icon styles
  iconContainer: {
    marginRight: spacing.xs,
  },
  
  loader: {
    marginRight: 0,
  },
});