// src/components/ui/Input/index.js - VERSIÓN SÚPER SIMPLE
import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  secureTextEntry = false,
  editable = true,
  multiline = false,
  style,
  inputStyle,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;

  return (
    <View style={[{ marginBottom: theme.spacing[4] }, style]}>
      {/* Label */}
      {label && (
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: theme.colors.text.primary,
          marginBottom: theme.spacing[2],
        }}>
          {label}
        </Text>
      )}
      
      {/* Input */}
      <TextInput
        style={[
          {
            height: multiline ? 80 : 50,
            borderWidth: 1.5,
            borderColor: hasError 
              ? theme.colors.status.error 
              : isFocused 
                ? theme.colors.primary[500] 
                : theme.colors.border.light,
            borderRadius: theme.borderRadius.component.input,
            paddingHorizontal: theme.spacing[4],
            paddingVertical: theme.spacing[3],
            backgroundColor: editable ? theme.colors.surface.primary : theme.colors.neutral[100],
            color: theme.colors.text.primary,
            fontSize: 16,
            textAlignVertical: multiline ? 'top' : 'center',
          },
          isFocused && !hasError && {
            shadowColor: theme.colors.primary[500],
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          },
          inputStyle
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        editable={editable}
        multiline={multiline}
        {...props}
      />
      
      {/* Helper/Error Text */}
      {(error || helperText) && (
        <Text style={{
          fontSize: 12,
          color: hasError ? theme.colors.status.error : theme.colors.text.tertiary,
          marginTop: theme.spacing[1],
        }}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

export default Input;