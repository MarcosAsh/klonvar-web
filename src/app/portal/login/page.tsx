'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useAuth } from '@/lib/auth'
import { GlassCard } from '@/components/ui/GlassCard'

const MotionBox = motion(Box)

export default function PortalLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await signIn(email, password)

    setIsLoading(false)

    if (!result.success) {
      toast({
        title: 'Error',
        description: result.error,
        status: 'error',
        duration: 5000,
      })
    }
  }

  return (
    <Box minH="100vh" bg="brand.charcoal.900" position="relative" overflow="hidden">
      {/* Background gradients */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        width="50%"
        height="70%"
        background="radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%)"
        filter="blur(80px)"
      />
      <Box
        position="absolute"
        bottom="-30%"
        left="-10%"
        width="40%"
        height="60%"
        background="radial-gradient(ellipse, rgba(245, 158, 11, 0.1) 0%, transparent 70%)"
        filter="blur(60px)"
      />

      <Container maxW="container.sm" position="relative" zIndex={1} pt={{ base: 20, md: 32 }} pb={20}>
        <VStack spacing={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Link href="/">
              <HStack spacing={2} justify="center" mb={8}>
                <Box
                  w="48px"
                  h="48px"
                  borderRadius="14px"
                  bg="linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(6, 182, 212, 0.7) 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontFamily="heading" fontWeight="700" fontSize="22px" color="white">
                    K
                  </Text>
                </Box>
              </HStack>
            </Link>
            <Heading color="white" fontSize={{ base: '32px', md: '40px' }} fontFamily="heading" mb={3}>
              Accede a tu portal
            </Heading>
            <Text color="whiteAlpha.700" fontSize="lg">
              Gestiona tus propiedades y documentos
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            w="100%"
          >
            <GlassCard variant="elevated" p={{ base: 6, md: 10 }}>
              <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="500" color="brand.charcoal.800">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="500" color="brand.charcoal.800">
                      Contraseña
                    </FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      size="lg"
                    />
                  </FormControl>

                  <HStack w="100%" justify="flex-end">
                    <Link href="/portal/forgot-password">
                      <ChakraLink color="brand.glass.600" fontSize="sm">
                        ¿Olvidaste tu contraseña?
                      </ChakraLink>
                    </Link>
                  </HStack>

                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    width="100%"
                    isLoading={isLoading}
                    rightIcon={<FiArrowRight />}
                  >
                    Iniciar sesión
                  </Button>
                </VStack>
              </Box>
            </GlassCard>
          </MotionBox>

          <Text color="whiteAlpha.600" fontSize="sm">
            ¿No tienes cuenta?{' '}
            <Link href="/portal/register">
              <ChakraLink color="brand.glass.400">Regístrate aquí</ChakraLink>
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
