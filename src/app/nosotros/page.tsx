'use client';

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiUsers, FiTarget, FiHeart, FiAward } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

const values = [
  {
    icon: FiHeart,
    title: 'Cercanía',
    description: 'Tratamos cada caso de forma personal, escuchando tus necesidades y adaptándonos a ti.',
  },
  {
    icon: FiTarget,
    title: 'Transparencia',
    description: 'Sin letra pequeña ni sorpresas. Comunicación clara y honesta en todo momento.',
  },
  {
    icon: FiAward,
    title: 'Profesionalidad',
    description: 'Años de experiencia en el mercado inmobiliario de Madrid avalan nuestro trabajo.',
  },
  {
    icon: FiUsers,
    title: 'Compromiso',
    description: 'Tu satisfacción es nuestro objetivo principal. Trabajamos hasta conseguirlo.',
  },
];

const stats = [
  { value: '+100', label: 'Ventas cerradas' },
  { value: '98%', label: 'Clientes satisfechos' },
  { value: '15', label: 'Años de experiencia' },
  { value: '24h', label: 'Tiempo de respuesta' },
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

export default function NosotrosPage() {
  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      {/* Hero Section */}
      <Box position="relative" overflow="hidden">
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
            left: '10%',
            width: '50%',
            height: '80%',
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: 32, md: 40 }} pb={{ base: 20, md: 28 }}>
          <VStack spacing={6} textAlign="center" maxW="700px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassPill colorScheme="teal">
                <Text>Sobre nosotros</Text>
              </GlassPill>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading textStyle="heroTitle" color="white" mb={4}>
                Una agencia con valores claros
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.700" maxW="540px" mx="auto">
                Somos una agencia inmobiliaria en Madrid comprometida con hacer las cosas bien, de forma transparente y profesional.
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Story Section */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
            <GridItem>
              <AnimatedSection>
                <GlassCard variant="accent" p={0} overflow="hidden">
                  <Box
                    h="400px"
                    bg="linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(245, 158, 11, 0.04) 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiUsers} boxSize={24} color="brand.glass.200" />
                  </Box>
                </GlassCard>
              </AnimatedSection>
            </GridItem>

            <GridItem>
              <AnimatedSection delay={0.2}>
                <VStack align="flex-start" spacing={6}>
                  <Text textStyle="eyebrow">Nuestra historia</Text>
                  <Heading textStyle="sectionTitle" maxW="400px">
                    Nacimos con un objetivo claro
                  </Heading>
                  <Text textStyle="subtitle">
                    Hacer las cosas bien y de forma transparente. Creemos que vender o comprar una vivienda no debe ser estresante ni confuso.
                  </Text>
                  <Text color="brand.charcoal.600" lineHeight="1.7">
                    Por eso apostamos por una comunicación clara, precios realistas y un acompañamiento cercano. Trabajamos por y para las personas, cuidando cada detalle del proceso para que la experiencia sea lo más sencilla posible.
                  </Text>
                  <Text color="brand.charcoal.600" lineHeight="1.7">
                    Nuestro equipo combina la experiencia del sector con una visión fresca y moderna del mercado inmobiliario. Creemos en la tecnología como herramienta, pero nunca perdemos el trato humano que hace la diferencia.
                  </Text>
                </VStack>
              </AnimatedSection>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={{ base: 16, md: 24 }} bg="rgba(0, 0, 0, 0.02)">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 6, md: 8 }}>
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <GlassCard variant="subtle" p={8} textAlign="center">
                  <Text
                    fontFamily="heading"
                    fontSize={{ base: '36px', md: '48px' }}
                    fontWeight="600"
                    bgGradient="linear(135deg, brand.glass.600, brand.glass.500)"
                    bgClip="text"
                    lineHeight="1"
                    mb={2}
                  >
                    {stat.value}
                  </Text>
                  <Text color="brand.charcoal.600" fontSize="14px">
                    {stat.label}
                  </Text>
                </GlassCard>
              </AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <AnimatedSection>
            <VStack spacing={4} textAlign="center" mb={16}>
              <Text textStyle="eyebrow">Nuestros valores</Text>
              <Heading textStyle="sectionTitle" maxW="400px">
                Lo que nos define
              </Heading>
            </VStack>
          </AnimatedSection>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <GlassCard variant="default" p={8} h="100%" textAlign="center">
                  <VStack spacing={5}>
                    <Box
                      w={16}
                      h={16}
                      borderRadius="20px"
                      bg="brand.glass.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={value.icon} boxSize={7} color="brand.glass.600" />
                    </Box>
                    <Heading size="md" fontFamily="heading">
                      {value.title}
                    </Heading>
                    <Text color="brand.charcoal.600" fontSize="14px" lineHeight="1.6">
                      {value.description}
                    </Text>
                  </VStack>
                </GlassCard>
              </AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
