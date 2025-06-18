// src/components/ui/Loading/styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Variants
  default: {
    padding: spacing.md,
  },
  
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
  },
  
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  
  // Overlay styles
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
    zIndex: 9999,
    elevation: 9999,
  },
  
  spinner: {
    marginBottom: spacing.sm,
  },
  
  // Text styles
  text: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
  
  defaultText: {
    color: colors.text.secondary,
  },
  
  primaryText: {
    color: colors.white,
    fontWeight: '500',
  },
  
  overlayText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  
  // Skeleton styles
  skeletonContainer: {
    padding: spacing.sm,
  },
  
  skeletonLine: {
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
  },
});