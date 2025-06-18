// src/theme/ThemeProvider.js
import React, { createContext, useContext } from 'react';

// Importar el theme completo
import { theme as defaultTheme } from './index';

// Crear el Context
const ThemeContext = createContext(defaultTheme);

// Hook para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider del tema
export const ThemeProvider = ({ children, theme = defaultTheme }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;