// src/components/ui/Card/index.js
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'md',
  style,
  ...props 
}) => {
  const cardStyle = styles.getCardStyle(variant, padding);

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;