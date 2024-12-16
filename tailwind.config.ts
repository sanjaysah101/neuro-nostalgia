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
      },
      fontFamily: {
        'ms-sans': ['"MS Sans Serif"', '"Microsoft Sans Serif"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
