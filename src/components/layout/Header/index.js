import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

const Header = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBackButton = false,
  onBackPress,
  variant = 'default',
  backgroundColor,
  textColor,
  statusBarStyle = 'dark-content',
  centerTitle = true,
  style,
  titleStyle,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const getHeaderStyles = () => {
    return [
      styles.header,
      styles[variant],
      { paddingTop: insets.top },
      backgroundColor && { backgroundColor },
      style,
    ];
  };

  const getTitleStyles = () => {
    return [
      styles.title,
      centerTitle && styles.titleCentered,
      textColor && { color: textColor },
      titleStyle,
    ];
  };

    const getStatusBarBackground = () => {
    if (typeof backgroundColor === 'string') return backgroundColor;
    
    switch (variant) {
      case 'primary':
      case 'main':
        return '#007AFF';
      case 'auth':
      case 'transparent':
        return 'transparent';
      default:
        return '#FFFFFF';
    }
  };

  const renderLeftSection = () => {
    if (showBackButton) {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      );
    }

    if (leftIcon) {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLeftPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {leftIcon}
        </TouchableOpacity>
      );
    }

    return <View style={styles.actionButton} />;
  };

  const renderRightSection = () => {
    if (rightIcon) {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onRightPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightIcon}
        </TouchableOpacity>
      );
    }

    return <View style={styles.actionButton} />;
  };

  const renderTitle = () => {
    if (!title) return null;

    return (
      <View style={styles.titleContainer}>
        <Text style={getTitleStyles()} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={getStatusBarBackground()}
          translucent
        />
      )}
      
      <View style={getHeaderStyles()} {...props}>
        <View style={styles.content}>
          {renderLeftSection()}
          {renderTitle()}
          {renderRightSection()}
        </View>
      </View>
    </>
  );
};

// Header variants predefinidos
Header.Auth = ({ title, ...props }) => (
  <Header
    title={title}
    variant="auth"
    centerTitle={true}
    {...props}
  />
);

Header.Main = ({ title, subtitle, onMenuPress, onNotificationPress, ...props }) => (
  <Header
    title={title}
    subtitle={subtitle}
    variant="main"
    leftIcon={<Text style={styles.menuIcon}>☰</Text>}
    rightIcon={<Text style={styles.notificationIcon}>🔔</Text>}
    onLeftPress={onMenuPress}
    onRightPress={onNotificationPress}
    {...props}
  />
);

Header.Back = ({ title, onBackPress, rightIcon, onRightPress, ...props }) => (
  <Header
    title={title}
    showBackButton={true}
    onBackPress={onBackPress}
    rightIcon={rightIcon}
    onRightPress={onRightPress}
    centerTitle={true}
    {...props}
  />
);

Header.Search = ({ title, onSearchPress, onFilterPress, ...props }) => (
  <Header
    title={title}
    leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
    rightIcon={<Text style={styles.filterIcon}>⚙️</Text>}
    onLeftPress={onSearchPress}
    onRightPress={onFilterPress}
    {...props}
  />
);

export default Header;