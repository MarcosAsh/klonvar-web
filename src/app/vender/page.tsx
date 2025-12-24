'use client';

import { Box, Button, Container, Grid, GridItem, Heading, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiCamera, FiUsers, FiFileText, FiTrendingUp, FiHome, FiKey } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';

const MotionBox = motion(Box);
const steps = [
  { icon: FiTrendingUp, title: 'Valoración profesional', text: 'Analizamos el mercado real de tu zona para fijar un precio competitivo.' },
  { icon: FiHome, title: 'Preparación', text: 'Te asesoramos para presentar tu vivienda de la mejor manera.' },
  { icon: FiCamera, title: 'Marketing', text: 'Fotos profesionales, anuncios destacados y difusión en los mejores portales.' },
  { icon: FiUsers, title: 'Gestión de visitas', text: 'Filtramos compradores y organizamos las visitas.' },
  { icon: FiFileText, title: 'Negociación', text: 'Defendemos tus intereses para conseguir las mejores condiciones.' },
  { icon: FiKey, title: 'Firma', text: 'Te acompañamos hasta la notaría y más allá.' },
];

export default function VenderPage() {
  return (
    <Box>
      <Header />
      <Box bg="brand.navy.900" pt={{ base: 32, md: 40 }} pb={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Text fontSize="sm" fontWeight="600" color="brand.teal.400" letterSpacing="wider" textTransform="uppercase" mb={4}>Vende tu vivienda</Text>
              <Heading as="h1" textStyle="heroTitle" color="white" mb={6}>Vende tu vivienda en Madrid con tranquilidad</Heading>
              <Text fontSize="xl" color="whiteAlpha.800">Nos encargamos de todo para que tú no te preocupes.</Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      <Box py={{ base: 16, md: 24 }} bg="brand.cream.50">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center" mb={20}>
            <GridItem>
              <Text fontSize="sm" fontWeight="600" color="brand.teal.600" letterSpacing="wider" textTransform="uppercase" mb={4}>¿Por qué con nosotros?</Text>
              <Heading textStyle="sectionTitle" mb={6}>Vender bien no es solo poner un anuncio</Heading>
              <Text textStyle="subtitle" mb={8}>Es saber cuánto vale realmente tu vivienda, cómo presentarla y a quién vendérsela. Te ayudamos a vender de forma segura, sin estrés y al mejor precio.</Text>
              <VStack align="flex-start" spacing={4} mb={8}>
                {['Valoración profesional y realista', 'Marketing inmobiliario de calidad', 'Filtrado de compradores solventes', 'Acompañamiento hasta la firma'].map((item) => (
                  <HStack key={item} spacing={3}><Icon as={FiCheckCircle} color="brand.teal.500" boxSize={5} /><Text fontWeight="500">{item}</Text></HStack>
                ))}
              </VStack>
              <Link href="/valoracion"><Button variant="primary" size="lg" rightIcon={<FiArrowRight />}>Solicitar Valoración Gratuita</Button></Link>
            </GridItem>
            <GridItem>
              <Box borderRadius="2xl" overflow="hidden" bg="brand.teal.100" h="400px" display="flex" alignItems="center" justifyContent="center">
                <Icon as={FiTrendingUp} boxSize={24} color="brand.teal.300" />
              </Box>
            </GridItem>
          </Grid>

          <VStack spacing={4} textAlign="center" mb={12}>
            <Text fontSize="sm" fontWeight="600" color="brand.teal.600" letterSpacing="wider" textTransform="uppercase">Nuestro proceso</Text>
            <Heading textStyle="sectionTitle">Cómo trabajamos</Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {steps.map((s, i) => (
              <Box key={s.title} p={8} bg="white" borderRadius="xl" boxShadow="soft">
                <HStack spacing={4} mb={4}>
                  <Box w={12} h={12} borderRadius="xl" bg="brand.navy.900" display="flex" alignItems="center" justifyContent="center">
                    <Icon as={s.icon} boxSize={5} color="white" />
                  </Box>
                  <Text fontFamily="heading" fontSize="3xl" fontWeight="700" color="brand.cream.300">{String(i + 1).padStart(2, '0')}</Text>
                </HStack>
                <Heading size="md" fontFamily="heading" mb={3}>{s.title}</Heading>
                <Text color="brand.navy.600" fontSize="sm">{s.text}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
