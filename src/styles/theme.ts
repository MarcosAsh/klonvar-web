import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    // Deep navy - primary
    navy: {
      50: '#e6eaf0',
      100: '#c4ccd9',
      200: '#9fadc0',
      300: '#7a8ea7',
      400: '#5f7693',
      500: '#445f80',
      600: '#3a5270',
      700: '#2e425b',
      800: '#233347',
      900: '#1a365d', // Main navy
    },
    // Warm cream backgrounds
    cream: {
      50: '#fefdfb',
      100: '#fdfaf5',
      200: '#faf5eb',
      300: '#f7f0e0',
      400: '#f2e8d0',
      500: '#ede0c0',
      600: '#d9caa8',
      700: '#c4b38f',
      800: '#af9d77',
      900: '#9a875f',
    },
    // Teal accent (from logo)
    teal: {
      50: '#e6f5f3',
      100: '#c2e6e1',
      200: '#9ad6cd',
      300: '#72c5b9',
      400: '#53b8a9',
      500: '#35ab9a',
      600: '#2f9a8a',
      700: '#278577',
      800: '#1f7164',
      900: '#124f45',
    },
    // Gold accent for premium feel
    gold: {
      50: '#fdf9ed',
      100: '#f9efd2',
      200: '#f3dfb0',
      300: '#edcf8e',
      400: '#e8c374',
      500: '#e3b75a',
      600: '#d4a44a',
      700: '#bc8c3a',
      800: '#a4752e',
      900: '#8c5f24',
    },
  },
};

const fonts = {
  heading: '"Cormorant Garamond", Georgia, serif',
  body: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
};

const styles = {
  global: {
    'html, body': {
      backgroundColor: 'brand.cream.50',
      color: 'brand.navy.900',
      lineHeight: 'tall',
    },
    '::selection': {
      backgroundColor: 'brand.teal.200',
      color: 'brand.navy.900',
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: '500',
      borderRadius: 'md',
      transition: 'all 0.3s ease',
    },
    variants: {
      primary: {
        bg: 'brand.navy.900',
        color: 'white',
        _hover: {
          bg: 'brand.navy.700',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        _active: {
          bg: 'brand.navy.800',
          transform: 'translateY(0)',
        },
      },
      secondary: {
        bg: 'transparent',
        color: 'brand.navy.900',
        border: '2px solid',
        borderColor: 'brand.navy.900',
        _hover: {
          bg: 'brand.navy.900',
          color: 'white',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
      accent: {
        bg: 'brand.teal.600',
        color: 'white',
        _hover: {
          bg: 'brand.teal.700',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
      ghost: {
        color: 'brand.navy.900',
        _hover: {
          bg: 'brand.cream.200',
        },
      },
      gold: {
        bg: 'brand.gold.500',
        color: 'brand.navy.900',
        fontWeight: '600',
        _hover: {
          bg: 'brand.gold.600',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
    },
    sizes: {
      lg: {
        px: 8,
        py: 6,
        fontSize: 'md',
      },
      xl: {
        px: 10,
        py: 7,
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
      color: 'brand.navy.900',
      letterSpacing: '-0.02em',
    },
  },
  Text: {
    baseStyle: {
      fontFamily: 'body',
    },
  },
  Input: {
    variants: {
      elegant: {
        field: {
          bg: 'white',
          border: '1px solid',
          borderColor: 'brand.cream.400',
          borderRadius: 'md',
          _hover: {
            borderColor: 'brand.teal.400',
          },
          _focus: {
            borderColor: 'brand.teal.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-teal-500)',
          },
        },
      },
    },
    defaultProps: {
      variant: 'elegant',
    },
  },
  Textarea: {
    variants: {
      elegant: {
        bg: 'white',
        border: '1px solid',
        borderColor: 'brand.cream.400',
        borderRadius: 'md',
        _hover: {
          borderColor: 'brand.teal.400',
        },
        _focus: {
          borderColor: 'brand.teal.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-teal-500)',
        },
      },
    },
    defaultProps: {
      variant: 'elegant',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: '0 4px 20px rgba(26, 54, 93, 0.08)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        _hover: {
          boxShadow: '0 8px 30px rgba(26, 54, 93, 0.12)',
          transform: 'translateY(-4px)',
        },
      },
    },
  },
  Link: {
    baseStyle: {
      color: 'brand.navy.900',
      transition: 'color 0.2s ease',
      _hover: {
        color: 'brand.teal.600',
        textDecoration: 'none',
      },
    },
  },
  Container: {
    baseStyle: {
      maxW: 'container.xl',
      px: { base: 4, md: 8 },
    },
  },
};

const layerStyles = {
  card: {
    bg: 'white',
    borderRadius: 'xl',
    boxShadow: '0 4px 20px rgba(26, 54, 93, 0.08)',
  },
  cardHover: {
    bg: 'white',
    borderRadius: 'xl',
    boxShadow: '0 4px 20px rgba(26, 54, 93, 0.08)',
    transition: 'all 0.3s ease',
    _hover: {
      boxShadow: '0 8px 30px rgba(26, 54, 93, 0.12)',
      transform: 'translateY(-4px)',
    },
  },
  glass: {
    bg: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'xl',
  },
  gradient: {
    bgGradient: 'linear(to-br, brand.navy.900, brand.navy.700)',
    color: 'white',
  },
};

const textStyles = {
  heroTitle: {
    fontFamily: 'heading',
    fontSize: { base: '3xl', md: '5xl', lg: '6xl' },
    fontWeight: '600',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
  },
  sectionTitle: {
    fontFamily: 'heading',
    fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontFamily: 'body',
    fontSize: { base: 'lg', md: 'xl' },
    fontWeight: '400',
    lineHeight: '1.6',
    color: 'brand.navy.600',
  },
  body: {
    fontFamily: 'body',
    fontSize: 'md',
    lineHeight: '1.7',
  },
  caption: {
    fontFamily: 'body',
    fontSize: 'sm',
    color: 'brand.navy.500',
  },
};

const shadows = {
  elegant: '0 4px 20px rgba(26, 54, 93, 0.08)',
  elegantHover: '0 8px 30px rgba(26, 54, 93, 0.12)',
  soft: '0 2px 10px rgba(26, 54, 93, 0.06)',
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
  space: {
    section: { base: '16', md: '24', lg: '32' },
  },
});
