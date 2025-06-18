// src/theme/typography.js - COMPLETAMENTE CORREGIDO
export const typography = {
  // 📐 Font Families (Android optimizado)
  fontFamily: {
    regular: 'Roboto',
    medium: 'Roboto-Medium', 
    semibold: 'Roboto-Medium',
    bold: 'Roboto-Bold'
  },

  // 🏷️ Font Sizes - Escala modular
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48
  },

  // 📏 Line Heights - Respiración perfecta
  lineHeight: {
    tight: 20,     // números absolutos en lugar de ratios
    snug: 22,
    normal: 24,
    relaxed: 26,
    loose: 32
  },

  // 📝 Text Styles - SIMPLIFICADOS Y FUNCIONALES
  styles: {
    // Headers
    h1: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#1C1917'
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: '#1C1917'
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: '#1C1917'
    },
    h4: {
      fontSize: 18,
      fontWeight: '500',
      color: '#1C1917'
    },

    // Body Text
    bodyLarge: {
      fontSize: 18,
      fontWeight: 'normal',
      color: '#1C1917'
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#1C1917'
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#44403C'
    },

    // Labels & Captions
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#1C1917'
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      color: '#78716C'
    },

    // Special
    button: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      color: '#FFFFFF'
    }
  }
};