// src/components/layout/Header/styles.js
import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 56,
  },
  
  // Variants
  default: {
    backgroundColor: '#FFFFFF',
  },
  
  primary: {
    backgroundColor: '#007AFF',
  },
  
  auth: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  
  main: {
    backgroundColor: '#007AFF',
  },
  
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  
  // Action buttons
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Title section
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'left',
  },
  
  titleCentered: {
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  
  // Icons
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  
  notificationIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  
  searchIcon: {
    fontSize: 18,
    color: colors.text.primary,
  },
  
  filterIcon: {
    fontSize: 16,
    color: colors.text.primary,
  },
});