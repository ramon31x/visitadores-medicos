// src/theme/index.js - TEMA PRINCIPAL EXPORTADO
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';
import { animation } from './animation';

export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  animation,

  // 🎨 Helpers útiles
  helpers: {
    // Obtener color con opacity
    colorWithOpacity: (color, opacity) => {
      return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    },
    
    // Shadow para Android
    androidShadow: (elevation = 2) => ({
      elevation
    })
  }
};

export default theme;