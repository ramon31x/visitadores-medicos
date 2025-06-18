// src/components/ui/Card/styles.js
import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  
  content: {
    flex: 1,
  },
  
  // Variants
  default: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  filled: {
    backgroundColor: colors.background.secondary,
    borderWidth: 0,
  },
  
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  elevated: {
    backgroundColor: colors.white,
    borderWidth: 0,
  },
  
  // Elevation (sombras simuladas con borderBottom en Android)
  none: {
    elevation: 0,
    shadowOpacity: 0,
  },
  
  low: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  
  medium: {
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  
  high: {
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  // Padding variants
  none: {
    padding: 0,
  },
  
  small: {
    padding: spacing.sm,
  },
  
  medium: {
    padding: spacing.md,
  },
  
  large: {
    padding: spacing.lg,
  },
  
  // States
  disabled: {
    opacity: 0.6,
  },
  
  // Card sections
  header: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  
  body: {
    flex: 1,
  },
  
  footer: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
  },
  
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
});