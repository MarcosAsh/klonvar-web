'use client';

import { Box, Image } from '@chakra-ui/react';

interface BackgroundWatermarkProps {
  opacity?: number;
  position?: 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: string;
}

export function BackgroundWatermark({ 
  opacity = 0.5, 
  position = 'center',
  size = '200vw'
}: BackgroundWatermarkProps) {
  const positionStyles = {
    'center': {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    'bottom-right': {
      bottom: '10%',
      right: '5%',
      transform: 'none',
    },
    'bottom-left': {
      bottom: '10%',
      left: '5%',
      transform: 'none',
    },
    'top-right': {
      top: '20%',
      right: '5%',
      transform: 'none',
    },
    'top-left': {
      top: '20%',
      left: '5%',
      transform: 'none',
    },
  };

  return (
    <Box
      position="fixed"
      zIndex={0}
      pointerEvents="none"
      opacity={opacity}
      {...positionStyles[position]}
      w={size}
      h={size}
      maxW="800px"
      maxH="800px"
    >
      <Image
        src="/logo.png"
        alt=""
        w="100%"
        h="100%"
        objectFit="contain"
        filter="grayscale(100%)"
        fallback={
          <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="30vw"
            fontFamily="heading"
            fontWeight="700"
            color="brand.charcoal.900"
          >
            K
          </Box>
        }
      />
    </Box>
  );
}