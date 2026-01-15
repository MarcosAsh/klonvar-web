'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  FiArrowRight,
  FiCheck,
  FiTrendingUp,
  FiCamera,
  FiUsers,
  FiFileText,
  FiHome,
  FiKey,
} from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

const steps = [
  {
    icon: FiTrendingUp,
    title: 'Valoración profesional',
    description: 'Analizamos el mercado real de tu zona para fijar un precio competitivo y realista.',
  },
  {
    icon: FiHome,
    title: 'Preparación',
    description: 'Te asesoramos para presentar tu vivienda de la mejor manera posible.',
  },
  {
    icon: FiCamera,
    title: 'Marketing premium',
    description: 'Fotos profesionales, vídeos y difusión en los mejores portales inmobiliarios.',
  },
  {
    icon: FiUsers,
    title: 'Gestión de visitas',
    description: 'Filtramos compradores solventes y organizamos todas las visitas.',
  },
  {
    icon: FiFileText,
    title: 'Negociación',
    description: 'Defendemos tus intereses para conseguir las mejores condiciones.',
  },
  {
    icon: FiKey,
    title: 'Hasta la firma',
    description: 'Te acompañamos hasta la notaría y resolvemos cualquier trámite.',
  },
];

const benefits = [
  'Valoración profesional y realista',
  'Marketing inmobiliario de calidad',
  'Filtrado de compradores solventes',
  'Acompañamiento hasta la firma en Notaría',
  'Sin costes ocultos',
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </MotionBox>
  );
}

export default function VenderPage() {
  return (
    <Box bg="rgba(250, 250, 250, 0.85)" minH="100vh">
      <Header />

      {/* Hero Section */}
      <Box position="relative" overflow="hidden">
        {/* Dark gradient background */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="brand.charcoal.900"
          _before={{
            content: '""',
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: '60%',
            height: '80%',
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '50%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: 36, md: 40 }} pb={{ base: 20, md: 28 }}>
          <VStack spacing={6} textAlign="center" maxW="700px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassPill colorScheme="teal">
                <Text>Vende tu vivienda</Text>
              </GlassPill>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading textStyle="heroTitle" color="white" mb={4}>
                Vende con tranquilidad y al mejor precio
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.700" maxW="540px" mx="auto">
                Nos encargamos de todo para que tú no te preocupes. Acompañamiento completo desde la valoración hasta la firma.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HStack spacing={4} pt={4}>
                <Link href="/valoracion">
                  <Button
                    size="xl"
                    bg="white"
                    color="brand.charcoal.900"
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      bg: 'whiteAlpha.900',
                      transform: 'scale(1.02)',
                    }}
                  >
                    Valoración Gratuita
                  </Button>
                </Link>
              </HStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Why Us Section */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
            <GridItem>
              <AnimatedSection>
                <VStack align="flex-start" spacing={6}>
                  <Text textStyle="eyebrow">¿Por qué con nosotros?</Text>
                  <Heading textStyle="sectionTitle" maxW="400px">
                    Vender bien no es solo poner un anuncio
                  </Heading>
                  <Text textStyle="subtitle" maxW="450px">
                    Es saber cuánto vale realmente tu vivienda, cómo presentarla y a quién vendérsela. Te ayudamos a vender de forma segura, sin estrés y al mejor precio.
                  </Text>

                  <VStack align="flex-start" spacing={3} pt={4}>
                    {benefits.map((benefit) => (
                      <HStack key={benefit} spacing={3}>
                        <Box
                          w={6}
                          h={6}
                          borderRadius="8px"
                          bg="brand.glass.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiCheck} color="brand.glass.600" boxSize={4} />
                        </Box>
                        <Text fontWeight="500" color="brand.charcoal.800">
                          {benefit}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Box pt={4}>
                    <Link href="/valoracion">
                      <Button variant="primary" size="lg" rightIcon={<FiArrowRight />}>
                        Solicitar Valoración Gratuita
                      </Button>
                    </Link>
                  </Box>
                </VStack>
              </AnimatedSection>
            </GridItem>

            <GridItem>
              <AnimatedSection delay={0.2}>
                <GlassCard variant="accent" p={0} overflow="hidden">
                  <Box
                    h="400px"
                    bg="linear-gradient(135deg, brand.charcoal.800 0%, brand.charcoal.900 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Icon as={FiTrendingUp} boxSize={24} color="whiteAlpha.200" />
                    <Box
                      position="absolute"
                      bottom={6}
                      left={6}
                      right={6}
                      p={5}
                      bg="rgba(255, 255, 255, 0.9)"
                      backdropFilter="blur(10px)"
                      borderRadius="16px"
                    >
                      <Text fontWeight="600" color="brand.charcoal.900" mb={1}>
                        Precio medio de venta
                      </Text>
                      <HStack>
                        <Text fontFamily="heading" fontSize="32px" fontWeight="600" color="brand.glass.600">
                          +12%
                        </Text>
                        <Text color="brand.charcoal.600" fontSize="14px">
                          vs. media del mercado
                        </Text>
                      </HStack>
                    </Box>
                  </Box>
                </GlassCard>
              </AnimatedSection>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box py={{ base: 20, md: 32 }} bg="rgba(0, 0, 0, 0.02)">
        <Container maxW="container.xl">
          <AnimatedSection>
            <VStack spacing={4} textAlign="center" mb={16}>
              <Text textStyle="eyebrow">Nuestro proceso</Text>
              <Heading textStyle="sectionTitle" maxW="500px">
                Cómo trabajamos contigo
              </Heading>
            </VStack>
          </AnimatedSection>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.1}>
                <GlassCard variant="default" p={8} h="100%">
                  <HStack spacing={4} mb={5}>
                    <Box
                      w={14}
                      h={14}
                      borderRadius="16px"
                      bg="brand.charcoal.900"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
                      }}
                    >
                      <Icon as={step.icon} boxSize={6} color="white" />
                    </Box>
                    <Text
                      fontFamily="heading"
                      fontSize="40px"
                      fontWeight="600"
                      color="brand.stone.200"
                      lineHeight="1"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                  </HStack>
                  <Heading size="md" fontFamily="heading" mb={3}>
                    {step.title}
                  </Heading>
                  <Text color="brand.charcoal.600" fontSize="15px" lineHeight="1.6">
                    {step.description}
                  </Text>
                </GlassCard>
              </AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.lg">
          <AnimatedSection>
            <GlassCard variant="dark" p={{ base: 10, md: 16 }} textAlign="center">
              <VStack spacing={6}>
                <Heading textStyle="sectionTitle" color="white">
                  ¿Listo para vender?
                </Heading>
                <Text fontSize="lg" color="whiteAlpha.700" maxW="400px">
                  Solicita una valoración gratuita y descubre cuánto vale tu vivienda.
                </Text>
                <Link href="/valoracion">
                  <Button
                    size="xl"
                    bg="white"
                    color="brand.charcoal.900"
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      bg: 'whiteAlpha.900',
                      transform: 'scale(1.02)',
                    }}
                  >
                    Solicitar Valoración
                  </Button>
                </Link>
              </VStack>
            </GlassCard>
          </AnimatedSection>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
