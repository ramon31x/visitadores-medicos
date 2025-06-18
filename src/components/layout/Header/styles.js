// src/components/layout/Header/styles.js
import { StatusBar } from 'react-native';
import { theme } from '../../../theme';

const styles = {
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: theme.spacing[4],
    alignItems: 'center',
  },
  title: {
    ...theme.typography.styles.h4,
    color: theme.colors.text.primary,
    marginBottom: 0,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
    textAlign: 'center',
  },
  iconButton: {
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  getHeaderStyles: (variant) => {
    const baseStyle = {
      paddingHorizontal: theme.spacing[5],
      paddingTop: StatusBar.currentHeight || theme.spacing[6],
      paddingBottom: theme.spacing[4],
      ...theme.shadows.sm,
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.surface.primary,
      },
      branded: {
        backgroundColor: theme.colors.primary[500],
      },
      transparent: {
        backgroundColor: 'transparent',
      }
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  }
};

export default styles;