module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1.2s ease-in-out',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
};
