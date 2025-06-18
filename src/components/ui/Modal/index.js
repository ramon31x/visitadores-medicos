// src/components/ui/Modal/index.js
import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../../../theme';
import styles from './styles';

const Modal = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  size = 'md',
  style,
  ...props
}) => {
  const modalStyle = styles.getModalStyle(size);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeOnBackdrop ? onClose : undefined}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <View style={[modalStyle, style]}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && (
                <Text style={styles.title}>{title}</Text>
              )}
              {showCloseButton && (
                <TouchableOpacity 
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;