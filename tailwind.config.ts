import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'win95-bg': 'var(--win95-bg)',
        'win95-navy': 'var(--navy-bg)',
        'win95-yellow': 'var(--yellow-text)',
        'win95-cyan': 'var(--cyan-link)',
        'win95-gray': 'var(--win95-bg)',
        'win95-gray-dark': 'var(--win95-border-dark)',
        'win95-border': 'var(--win95-border-light)',
        'win95-border-dark': 'var(--win95-border-dark)',
        'win95-border-darker': 'var(--win95-border-darker)',
      },
      fontFamily: {
        'ms-sans': ['"MS Sans Serif"', '"Microsoft Sans Serif"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
