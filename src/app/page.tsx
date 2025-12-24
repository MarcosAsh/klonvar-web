'use client';

import { Box, Button, Container, Flex, Grid, GridItem, Heading, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { FiCheckCircle, FiHome, FiTrendingUp, FiUsers, FiShield, FiCamera, FiFileText, FiKey, FiArrowRight, FiStar } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';

const MotionBox = motion(Box);
const benefits = [
  { icon: FiTrendingUp, title: 'Valoraciones realistas', description: 'Basadas en datos reales del mercado' },
  { icon: FiCamera, title: 'Marketing profesional', description: 'Fotos y difusión de calidad' },
  { icon: FiUsers, title: 'Filtrado de compradores', description: 'Visitas con compradores verificados' },
  { icon: FiShield, title: 'Negociación experta', description: 'Defendemos tus intereses' },
  { icon: FiFileText, title: 'Gestión legal', description: 'Acompañamiento hasta notaría' },
  { icon: FiKey, title: 'Sin complicaciones', description: 'Nos encargamos de todo' },
];
const steps = [
  { n: '01', t: 'Valoración' }, { n: '02', t: 'Preparación' }, { n: '03', t: 'Marketing' },
  { n: '04', t: 'Visitas' }, { n: '05', t: 'Negociación' }, { n: '06', t: 'Firma' },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return <MotionBox ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</MotionBox>;
}

export default function HomePage() {
  return (
    <Box>
      <Header />
      {/* Hero */}
      <Box as="section" position="relative" minH="100vh" display="flex" alignItems="center" bg="brand.cream.50" overflow="hidden">
        <Box position="absolute" top="-20%" right="-10%" w="60%" h="140%" bg="brand.navy.900" transform="skewX(-12deg)" opacity={0.03} />
        <Container maxW="container.xl" pt={{ base: 24, md: 32 }} pb={{ base: 16, md: 24 }}>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={20} alignItems="center">
            <GridItem>
              <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Text fontSize="sm" fontWeight="600" color="brand.teal.600" letterSpacing="wider" textTransform="uppercase" mb={4}>Inmobiliaria en Madrid</Text>
                <Heading as="h1" textStyle="heroTitle" color="brand.navy.900" mb={6}>Vende o compra tu vivienda con <Text as="span" color="brand.teal.600">seguridad</Text></Heading>
                <Text textStyle="subtitle" mb={8} maxW="lg">Te acompañamos de principio a fin para que consigas el mejor resultado.</Text>
                <HStack spacing={4} flexWrap="wrap">
                  <Link href="/valoracion"><Button variant="primary" size="xl" rightIcon={<FiArrowRight />}>Valoración Gratuita</Button></Link>
                  <Link href="/propiedades"><Button variant="secondary" size="xl">Ver Propiedades</Button></Link>
                </HStack>
              </MotionBox>
            </GridItem>
            <GridItem display={{ base: 'none', lg: 'block' }}>
              <MotionBox initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Box borderRadius="2xl" overflow="hidden" boxShadow="0 25px 50px -12px rgba(26, 54, 93, 0.25)">
                  <Box w="100%" h="500px" bgGradient="linear(135deg, brand.navy.800, brand.navy.900)" display="flex" alignItems="center" justifyContent="center">
                    <Icon as={FiHome} boxSize={24} color="whiteAlpha.300" />
                  </Box>
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Benefits */}
      <Box as="section" py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="container.xl">
          <AnimatedSection><VStack spacing={4} textAlign="center" mb={16}><Text fontSize="sm" fontWeight="600" color="brand.teal.600" letterSpacing="wider" textTransform="uppercase">¿Por qué elegirnos?</Text><Heading textStyle="sectionTitle">Confía en expertos</Heading></VStack></AnimatedSection>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <Box p={8} borderRadius="xl" border="1px solid" borderColor="brand.cream.300" bg="brand.cream.50" transition="all 0.3s" _hover={{ borderColor: 'brand.teal.300', transform: 'translateY(-4px)' }}>
                  <Flex w={14} h={14} borderRadius="xl" bg="brand.navy.900" align="center" justify="center" mb={5}><Icon as={b.icon} boxSize={6} color="white" /></Flex>
                  <Heading size="md" fontFamily="heading" mb={3}>{b.title}</Heading>
                  <Text color="brand.navy.600">{b.description}</Text>
                </Box>
              </AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Process */}
      <Box as="section" py={{ base: 16, md: 24 }} bg="brand.navy.900">
        <Container maxW="container.xl">
          <AnimatedSection><VStack spacing={4} textAlign="center" mb={16}><Text fontSize="sm" fontWeight="600" color="brand.teal.400" letterSpacing="wider" textTransform="uppercase">Nuestro proceso</Text><Heading textStyle="sectionTitle" color="white">Cómo trabajamos</Heading></VStack></AnimatedSection>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={8}>
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.1}><VStack spacing={4} textAlign="center"><Text fontFamily="heading" fontSize="4xl" fontWeight="700" color="brand.gold.400">{s.n}</Text><Heading size="sm" color="white">{s.t}</Heading></VStack></AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA */}
      <Box as="section" py={{ base: 16, md: 24 }} bgGradient="linear(135deg, brand.teal.700, brand.teal.900)">
        <Container maxW="container.lg">
          <AnimatedSection>
            <VStack spacing={8} textAlign="center">
              <Heading textStyle="sectionTitle" color="white">¿Listo para dar el siguiente paso?</Heading>
              <Text fontSize="xl" color="whiteAlpha.800">Solicita una valoración gratuita sin compromiso.</Text>
              <HStack spacing={4}><Link href="/valoracion"><Button variant="gold" size="xl" rightIcon={<FiArrowRight />}>Solicitar Valoración</Button></Link></HStack>
            </VStack>
          </AnimatedSection>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
