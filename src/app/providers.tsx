'use client'

import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { AuthProvider } from '@/lib/auth'
import { BackgroundWatermark } from '@/components/ui/BackgroundWatermark'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {/* Global translucent logo watermark */}
        <BackgroundWatermark opacity={0.025} position="center" size="60vw" />
        <Box position="relative" zIndex={1}>
          {children}
        </Box>
      </AuthProvider>
    </ChakraProvider>
  )
}