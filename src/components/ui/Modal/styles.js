// src/components/ui/Modal/styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    maxHeight: screenHeight * 0.8,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  
  // Variants
  default: {
    // Default styles
  },
  
  fullScreen: {
    width: screenWidth,
    height: screenHeight,
    borderRadius: 0,
    maxHeight: screenHeight,
  },
  
  // Sizes
  small: {
    width: Math.min(320, screenWidth - 40),
    maxWidth: 320,
  },
  
  medium: {
    width: Math.min(400, screenWidth - 40),
    maxWidth: 400,
  },
  
  large: {
    width: Math.min(600, screenWidth - 40),
    maxWidth: 600,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  title: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.primary,
    fontWeight: '600',
  },
  
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  
  closeIcon: {
    fontSize: 18,
    color: colors.text.secondary,
    fontWeight: 'bold',
  },
  
  // Body
  body: {
    padding: spacing.lg,
  },
  
  // Scrollable content
  scrollView: {
    maxHeight: screenHeight * 0.7,
  },
  
  scrollContent: {
    flexGrow: 1,
  },
  
  // Alert styles
  alertMessage: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  
  alertActions: {
    alignItems: 'center',
  },
  
  confirmActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  
  alertButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  
  confirmButton: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
  },
  
  alertButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
    fontWeight: '600',
  },
  
  confirmButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.white,
    fontWeight: '600',
  },
  
  cancelButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    fontWeight: '500',
  },
});