// src/components/ui/Loading/index.js
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { theme } from '../../../theme';
import styles from './styles';

const Loading = ({ 
  size = 'large',
  color = theme.colors.primary[500],
  text,
  overlay = false,
  style,
  ...props 
}) => {
  if (overlay) {
    return (
      <View style={[styles.overlay, style]}>
        <View style={styles.overlayContent}>
          <ActivityIndicator size={size} color={color} {...props} />
          {text && <Text style={styles.overlayText}>{text}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} {...props} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;