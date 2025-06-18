// src/components/ui/Loading/index.js - CORREGIDO
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

const Loading = ({ 
  size = 'large',
  color,
  text,
  overlay = false,
  style,
  ...props 
}) => {
  const theme = useTheme();
  const loadingColor = color || theme.colors.primary[500];

  const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing[4],
    },
    text: {
      ...theme.typography.styles.body,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[3],
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.surface.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    overlayContent: {
      backgroundColor: theme.colors.surface.primary,
      padding: theme.spacing[8],
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      minWidth: 120,
      ...theme.shadows.lg,
    },
    overlayText: {
      ...theme.typography.styles.body,
      color: theme.colors.text.primary,
      marginTop: theme.spacing[4],
      textAlign: 'center',
    },
  };

  if (overlay) {
    return (
      <View style={[styles.overlay, style]}>
        <View style={styles.overlayContent}>
          <ActivityIndicator size={size} color={loadingColor} {...props} />
          {text && <Text style={styles.overlayText}>{text}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={loadingColor} {...props} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;