// src/theme/spacing.js
export const spacing = {
  // 🔢 Base unit system (inspirado en Linear)
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem  
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  7: 28,   // 1.75rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem

  // 📱 Component specific spacing
  component: {
    buttonPadding: {
      horizontal: 24,
      vertical: 12
    },
    cardPadding: {
      horizontal: 20,
      vertical: 16
    },
    inputPadding: {
      horizontal: 16,
      vertical: 14
    },
    headerPadding: {
      horizontal: 20,
      vertical: 16
    },
    screenPadding: {
      horizontal: 20,
      vertical: 24
    }
  },

  // 🎯 Common patterns
  common: {
    xs: 4,
    sm: 8, 
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  }
};