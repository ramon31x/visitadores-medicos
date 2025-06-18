// src/theme/typography.js
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
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },

  // 📝 Text Styles - Jerarquía completa (inspirado en Notion)
  styles: {
    // Headers
    h1: {
      fontSize: 30,
      fontFamily: 'Roboto-Bold',
      lineHeight: 1.25,
      color: colors.text.primary,
      marginBottom: 24
    },
    h2: {
      fontSize: 24,
      fontFamily: 'Roboto-Medium',
      lineHeight: 1.25,
      color: colors.text.primary,
      marginBottom: 20
    },
    h3: {
      fontSize: 20,
      fontFamily: 'Roboto-Medium',
      lineHeight: 1.375,
      color: colors.text.primary,
      marginBottom: 16
    },
    h4: {
      fontSize: 18,
      fontFamily: 'Roboto-Medium',
      lineHeight: 1.375,
      color: colors.text.primary,
      marginBottom: 12
    },

    // Body Text
    bodyLarge: {
      fontSize: 18,
      fontFamily: 'Roboto',
      lineHeight: 1.5,
      color: colors.text.primary
    },
    body: {
      fontSize: 16,
      fontFamily: 'Roboto',
      lineHeight: 1.5,
      color: colors.text.primary
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: 'Roboto',
      lineHeight: 1.375,
      color: colors.text.secondary
    },

    // Labels & Captions
    label: {
      fontSize: 14,
      fontFamily: 'Roboto-Medium',
      lineHeight: 1.375,
      color: colors.text.primary
    },
    caption: {
      fontSize: 12,
      fontFamily: 'Roboto',
      lineHeight: 1.25,
      color: colors.text.tertiary
    },

    // Special
    button: {
      fontSize: 16,
      fontFamily: 'Roboto-Medium',
      lineHeight: 1.25,
      textAlign: 'center'
    }
  }
};