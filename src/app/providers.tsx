'use client'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { AuthProvider } from '@/lib/auth'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {/* Background color for the whole app */}
        <Box bg="rgba(250, 250, 250, 0.85)" minH="100vh">
          {/* Watermark - behind everything */}
          <img 
            src="/logo.png" 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70vw',
              maxWidth: '900px',
              opacity: 0.5,
              zIndex: 1,
              pointerEvents: 'none',
              filter: 'grayscale(100%)'
            }}
          />
          {/* Content - remove bg from individual pages */}
          <Box position="relative" zIndex={1}>
            {children}
          </Box>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  )
}