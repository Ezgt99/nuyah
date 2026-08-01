/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#050505',
          800: '#0B0B0F',
          700: '#11111A',
          600: '#16161F',
          500: '#1C1C28',
        },
        gold: {
          DEFAULT: '#E8C77A',
          soft: '#D4AF6A',
          deep: '#B8954A',
        },
        blush: {
          DEFAULT: '#E8B4C4',
          soft: '#F0CDD8',
        },
        lavender: {
          DEFAULT: '#C9B6E4',
          soft: '#D9C9EC',
        },
        warm: {
          DEFAULT: '#F5EFE6',
          soft: '#EDE4D3',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        photo:
          '0 1px 1px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.55), 0 20px 50px rgba(0,0,0,0.45)',
        glow: '0 0 40px rgba(232,199,122,0.25)',
        blush: '0 0 50px rgba(232,180,196,0.2)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0) rotate(var(--rot,0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--rot,0deg))' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '100%': { transform: 'translateY(-40px) translateX(20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
