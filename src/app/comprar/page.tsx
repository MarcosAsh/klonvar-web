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
  FiSearch,
  FiHome,
  FiFileText,
  FiKey,
} from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

const features = [
  {
    icon: FiSearch,
    title: 'Búsqueda personalizada',
    description: 'Te ayudamos a definir exactamente lo que buscas según tus necesidades y presupuesto.',
  },
  {
    icon: FiHome,
    title: 'Selección de viviendas',
    description: 'Filtramos las opciones que mejor encajan contigo para ahorrarte tiempo.',
  },
  {
    icon: FiFileText,
    title: 'Asesoramiento completo',
    description: 'Te acompañamos en las visitas y en toda la negociación.',
  },
  {
    icon: FiKey,
    title: 'Hasta las llaves',
    description: 'Revisión documental y acompañamiento hasta la firma en notaría.',
  },
];

const benefits = [
  'Te ayudamos a definir lo que buscas',
  'Seleccionamos viviendas que encajen',
  'Asesoramiento en la negociación',
  'Revisión de documentación',
  'Acompañamiento hasta la firma',
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

export default function ComprarPage() {
  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      {/* Hero Section */}
      <Box position="relative" overflow="hidden">
        {/* Gradient background */}
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
            top: '-20%',
            left: '-10%',
            width: '50%',
            height: '70%',
            background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-30%',
            right: '-5%',
            width: '60%',
            height: '80%',
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: 32, md: 40 }} pb={{ base: 20, md: 28 }}>
          <VStack spacing={6} textAlign="center" maxW="700px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassPill colorScheme="amber">
                <Text>Compra tu vivienda</Text>
              </GlassPill>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading textStyle="heroTitle" color="white" mb={4}>
                Encuentra tu vivienda ideal en Madrid
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.700" maxW="500px" mx="auto">
                Te ayudamos a comprar con seguridad, sin sorpresas y con acompañamiento profesional en cada paso.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HStack spacing={4} pt={4}>
                <Link href="/propiedades">
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
                    Ver Viviendas
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button
                    size="xl"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.100' }}
                  >
                    Contactar
                  </Button>
                </Link>
              </HStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* What We Do Section */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
            <GridItem order={{ base: 2, lg: 1 }}>
              <AnimatedSection delay={0.2}>
                <GlassCard variant="accent" p={0} overflow="hidden">
                  <Box
                    h="400px"
                    bg="linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Icon as={FiKey} boxSize={24} color="brand.accent.200" />
                  </Box>
                </GlassCard>
              </AnimatedSection>
            </GridItem>

            <GridItem order={{ base: 1, lg: 2 }}>
              <AnimatedSection>
                <VStack align="flex-start" spacing={6}>
                  <Text textStyle="eyebrow">¿Qué hacemos por ti?</Text>
                  <Heading textStyle="sectionTitle" maxW="420px">
                    Comprar una vivienda es una decisión importante
                  </Heading>
                  <Text textStyle="subtitle" maxW="450px">
                    Te ayudamos a encontrar la que encaja contigo y te acompañamos durante todo el proceso para que compres con tranquilidad.
                  </Text>

                  <VStack align="flex-start" spacing={3} pt={4}>
                    {benefits.map((benefit) => (
                      <HStack key={benefit} spacing={3}>
                        <Box
                          w={6}
                          h={6}
                          borderRadius="8px"
                          bg="brand.accent.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiCheck} color="brand.accent.600" boxSize={4} />
                        </Box>
                        <Text fontWeight="500" color="brand.charcoal.800">
                          {benefit}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Box pt={4}>
                    <Link href="/propiedades">
                      <Button variant="accent" size="lg" rightIcon={<FiArrowRight />}>
                        Ver Viviendas Disponibles
                      </Button>
                    </Link>
                  </Box>
                </VStack>
              </AnimatedSection>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box py={{ base: 20, md: 32 }} bg="rgba(0, 0, 0, 0.02)">
        <Container maxW="container.xl">
          <AnimatedSection>
            <VStack spacing={4} textAlign="center" mb={16}>
              <Text textStyle="eyebrow">Nuestro servicio</Text>
              <Heading textStyle="sectionTitle" maxW="500px">
                Te acompañamos en cada paso
              </Heading>
            </VStack>
          </AnimatedSection>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <GlassCard variant="default" p={8} h="100%" textAlign="center">
                  <VStack spacing={5}>
                    <Box
                      w={16}
                      h={16}
                      borderRadius="20px"
                      bg="brand.accent.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={feature.icon} boxSize={7} color="brand.accent.600" />
                    </Box>
                    <Heading size="md" fontFamily="heading">
                      {feature.title}
                    </Heading>
                    <Text color="brand.charcoal.600" fontSize="14px" lineHeight="1.6">
                      {feature.description}
                    </Text>
                  </VStack>
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
            <GlassCard
              variant="default"
              p={{ base: 10, md: 16 }}
              textAlign="center"
              sx={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(6, 182, 212, 0.04) 100%)',
              }}
            >
              <VStack spacing={6}>
                <Heading textStyle="sectionTitle">
                  ¿Buscas tu próxima vivienda?
                </Heading>
                <Text textStyle="subtitle" maxW="400px">
                  Explora nuestras propiedades o cuéntanos qué necesitas.
                </Text>
                <HStack spacing={4} pt={2}>
                  <Link href="/propiedades">
                    <Button variant="primary" size="xl" rightIcon={<FiArrowRight />}>
                      Ver Propiedades
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button variant="secondary" size="xl">
                      Contactar
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            </GlassCard>
          </AnimatedSection>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
