// src/components/layout/TabBar/styles.js
import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // Variants
  default: {
    backgroundColor: colors.white,
  },
  
  primary: {
    backgroundColor: colors.primary,
  },
  
  dark: {
    backgroundColor: colors.background.dark,
    borderTopColor: colors.border,
  },
  
  // Tab styles
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    minHeight: 60,
  },
  
  tabActive: {
    // Active tab styles handled by individual elements
  },
  
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  
  // Icon styles
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  icon: {
    fontSize: 20,
    marginBottom: spacing.xs,
    color: colors.text.secondary,
  },
  
  iconActive: {
    color: colors.primary,
    fontSize: 22,
  },
  
  // Label styles
  label: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 2,
  },
  
  labelActive: {
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
  
  // Active indicator
  indicator: {
    position: 'absolute',
    top: -spacing.sm - 2,
    width: 4,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  
  // Badge styles
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});