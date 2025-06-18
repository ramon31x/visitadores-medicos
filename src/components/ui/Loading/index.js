// src/components/ui/Loading/index.js
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';

const Loading = ({
  size = 'medium',
  color,
  text,
  variant = 'default',
  overlay = false,
  style,
  textStyle,
  ...props
}) => {
  const getLoadingStyles = () => {
    return [
      styles.container,
      styles[variant],
      overlay && styles.overlay,
      style,
    ];
  };

  const getSpinnerColor = () => {
    if (color) return color;
    
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'overlay':
        return '#007AFF';
      default:
        return '#007AFF';
    }
  };

  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return 'small';
    }
  };

  return (
    <View style={getLoadingStyles()} {...props}>
      <ActivityIndicator
        size={getSpinnerSize()}
        color={getSpinnerColor()}
        style={styles.spinner}
      />
      {text && (
        <Text style={[
          styles.text,
          styles[`${variant}Text`],
          textStyle,
        ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Componente de loading con overlay completo
Loading.Overlay = ({ visible = true, text = 'Cargando...', ...props }) => {
  if (!visible) return null;
  
  return (
    <Loading
      variant="overlay"
      overlay={true}
      text={text}
      style={styles.fullScreenOverlay}
      {...props}
    />
  );
};

// Componente de skeleton para cards
Loading.Skeleton = ({ 
  lines = 3, 
  width = '100%', 
  height = 16,
  style,
  ...props 
}) => (
  <View style={[styles.skeletonContainer, style]} {...props}>
    {Array.from({ length: lines }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.skeletonLine,
          {
            width: index === lines - 1 ? '70%' : width,
            height,
            marginBottom: index === lines - 1 ? 0 : 8,
          },
        ]}
      />
    ))}
  </View>
);

// Loading para botones
Loading.Button = ({ size = 'small', color = '#FFFFFF' }) => (
  <ActivityIndicator size={size} color={color} />
);

export default Loading;