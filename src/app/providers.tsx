'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { AuthProvider } from '@/lib/auth'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  )
}
