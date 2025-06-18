// src/components/ui/Modal/styles.js
import { theme } from '../../../theme';

const styles = {
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.overlay,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    ...theme.typography.styles.h3,
    flex: 1,
    marginBottom: 0,
  },
  closeButton: {
    padding: theme.spacing[2],
    marginLeft: theme.spacing[4],
  },
  closeIcon: {
    fontSize: 24,
    color: theme.colors.text.secondary,
    fontWeight: 'bold',
  },
  content: {
    padding: theme.spacing[6],
  },

  getModalStyle: (size) => {
    const baseStyle = {
      backgroundColor: theme.colors.surface.primary,
      borderRadius: theme.borderRadius.component.modal,
      ...theme.shadows.modal,
      maxHeight: '90%',
    };

    const sizeStyles = {
      sm: {
        width: '80%',
        maxWidth: 320,
      },
      md: {
        width: '90%',
        maxWidth: 480,
      },
      lg: {
        width: '95%',
        maxWidth: 640,
      }
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
    };
  }
};

export default styles;