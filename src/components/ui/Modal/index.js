// src/components/ui/Modal/index.js
import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { styles } from './styles';

const Modal = ({
  visible = false,
  onClose,
  title,
  children,
  variant = 'default',
  size = 'medium',
  closeOnBackdrop = true,
  showCloseButton = true,
  scrollable = false,
  keyboardShouldPersistTaps = 'handled',
  style,
  contentStyle,
  ...props
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdrop && onClose) {
      onClose();
    }
  };

  const getModalContentStyles = () => {
    return [
      styles.modalContent,
      styles[variant],
      styles[size],
      contentStyle,
    ];
  };

  const renderContent = () => {
    const content = (
      <>
        {(title || showCloseButton) && (
          <View style={styles.header}>
            {title && (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
            {showCloseButton && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        <View style={styles.body}>
          {children}
        </View>
      </>
    );

    if (scrollable) {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      );
    }

    return content;
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...props}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <View style={[styles.modalContainer, style]}>
          <View style={getModalContentStyles()}>
            {renderContent()}
          </View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

// Componentes predefinidos para casos comunes
Modal.Alert = ({
  visible,
  onClose,
  title,
  message,
  confirmText = 'Aceptar',
  onConfirm,
  ...props
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title={title}
    size="small"
    closeOnBackdrop={false}
    showCloseButton={false}
    {...props}
  >
    <Text style={styles.alertMessage}>{message}</Text>
    <View style={styles.alertActions}>
      <TouchableOpacity
        style={styles.alertButton}
        onPress={onConfirm || onClose}
      >
        <Text style={styles.alertButtonText}>{confirmText}</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

Modal.Confirm = ({
  visible,
  onClose,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  ...props
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title={title}
    size="small"
    closeOnBackdrop={false}
    showCloseButton={false}
    {...props}
  >
    <Text style={styles.alertMessage}>{message}</Text>
    <View style={styles.confirmActions}>
      <TouchableOpacity
        style={[styles.alertButton, styles.cancelButton]}
        onPress={onCancel || onClose}
      >
        <Text style={styles.cancelButtonText}>{cancelText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.alertButton, styles.confirmButton]}
        onPress={onConfirm}
      >
        <Text style={styles.confirmButtonText}>{confirmText}</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default Modal;