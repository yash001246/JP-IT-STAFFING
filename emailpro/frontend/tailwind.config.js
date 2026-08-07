/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          950: '#07080D',
          900: '#0B0D14',
          800: '#12141F',
          700: '#1A1D2B',
          600: '#242838',
        },
        accent: {
          purple: '#7C5CFF',
          violet: '#9D6BFF',
          blue: '#4C7CFF',
          cyan: '#31D9E8',
        },
        muted: '#8B90A6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #7C5CFF 0%, #4C7CFF 100%)',
        'grad-radial': 'radial-gradient(circle at 50% 0%, rgba(124,92,255,0.25), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(124,92,255,0.25)',
        glass: '0 8px 32px rgba(0,0,0,0.35)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
