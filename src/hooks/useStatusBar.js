// src/hooks/useStatusBar.js
import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

const useStatusBar = ({ 
  backgroundColor = '#FFFFFF', 
  barStyle = 'dark-content' 
}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor, true);
      StatusBar.setBarStyle(barStyle, true);
    } else {
      StatusBar.setBarStyle(barStyle, true);
    }
  }, [backgroundColor, barStyle]);
};

export default useStatusBar;