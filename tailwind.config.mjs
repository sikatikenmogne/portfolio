/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // Content paths for Tailwind v4 (required for custom classes)
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Dark mode configuration
  darkMode: ['class'],

  theme: {
    extend: {
      // TECH BLUE PALETTE - Your custom colors
      colors: {
        tech: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#90D5FF', // Your base color
          400: '#57B9FF', // Your primary color
          500: '#2563eb', // Technical accent
          600: '#77B1D4', // Your secondary color
          700: '#517891', // Your professional color
          800: '#1e40af', // Code emphasis
          900: '#1e293b', // Dark shades
          950: '#0f172a',
        },

        // Shadcn-compatible semantic colors (optional in v4)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      // Typography - Inter + system fallbacks
      fontFamily: {
        incognito: ['var(--incognito)'],
        inter: ['var(--inter)'],
        sans: [
          'var(--gitlabmono)',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'var(--font-mono)',
          'SF Mono',
          'Monaco',
          'Cascadia Code',
          'Roboto Mono',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'Courier New',
          'ui-monospace',
          'monospace',
        ],
      },

      // Border radius with CSS variables
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Animation keyframes
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-from-top': {
          from: {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-tech': {
          '0%, 100%': {
            opacity: '1',
            backgroundColor: 'rgb(var(--tech-400))',
          },
          '50%': {
            opacity: '0.8',
            backgroundColor: 'rgb(var(--tech-300))',
          },
        },
      },

      // Animations
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'pulse-tech': 'pulse-tech 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Custom spacing (if needed)
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },

      // Custom shadows with Tech Blue
      boxShadow: {
        'tech-sm': '0 1px 2px 0 rgba(87, 185, 255, 0.05)',
        'tech-md':
          '0 4px 6px -1px rgba(87, 185, 255, 0.1), 0 2px 4px -1px rgba(87, 185, 255, 0.06)',
        'tech-lg':
          '0 10px 15px -3px rgba(87, 185, 255, 0.1), 0 4px 6px -2px rgba(87, 185, 255, 0.05)',
        'tech-xl':
          '0 20px 25px -5px rgba(87, 185, 255, 0.1), 0 10px 10px -5px rgba(87, 185, 255, 0.04)',
      },

      // Custom gradients
      backgroundImage: {
        'gradient-tech': 'linear-gradient(135deg, #57B9FF 0%, #77B1D4 100%)',
        'gradient-tech-subtle': 'linear-gradient(135deg, #90D5FF 0%, #e0f2fe 100%)',
        'gradient-tech-dark': 'linear-gradient(135deg, #517891 0%, #1e40af 100%)',
      },
    },
  },

  // Plugins (empty for now, add as needed)
  plugins: [
    // Optional: Add plugins like @tailwindcss/typography, @tailwindcss/forms, etc.
  ],
};
