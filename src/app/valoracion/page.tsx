'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiSend, FiHome, FiClock, FiShield, FiTrendingUp } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const benefits = [
  {
    icon: FiClock,
    title: 'En 24 horas',
    description: 'Recibirás tu valoración en menos de un día laborable.',
  },
  {
    icon: FiShield,
    title: 'Sin compromiso',
    description: 'Totalmente gratuito y sin ninguna obligación por tu parte.',
  },
  {
    icon: FiTrendingUp,
    title: 'Datos reales',
    description: 'Basada en el mercado actual y ventas recientes de tu zona.',
  },
];

export default function ValoracionPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un email válido';
    }

    if (!formData.phone || !/^(\+34)?[6-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Introduce un teléfono válido (ej: 612345678)';
    }

    if (!formData.address || formData.address.length < 5) {
      newErrors.address = 'La dirección debe tener al menos 5 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: '¡Solicitud enviada!',
          description: 'Te contactaremos en menos de 24 horas.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Ha ocurrido un error. Inténtalo de nuevo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la solicitud. Inténtalo de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="rgba(250, 250, 250, 0.85)" minH="100vh">
      <Header />

      {/* Hero Section */}
      <Box
        position="relative"
        pt={{ base: 32, md: 40 }}
        pb={{ base: 20, md: 32 }}
        overflow="hidden"
      >
        {/* Background gradient orbs */}
        <Box
          position="absolute"
          top="-20%"
          right="-10%"
          width="50vw"
          height="50vw"
          maxW="600px"
          maxH="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)"
          filter="blur(60px)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-30%"
          left="-10%"
          width="40vw"
          height="40vw"
          maxW="500px"
          maxH="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)"
          filter="blur(50px)"
          pointerEvents="none"
        />

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="start">
            {/* Left Column - Info */}
            <GridItem>
              <VStack align="flex-start" spacing={6}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <GlassPill colorScheme="teal">
                    <HStack spacing={2}>
                      <Icon as={FiHome} boxSize={3} />
                      <Text>Valoración gratuita</Text>
                    </HStack>
                  </GlassPill>
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Heading textStyle="heroTitle" mb={4}>
                    Descubre el valor real de tu vivienda
                  </Heading>
                  <Text textStyle="subtitle" maxW="460px">
                    Te ayudamos a conocer cuánto vale tu propiedad según el mercado actual, sin compromiso.
                  </Text>
                </MotionBox>

                {/* Benefits */}
                <VStack align="flex-start" spacing={4} pt={6} w="100%">
                  {benefits.map((benefit, index) => (
                    <MotionBox
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      w="100%"
                    >
                      <GlassCard variant="subtle" p={5}>
                        <HStack spacing={4}>
                          <Box
                            w={12}
                            h={12}
                            borderRadius="14px"
                            bg="brand.charcoal.900"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                          >
                            <Icon as={benefit.icon} boxSize={5} color="white" />
                          </Box>
                          <Box>
                            <Text fontWeight="600" color="brand.charcoal.900" mb={0.5}>
                              {benefit.title}
                            </Text>
                            <Text fontSize="14px" color="brand.charcoal.600">
                              {benefit.description}
                            </Text>
                          </Box>
                        </HStack>
                      </GlassCard>
                    </MotionBox>
                  ))}
                </VStack>
              </VStack>
            </GridItem>

            {/* Right Column - Form */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GlassCard variant="elevated" p={{ base: 6, md: 10 }}>
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <MotionBox
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        textAlign="center"
                        py={10}
                      >
                        <Box
                          w={20}
                          h={20}
                          borderRadius="full"
                          bg="brand.glass.500"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mx="auto"
                          mb={6}
                        >
                          <Icon as={FiCheck} boxSize={10} color="white" />
                        </Box>
                        <Heading size="lg" fontFamily="heading" mb={3}>
                          ¡Solicitud recibida!
                        </Heading>
                        <Text color="brand.charcoal.600" maxW="300px" mx="auto">
                          Un agente te contactará en menos de 24 horas para completar la valoración.
                        </Text>
                      </MotionBox>
                    ) : (
                      <MotionBox
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <VStack spacing={2} mb={8} align="flex-start">
                          <Heading size="lg" fontFamily="heading">
                            Solicitar valoración
                          </Heading>
                          <Text color="brand.charcoal.500" fontSize="15px">
                            Completa el formulario y te contactaremos pronto.
                          </Text>
                        </VStack>

                        <Box as="form" onSubmit={handleSubmit}>
                          <VStack spacing={5}>
                            <FormControl isInvalid={!!errors.name}>
                              <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                Nombre completo
                              </FormLabel>
                              <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                size="lg"
                              />
                              <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>

                            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="100%">
                              <FormControl isInvalid={!!errors.email}>
                                <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                  Email
                                </FormLabel>
                                <Input
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="tu@email.com"
                                  size="lg"
                                />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                              </FormControl>

                              <FormControl isInvalid={!!errors.phone}>
                                <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                  Teléfono
                                </FormLabel>
                                <Input
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="612 345 678"
                                  size="lg"
                                />
                                <FormErrorMessage>{errors.phone}</FormErrorMessage>
                              </FormControl>
                            </Grid>

                            <FormControl isInvalid={!!errors.address}>
                              <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                Dirección del inmueble
                              </FormLabel>
                              <Input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Calle, número, ciudad"
                                size="lg"
                              />
                              <FormErrorMessage>{errors.address}</FormErrorMessage>
                            </FormControl>

                            <FormControl>
                              <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                Mensaje (opcional)
                              </FormLabel>
                              <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Cuéntanos más sobre tu vivienda..."
                                size="lg"
                                rows={4}
                              />
                            </FormControl>

                            <Button
                              type="submit"
                              variant="primary"
                              size="xl"
                              width="100%"
                              isLoading={isLoading}
                              loadingText="Enviando..."
                              rightIcon={<FiSend />}
                            >
                              Solicitar valoración gratuita
                            </Button>

                            <Text fontSize="13px" color="brand.charcoal.400" textAlign="center">
                              Al enviar aceptas nuestra política de privacidad. Nunca compartiremos tus datos.
                            </Text>
                          </VStack>
                        </Box>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
