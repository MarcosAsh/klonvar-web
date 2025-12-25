'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

const MotionBox = motion(Box);

type GlassVariant = 'default' | 'elevated' | 'subtle' | 'dark' | 'accent';

interface GlassCardProps extends Omit<BoxProps, keyof HTMLMotionProps<'div'>> {
  variant?: GlassVariant;
  hover?: boolean;
  children: React.ReactNode;
}

const variants = {
  default: {
    bg: 'rgba(255, 255, 255, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
  },
  elevated: {
    bg: 'rgba(255, 255, 255, 0.88)',
    backdropFilter: 'blur(24px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  },
  subtle: {
    bg: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(12px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
  },
  dark: {
    bg: 'rgba(29, 29, 31, 0.88)',
    backdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    color: 'white',
  },
  accent: {
    bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(245, 158, 11, 0.04) 100%)',
    backdropFilter: 'blur(24px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 12px 40px rgba(6, 182, 212, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
  },
};

const hoverStyles = {
  default: {
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    transform: 'translateY(-4px)',
  },
  elevated: {
    boxShadow: '0 32px 80px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-6px)',
  },
  subtle: {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    transform: 'translateY(-2px)',
  },
  dark: {
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-4px)',
  },
  accent: {
    boxShadow: '0 20px 60px rgba(6, 182, 212, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
    transform: 'translateY(-4px)',
  },
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = 'default', hover = true, children, ...props }, ref) => {
    const variantStyles = variants[variant];
    const variantHoverStyles = hover ? hoverStyles[variant] : {};

    return (
      <MotionBox
        ref={ref}
        position="relative"
        overflow="hidden"
        borderRadius="24px"
        transition="all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        sx={{
          ...variantStyles,
          _hover: hover ? variantHoverStyles : {},
        }}
        {...props}
      >
        {/* Inner highlight layer */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="1px"
          bg="linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)"
          pointerEvents="none"
        />
        {children}
      </MotionBox>
    );
  }
);

GlassCard.displayName = 'GlassCard';

// Glass button variant
interface GlassButtonProps extends BoxProps {
  children: React.ReactNode;
}

export const GlassButton = forwardRef<HTMLDivElement, GlassButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <MotionBox
        ref={ref}
        as="button"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        px={6}
        py={3}
        borderRadius="980px"
        bg="rgba(255, 255, 255, 0.72)"
        backdropFilter="blur(20px) saturate(180%)"
        border="1px solid rgba(255, 255, 255, 0.22)"
        boxShadow="0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
        fontWeight="500"
        fontSize="15px"
        cursor="pointer"
        transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _hover={{
          bg: 'rgba(255, 255, 255, 0.88)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          transform: 'scale(1.02)',
        }}
        _active={{
          transform: 'scale(0.98)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </MotionBox>
    );
  }
);

GlassButton.displayName = 'GlassButton';

// Floating glass pill for status/tags
interface GlassPillProps extends BoxProps {
  children: React.ReactNode;
  colorScheme?: 'teal' | 'amber' | 'neutral';
}

export const GlassPill = forwardRef<HTMLDivElement, GlassPillProps>(
  ({ children, colorScheme = 'neutral', ...props }, ref) => {
    const colors = {
      teal: {
        bg: 'rgba(6, 182, 212, 0.12)',
        color: 'brand.glass.700',
        border: 'rgba(6, 182, 212, 0.2)',
      },
      amber: {
        bg: 'rgba(245, 158, 11, 0.12)',
        color: 'brand.accent.700',
        border: 'rgba(245, 158, 11, 0.2)',
      },
      neutral: {
        bg: 'rgba(0, 0, 0, 0.04)',
        color: 'brand.charcoal.700',
        border: 'rgba(0, 0, 0, 0.06)',
      },
    };

    const scheme = colors[colorScheme];

    return (
      <Box
        ref={ref}
        display="inline-flex"
        alignItems="center"
        px={3}
        py={1.5}
        borderRadius="980px"
        bg={scheme.bg}
        color={scheme.color}
        border={`1px solid ${scheme.border}`}
        fontSize="12px"
        fontWeight="600"
        letterSpacing="0.02em"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

GlassPill.displayName = 'GlassPill';
