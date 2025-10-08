import type { Config } from 'tailwindcss'
import { healthcareTheme } from './src/styles/theme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: healthcareTheme.colors.primary,
        secondary: healthcareTheme.colors.secondary,
        accent: healthcareTheme.colors.accent,
        neutral: healthcareTheme.colors.neutral,
        error: healthcareTheme.colors.error,
        success: healthcareTheme.colors.success,
        warning: healthcareTheme.colors.warning,
        info: healthcareTheme.colors.info,
        medical: {
          emergency: '#dc2626',
          urgent: '#ea580c',
          routine: '#059669',
          info: '#0284c7',
          medication: '#7c3aed',
          vitals: '#0891b2',
          appointment: '#4338ca',
        },
        cultural: {
          auspicious: '#fbbf24',
          purity: '#ffffff',
          nature: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: healthcareTheme.typography.fontSize,
      fontWeight: healthcareTheme.typography.fontWeight,
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgb(59 130 246 / 0.5)',
        'error': '0 0 0 3px rgb(239 68 68 / 0.5)',
        'success': '0 0 0 3px rgb(34 197 94 / 0.5)',
      },
      borderRadius: healthcareTheme.borderRadius,
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      minHeight: {
        'touch': '44px', // Minimum touch target
      },
      minWidth: {
        'touch': '44px', // Minimum touch target
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config