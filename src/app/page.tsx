'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  FiArrowRight,
  FiTrendingUp,
  FiCamera,
  FiUsers,
  FiShield,
  FiFileText,
  FiKey,
  FiHome,
  FiCheck,
} from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Benefits data
const benefits = [
  {
    icon: FiTrendingUp,
    title: 'Valoraciones realistas',
    description: 'Basadas en datos reales del mercado y análisis comparativo de tu zona.',
  },
  {
    icon: FiCamera,
    title: 'Marketing profesional',
    description: 'Fotografía de alta calidad y difusión en los mejores portales.',
  },
  {
    icon: FiUsers,
    title: 'Filtrado de compradores',
    description: 'Solo visitas con compradores verificados y solventes.',
  },
  {
    icon: FiShield,
    title: 'Negociación experta',
    description: 'Defendemos tus intereses para conseguir el mejor precio.',
  },
  {
    icon: FiFileText,
    title: 'Gestión legal completa',
    description: 'Acompañamiento hasta notaría sin sorpresas.',
  },
  {
    icon: FiKey,
    title: 'Sin complicaciones',
    description: 'Nos encargamos de todo, tú solo decides.',
  },
];

// Process steps
const steps = [
  { number: '01', title: 'Valoración', description: 'Análisis del mercado' },
  { number: '02', title: 'Preparación', description: 'Home staging' },
  { number: '03', title: 'Marketing', description: 'Difusión premium' },
  { number: '04', title: 'Visitas', description: 'Filtrado de interesados' },
  { number: '05', title: 'Negociación', description: 'Mejor oferta' },
  { number: '06', title: 'Firma', description: 'Cierre seguro' },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </MotionBox>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      {/* Hero Section */}
      <Box
        ref={heroRef}
        as="section"
        position="relative"
        minH="100vh"
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        {/* Animated Background Gradients */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
          pointerEvents="none"
        >
          {/* Teal gradient orb */}
          <MotionBox
            position="absolute"
            top="-20%"
            right="-10%"
            width="60vw"
            height="60vw"
            maxW="800px"
            maxH="800px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)"
            filter="blur(60px)"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Amber gradient orb */}
          <MotionBox
            position="absolute"
            bottom="-30%"
            left="-15%"
            width="50vw"
            height="50vw"
            maxW="600px"
            maxH="600px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)"
            filter="blur(50px)"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </Box>

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1.1fr 1fr' }}
            gap={{ base: 12, lg: 20 }}
            alignItems="center"
            pt={{ base: 32, md: 0 }}
          >
            {/* Hero Content */}
            <GridItem>
              <MotionBox
                style={{ y: heroY, opacity: heroOpacity }}
              >
                <VStack align="flex-start" spacing={6}>
                  {/* Eyebrow */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <GlassPill colorScheme="teal">
                      <HStack spacing={2}>
                        <Box w={2} h={2} borderRadius="full" bg="brand.glass.500" />
                        <Text>Inmobiliaria en Madrid</Text>
                      </HStack>
                    </GlassPill>
                  </MotionBox>

                  {/* Main Headline */}
                  <MotionHeading
                    as="h1"
                    textStyle="heroTitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    Vende o compra tu vivienda con{' '}
                    <Text
                      as="span"
                      bgGradient="linear(135deg, brand.glass.600, brand.glass.500)"
                      bgClip="text"
                    >
                      total confianza
                    </Text>
                  </MotionHeading>

                  {/* Subtitle */}
                  <MotionText
                    textStyle="subtitle"
                    maxW="480px"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Te acompañamos de principio a fin para que consigas el mejor resultado, sin estrés y con total transparencia.
                  </MotionText>

                  {/* CTA Buttons */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <HStack spacing={4} pt={4} flexWrap="wrap">
                      <Link href="/valoracion">
                        <Button variant="primary" size="xl" rightIcon={<FiArrowRight />}>
                          Valoración Gratuita
                        </Button>
                      </Link>
                      <Link href="/propiedades">
                        <Button variant="secondary" size="xl">
                          Ver Propiedades
                        </Button>
                      </Link>
                    </HStack>
                  </MotionBox>

                  {/* Trust indicators */}
                  <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    pt={6}
                  >
                    <HStack spacing={6} color="brand.charcoal.500" fontSize="14px">
                      {['Sin comisiones ocultas', '+100 ventas cerradas', 'Valoración en 24h'].map((text) => (
                        <HStack key={text} spacing={2}>
                          <Icon as={FiCheck} color="brand.glass.500" />
                          <Text>{text}</Text>
                        </HStack>
                      ))}
                    </HStack>
                  </MotionBox>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Hero Visual - Floating Glass Cards */}
            <GridItem display={{ base: 'none', lg: 'block' }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                position="relative"
                h="500px"
              >
                {/* Main Property Card */}
                <GlassCard
                  variant="elevated"
                  position="absolute"
                  top="10%"
                  left="10%"
                  w="320px"
                  p={0}
                  overflow="hidden"
                >
                  <Box h="180px" bg="linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 100%)" position="relative">
                    <Icon
                      as={FiHome}
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      boxSize={16}
                      color="whiteAlpha.200"
                    />
                    <GlassPill
                      colorScheme="teal"
                      position="absolute"
                      top={4}
                      left={4}
                    >
                      Destacado
                    </GlassPill>
                  </Box>
                  <Box p={5}>
                    <Text fontFamily="heading" fontSize="24px" fontWeight="600" mb={1}>
                      €485.000
                    </Text>
                    <Text fontSize="15px" color="brand.charcoal.600" mb={3}>
                      Piso en Salamanca, Madrid
                    </Text>
                    <HStack spacing={4} fontSize="13px" color="brand.charcoal.500">
                      <Text>3 hab</Text>
                      <Text>•</Text>
                      <Text>2 baños</Text>
                      <Text>•</Text>
                      <Text>120 m²</Text>
                    </HStack>
                  </Box>
                </GlassCard>

                {/* Stats Card */}
                <GlassCard
                  variant="accent"
                  position="absolute"
                  bottom="15%"
                  right="5%"
                  p={6}
                  w="200px"
                >
                  <VStack spacing={1} align="flex-start">
                    <Text fontSize="40px" fontFamily="heading" fontWeight="600" lineHeight="1">
                      98%
                    </Text>
                    <Text fontSize="14px" color="brand.charcoal.600">
                      Clientes satisfechos
                    </Text>
                  </VStack>
                </GlassCard>

                {/* Small floating element */}
                <MotionBox
                  position="absolute"
                  top="60%"
                  left="0"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <GlassCard variant="default" p={4} w="140px">
                    <HStack>
                      <Box w={10} h={10} borderRadius="12px" bg="brand.glass.100" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FiTrendingUp} color="brand.glass.600" />
                      </Box>
                      <Box>
                        <Text fontSize="13px" fontWeight="600">+15%</Text>
                        <Text fontSize="11px" color="brand.charcoal.500">este mes</Text>
                      </Box>
                    </HStack>
                  </GlassCard>
                </MotionBox>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>

        {/* Scroll indicator */}
        <MotionBox
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Box
            w="28px"
            h="44px"
            borderRadius="14px"
            border="2px solid"
            borderColor="brand.charcoal.200"
            display="flex"
            justifyContent="center"
            pt={2}
          >
            <Box
              w="4px"
              h="8px"
              borderRadius="2px"
              bg="brand.charcoal.300"
            />
          </Box>
        </MotionBox>
      </Box>

      {/* Benefits Section */}
      <Box as="section" py={{ base: 20, md: 32 }} position="relative">
        <Container maxW="container.xl">
          <AnimatedSection>
            <VStack spacing={4} textAlign="center" mb={16}>
              <Text textStyle="eyebrow">¿Por qué elegirnos?</Text>
              <Heading textStyle="sectionTitle" maxW="600px">
                Confía en quienes saben hacerlo bien
              </Heading>
            </VStack>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {benefits.map((benefit, index) => (
                <MotionBox
                  key={benefit.title}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard variant="subtle" p={8} h="100%">
                    <VStack align="flex-start" spacing={5}>
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
                        <Icon as={benefit.icon} boxSize={6} color="white" />
                      </Box>
                      <Box>
                        <Heading size="md" fontFamily="heading" mb={2}>
                          {benefit.title}
                        </Heading>
                        <Text color="brand.charcoal.600" fontSize="15px" lineHeight="1.6">
                          {benefit.description}
                        </Text>
                      </Box>
                    </VStack>
                  </GlassCard>
                </MotionBox>
              ))}
            </SimpleGrid>
          </motion.div>
        </Container>
      </Box>

      {/* Process Section - Dark Theme */}
      <Box
        as="section"
        py={{ base: 20, md: 32 }}
        position="relative"
        overflow="hidden"
      >
        {/* Dark glass background */}
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
            left: '20%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <AnimatedSection>
            <VStack spacing={4} textAlign="center" mb={16}>
              <Text textStyle="eyebrow" color="brand.glass.400">
                Nuestro proceso
              </Text>
              <Heading textStyle="sectionTitle" color="white" maxW="500px">
                Así trabajamos contigo
              </Heading>
            </VStack>
          </AnimatedSection>

          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={{ base: 6, lg: 4 }}>
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.1}>
                <VStack spacing={4} textAlign="center">
                  <Box position="relative">
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: '48px', md: '64px' }}
                      fontWeight="600"
                      bgGradient="linear(180deg, brand.glass.400, brand.glass.600)"
                      bgClip="text"
                      lineHeight="1"
                    >
                      {step.number}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="sm" color="white" fontFamily="heading" mb={1}>
                      {step.title}
                    </Heading>
                    <Text fontSize="13px" color="whiteAlpha.600">
                      {step.description}
                    </Text>
                  </Box>
                </VStack>
              </AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        as="section"
        py={{ base: 20, md: 32 }}
        position="relative"
        overflow="hidden"
      >
        {/* Gradient background */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(135deg, brand.glass.600, brand.glass.700)"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.15), transparent)',
          }}
        />

        <Container maxW="container.lg" position="relative" zIndex={1}>
          <AnimatedSection>
            <VStack spacing={8} textAlign="center">
              <Heading textStyle="sectionTitle" color="white" maxW="600px">
                ¿Listo para dar el siguiente paso?
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.800" maxW="480px">
                Solicita una valoración gratuita de tu vivienda sin ningún compromiso.
              </Text>
              <HStack spacing={4} pt={4}>
                <Link href="/valoracion">
                  <Button
                    size="xl"
                    bg="white"
                    color="brand.glass.700"
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      bg: 'whiteAlpha.900',
                      transform: 'scale(1.02)',
                    }}
                  >
                    Solicitar Valoración
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button
                    size="xl"
                    variant="ghost"
                    color="white"
                    _hover={{
                      bg: 'whiteAlpha.200',
                    }}
                  >
                    Contactar
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </AnimatedSection>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
