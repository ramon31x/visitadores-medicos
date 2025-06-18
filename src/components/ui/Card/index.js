// src/components/ui/Card/index.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const Card = ({
  children,
  variant = 'default',
  elevation = 'medium',
  padding = 'medium',
  onPress,
  disabled = false,
  style,
  ...props
}) => {
  const getCardStyles = () => {
    return [
      styles.card,
      styles[variant],
      styles[elevation],
      styles[padding],
      disabled && styles.disabled,
      style,
    ];
  };

  const CardContent = ({ children, style }) => (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );

  // Si tiene onPress, usar TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity
        style={getCardStyles()}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        {...props}
      >
        <CardContent>
          {children}
        </CardContent>
      </TouchableOpacity>
    );
  }

  // Si no tiene onPress, usar View normal
  return (
    <View style={getCardStyles()} {...props}>
      <CardContent>
        {children}
      </CardContent>
    </View>
  );
};

// Componentes adicionales del Card
Card.Header = ({ children, style }) => (
  <View style={[styles.header, style]}>
    {children}
  </View>
);

Card.Body = ({ children, style }) => (
  <View style={[styles.body, style]}>
    {children}
  </View>
);

Card.Footer = ({ children, style }) => (
  <View style={[styles.footer, style]}>
    {children}
  </View>
);

Card.Divider = ({ style }) => (
  <View style={[styles.divider, style]} />
);

export default Card;