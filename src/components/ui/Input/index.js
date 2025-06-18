// src/components/ui/Input/index.js
import React, { useState, forwardRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  leftIcon = null,
  rightIcon = null,
  onRightIconPress,
  variant = 'default',
  size = 'medium',
  style,
  inputStyle,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const getContainerStyles = () => {
    return [
      styles.container,
      style,
    ];
  };

  const getInputContainerStyles = () => {
    return [
      styles.inputContainer,
      styles[variant],
      styles[size],
      focused && styles.focused,
      error && styles.error,
      disabled && styles.disabled,
    ];
  };

  const getInputStyles = () => {
    return [
      styles.input,
      styles[`${size}Input`],
      multiline && styles.multilineInput,
      leftIcon && styles.inputWithLeftIcon,
      (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
      inputStyle,
    ];
  };

  // Renderizar icono de toggle para password
  const renderToggleIcon = () => {
    if (!secureTextEntry) return rightIcon;
    
    return (
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.iconButton}>
        <Text style={styles.toggleIcon}>
          {isSecure ? '👁️' : '👁️‍🗨️'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={getContainerStyles()}>
      {label && (
        <Text style={[
          styles.label,
          focused && styles.labelFocused,
          error && styles.labelError,
          disabled && styles.labelDisabled,
        ]}>
          {label}
        </Text>
      )}
      
      <View style={getInputContainerStyles()}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          ref={ref}
          style={getInputStyles()}
          placeholder={placeholder}
          placeholderTextColor={styles.placeholder.color}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...props}
        />
        
        {(rightIcon || secureTextEntry) && (
          <View style={styles.rightIconContainer}>
            {secureTextEntry ? renderToggleIcon() : rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;