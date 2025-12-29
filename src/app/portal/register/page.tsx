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
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { useAuth } from '@/lib/auth'
import { GlassCard } from '@/components/ui/GlassCard'

const MotionBox = motion(Box)

export default function PortalRegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { signUp } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await signUp(email, password, { name, phone: phone || undefined })

    setIsLoading(false)

    if (result.success) {
      setIsSuccess(true)
    } else {
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
              Crea tu cuenta
            </Heading>
            <Text color="whiteAlpha.700" fontSize="lg">
              Únete a Klonvar y gestiona tus propiedades
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            w="100%"
          >
            <GlassCard variant="elevated" p={{ base: 6, md: 10 }}>
              {isSuccess ? (
                <VStack spacing={6} py={8}>
                  <Box
                    w={20}
                    h={20}
                    borderRadius="full"
                    bg="brand.glass.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiCheck} boxSize={10} color="white" />
                  </Box>
                  <VStack spacing={2}>
                    <Heading size="lg" fontFamily="heading">
                      ¡Registro exitoso!
                    </Heading>
                    <Text color="brand.charcoal.600" textAlign="center">
                      Hemos enviado un email de confirmación a <strong>{email}</strong>. Por favor, revisa tu bandeja de entrada y confirma tu cuenta.
                    </Text>
                  </VStack>
                  <Link href="/portal/login">
                    <Button variant="primary" size="lg">
                      Ir a Iniciar Sesión
                    </Button>
                  </Link>
                </VStack>
              ) : (
                <Box as="form" onSubmit={handleSubmit}>
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel fontWeight="500" color="brand.charcoal.800">
                        Nombre completo
                      </FormLabel>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        size="lg"
                      />
                    </FormControl>

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

                    <FormControl>
                      <FormLabel fontWeight="500" color="brand.charcoal.800">
                        Teléfono (opcional)
                      </FormLabel>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="612 345 678"
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
                        placeholder="Mínimo 6 caracteres"
                        size="lg"
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      variant="primary"
                      size="xl"
                      width="100%"
                      isLoading={isLoading}
                      rightIcon={<FiArrowRight />}
                    >
                      Crear cuenta
                    </Button>

                    <Text fontSize="13px" color="brand.charcoal.400" textAlign="center">
                      Al registrarte aceptas nuestros términos y condiciones.
                    </Text>
                  </VStack>
                </Box>
              )}
            </GlassCard>
          </MotionBox>

          {!isSuccess && (
            <Text color="whiteAlpha.600" fontSize="sm">
              ¿Ya tienes cuenta?{' '}
              <Link href="/portal/login">
                <ChakraLink color="brand.glass.400">Inicia sesión</ChakraLink>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
