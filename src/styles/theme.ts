import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Apple-inspired Liquid Glass color palette
const colors = {
  brand: {
    // Deep charcoal - primary (more Apple-like than navy)
    charcoal: {
      50: '#f5f5f5',
      100: '#e8e8e8',
      200: '#d1d1d1',
      300: '#b0b0b0',
      400: '#888888',
      500: '#6d6d6d',
      600: '#5d5d5d',
      700: '#4f4f4f',
      800: '#363636',
      900: '#1d1d1f', // Apple's signature dark
    },
    // Warm stone backgrounds (softer than cream)
    stone: {
      50: '#fafafa',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
    // Liquid glass teal (refined, sophisticated)
    glass: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    // Warm accent - subtle gold/amber
    accent: {
      50: '#fffbeb',
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
    // Pure glass effects
    glassWhite: 'rgba(255, 255, 255, 0.72)',
    glassDark: 'rgba(0, 0, 0, 0.02)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    glassShadow: 'rgba(0, 0, 0, 0.04)',
  },
};

// Premium typography - SF Pro style alternatives
const fonts = {
  heading: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  body: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const styles = {
  global: {
    'html, body': {
      backgroundColor: '#fafafa',
      color: 'brand.charcoal.900',
      lineHeight: 'tall',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '::selection': {
      backgroundColor: 'brand.glass.200',
      color: 'brand.charcoal.900',
    },
    // Liquid glass base styles
    '.liquid-glass': {
      background: 'rgba(255, 255, 255, 0.72)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    },
    '.liquid-glass-dark': {
      background: 'rgba(29, 29, 31, 0.72)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    },
    '.liquid-glass-accent': {
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(245, 158, 11, 0.08) 100%)',
      backdropFilter: 'blur(24px) saturate(200%)',
      WebkitBackdropFilter: 'blur(24px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.22)',
      boxShadow: '0 8px 32px rgba(6, 182, 212, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: '500',
      borderRadius: '980px', // Apple's pill shape
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      letterSpacing: '-0.01em',
    },
    variants: {
      // Primary liquid glass button
      primary: {
        bg: 'brand.charcoal.900',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '980px 980px 0 0',
        },
        _hover: {
          bg: 'brand.charcoal.800',
          transform: 'scale(1.02)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        },
        _active: {
          transform: 'scale(0.98)',
        },
      },
      // Glass button
      glass: {
        bg: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(20px) saturate(180%)',
        color: 'brand.charcoal.900',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        _hover: {
          bg: 'rgba(255, 255, 255, 0.88)',
          transform: 'scale(1.02)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        },
        _active: {
          transform: 'scale(0.98)',
        },
      },
      // Secondary outline
      secondary: {
        bg: 'transparent',
        color: 'brand.charcoal.900',
        border: '1.5px solid',
        borderColor: 'brand.charcoal.300',
        _hover: {
          bg: 'brand.charcoal.900',
          color: 'white',
          borderColor: 'brand.charcoal.900',
          transform: 'scale(1.02)',
        },
        _active: {
          transform: 'scale(0.98)',
        },
      },
      // Accent button
      accent: {
        bg: 'brand.glass.500',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '980px 980px 0 0',
        },
        _hover: {
          bg: 'brand.glass.600',
          transform: 'scale(1.02)',
          boxShadow: '0 8px 24px rgba(6, 182, 212, 0.3)',
        },
        _active: {
          transform: 'scale(0.98)',
        },
      },
      // Ghost link style
      ghost: {
        color: 'brand.glass.600',
        fontWeight: '500',
        _hover: {
          color: 'brand.glass.700',
          textDecoration: 'none',
        },
      },
    },
    sizes: {
      md: {
        px: 6,
        py: 3,
        fontSize: 'sm',
      },
      lg: {
        px: 8,
        py: 4,
        fontSize: 'md',
      },
      xl: {
        px: 10,
        py: 5,
        fontSize: 'lg',
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: '600',
      color: 'brand.charcoal.900',
      letterSpacing: '-0.03em',
    },
  },
  Text: {
    baseStyle: {
      fontFamily: 'body',
      letterSpacing: '-0.01em',
    },
  },
  Input: {
    variants: {
      glass: {
        field: {
          bg: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          _hover: {
            borderColor: 'brand.glass.300',
          },
          _focus: {
            borderColor: 'brand.glass.500',
            boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)',
            bg: 'rgba(255, 255, 255, 0.88)',
          },
          _placeholder: {
            color: 'brand.charcoal.400',
          },
        },
      },
    },
    defaultProps: {
      variant: 'glass',
    },
  },
  Textarea: {
    variants: {
      glass: {
        bg: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(12px)',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.06)',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        _hover: {
          borderColor: 'brand.glass.300',
        },
        _focus: {
          borderColor: 'brand.glass.500',
          boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)',
          bg: 'rgba(255, 255, 255, 0.88)',
        },
        _placeholder: {
          color: 'brand.charcoal.400',
        },
      },
    },
    defaultProps: {
      variant: 'glass',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        _hover: {
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          transform: 'translateY(-4px)',
        },
      },
    },
  },
  Container: {
    baseStyle: {
      maxW: 'container.xl',
      px: { base: 5, md: 8, lg: 12 },
    },
  },
};

// Liquid glass layer styles
const layerStyles = {
  glassCard: {
    bg: 'rgba(255, 255, 255, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
  },
  glassCardHover: {
    bg: 'rgba(255, 255, 255, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    _hover: {
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      transform: 'translateY(-4px)',
    },
  },
  glassNavbar: {
    bg: 'rgba(250, 250, 250, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
  },
  glassDark: {
    bg: 'rgba(29, 29, 31, 0.88)',
    backdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  glassAccent: {
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(245, 158, 11, 0.04) 100%)',
    backdropFilter: 'blur(24px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 12px 40px rgba(6, 182, 212, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
  },
  heroGradient: {
    background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(245, 158, 11, 0.08), transparent)',
  },
};

// Apple-inspired text styles
const textStyles = {
  heroTitle: {
    fontFamily: 'heading',
    fontSize: { base: '40px', md: '56px', lg: '72px' },
    fontWeight: '600',
    lineHeight: '1.05',
    letterSpacing: '-0.04em',
    color: 'brand.charcoal.900',
  },
  sectionTitle: {
    fontFamily: 'heading',
    fontSize: { base: '32px', md: '40px', lg: '48px' },
    fontWeight: '600',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontFamily: 'body',
    fontSize: { base: '18px', md: '21px' },
    fontWeight: '400',
    lineHeight: '1.5',
    color: 'brand.charcoal.500',
    letterSpacing: '-0.01em',
  },
  eyebrow: {
    fontFamily: 'body',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'brand.glass.600',
  },
  body: {
    fontFamily: 'body',
    fontSize: '17px',
    lineHeight: '1.6',
    letterSpacing: '-0.01em',
  },
  caption: {
    fontFamily: 'body',
    fontSize: '14px',
    color: 'brand.charcoal.500',
    letterSpacing: '-0.01em',
  },
};

// Premium shadow system
const shadows = {
  glass: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
  glassHover: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  glassElevated: '0 24px 80px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
  subtle: '0 2px 8px rgba(0, 0, 0, 0.04)',
  medium: '0 4px 16px rgba(0, 0, 0, 0.06)',
  elevated: '0 12px 40px rgba(0, 0, 0, 0.08)',
  deep: '0 24px 80px rgba(0, 0, 0, 0.12)',
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
  layerStyles,
  textStyles,
  shadows,
  radii: {
    glass: '24px',
    glassSmall: '16px',
    pill: '980px',
  },
});
