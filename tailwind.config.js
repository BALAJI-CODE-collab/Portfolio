export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 60px rgba(0, 255, 204, 0.18)',
      },
      backgroundImage: {
        'hero-blur': 'radial-gradient(circle at top, rgba(0,255,204,0.12), transparent 45%), radial-gradient(circle at bottom, rgba(56,189,248,0.08), transparent 35%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
