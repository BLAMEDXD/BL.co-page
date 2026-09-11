import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:     '#050505',
        's1':      '#0a0a0a',
        's2':      '#111111',
        's3':      '#171717',
        'g900':    '#1a1a1a',
        'g700':    '#333333',
        'g500':    '#666666',
        'g400':    '#888888',
        'g300':    '#aaaaaa',
        'g100':    '#dddddd',
        white:     '#f0f0f0',
        accent:    '#c8ff00',
        'accent2': '#74a9fa',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,10vw,11rem)',   { lineHeight: '0.9',  letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem,7vw,8rem)',     { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem,5vw,5.5rem)',     { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.5rem,3.5vw,3.5rem)', { lineHeight: '1',    letterSpacing: '-0.02em' }],
        'label':      ['0.6875rem',                  { lineHeight: '1',    letterSpacing: '0.1em'  }],
      },
      screens: {
        'xs': '480px',
      },
      transitionTimingFunction: {
        'expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'swift': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
export default config
