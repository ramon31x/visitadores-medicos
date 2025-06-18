// src/components/ui/Input/styles.js
import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  
  labelFocused: {
    color: colors.primary,
  },
  
  labelError: {
    color: colors.error,
  },
  
  labelDisabled: {
    color: colors.text.disabled,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
  },
  
  // Variants
  default: {
    borderColor: colors.border,
  },
  
  filled: {
    backgroundColor: colors.background.tertiary,
    borderColor: 'transparent',
  },
  
  // Sizes
  small: {
    minHeight: 36,
    paddingHorizontal: spacing.sm,
  },
  
  medium: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  
  large: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  
  // States
  focused: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.white,
  },
  
  error: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  
  disabled: {
    backgroundColor: colors.background.disabled,
    borderColor: colors.border,
    opacity: 0.6,
  },
  
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    padding: 0, // Remove default padding
  },
  
  // Input sizes
  smallInput: {
    fontSize: typography.fontSize.sm,
  },
  
  mediumInput: {
    fontSize: typography.fontSize.base,
  },
  
  largeInput: {
    fontSize: typography.fontSize.lg,
  },
  
  multilineInput: {
    textAlignVertical: 'top',
    paddingVertical: spacing.sm,
  },
  
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  
  inputWithRightIcon: {
    marginRight: spacing.sm,
  },
  
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  
  iconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  toggleIcon: {
    fontSize: 16,
  },
  
  placeholder: {
    color: colors.text.placeholder,
  },
  
  errorText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  
  helperText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});