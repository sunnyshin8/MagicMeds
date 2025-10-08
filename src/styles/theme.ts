// Healthcare Design System Configuration for MagicMeds
// Optimized color palette and design tokens for medical applications

export const healthcareTheme = {
  colors: {
    // Primary - Ocean blue-green (trust, calm, medical)
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4', // Main primary - cyan
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    
    // Secondary - Healing teal-green (health, nature, growth)
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // Main secondary - teal
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#064e3b',
    },
    
    // Accent - Warm orange (CTAs, important actions)
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main accent
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    
    // Neutral - High contrast grays (accessibility)
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Status colors for medical contexts
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626', // Main error
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a', // Main success
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    warning: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7', // Main info
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
  },
  
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],    // 16px - minimum for accessibility
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1' }],        // 48px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Mobile-first breakpoints for responsive design
  breakpoints: {
    sm: '640px',   // Mobile
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px', // Extra large
  },
  
  // Accessibility-focused shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    focus: '0 0 0 3px rgb(59 130 246 / 0.5)', // Blue focus ring
    error: '0 0 0 3px rgb(239 68 68 / 0.5)',  // Red focus ring
  },
  
  // Touch-friendly border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  
  // Animation and transitions
  animation: {
    'fade-in': 'fadeIn 0.5s ease-in-out',
    'slide-up': 'slideUp 0.3s ease-out',
    'pulse-slow': 'pulse 3s infinite',
    'spin-slow': 'spin 3s linear infinite',
  },
};

// Component size variants for consistency
export const componentSizes = {
  button: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  },
  input: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  },
  card: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
};

// Medical context specific utilities
export const medicalColors = {
  emergency: '#dc2626',    // Red - immediate attention
  urgent: '#ea580c',       // Orange - needs attention soon
  routine: '#059669',      // Green - normal priority
  info: '#0284c7',         // Blue - informational
  medication: '#7c3aed',   // Purple - medication related
  vitals: '#0891b2',       // Cyan - vital signs
  appointment: '#4338ca',  // Indigo - appointments
};

// Accessibility helpers
export const accessibilityConfig = {
  minTouchTarget: '44px', // Minimum touch target size
  minContrast: '4.5:1',   // WCAG AA contrast ratio
  focusRingWidth: '3px',  // Focus indicator thickness
  animationDuration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

// Cultural considerations for rural India
export const culturalAdaptations = {
  colors: {
    auspicious: '#fbbf24',  // Gold/yellow - auspicious in Indian culture
    purity: '#ffffff',      // White - purity and cleanliness
    nature: '#059669',      // Green - nature and health
  },
  icons: {
    family: '👨‍👩‍👧‍👦',         // Family-centric design
    community: '🏘️',        // Community health focus
    traditional: '🕉️',       // Traditional medicine respect
  },
};

export default healthcareTheme;