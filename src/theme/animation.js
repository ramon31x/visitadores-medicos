// src/theme/animation.js
export const animation = {
  // ⚡ Timing functions (sutiles, profesionales)
  timing: {
    fast: 150,
    normal: 250,
    slow: 350
  },

  // 📈 Easing curves
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    linear: 'linear'
  },

  // 🎭 Presets para micro-interactions
  presets: {
    buttonPress: {
      duration: 150,
      easing: 'ease-out'
    },
    cardHover: {
      duration: 250,
      easing: 'ease-in-out'
    },
    modalSlide: {
      duration: 300,
      easing: 'ease-out'
    }
  }
};