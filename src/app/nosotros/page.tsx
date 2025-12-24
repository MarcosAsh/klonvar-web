'use client';

import { Box, Container, Grid, GridItem, Heading, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiHeart, FiAward } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';

const MotionBox = motion(Box);
const values = [
  { icon: FiHeart, title: 'Cercanía', text: 'Tratamos cada caso de forma personal, escuchando tus necesidades.' },
  { icon: FiTarget, title: 'Transparencia', text: 'Sin letra pequeña ni sorpresas. Comunicación clara siempre.' },
  { icon: FiAward, title: 'Profesionalidad', text: 'Años de experiencia en el mercado inmobiliario de Madrid.' },
  { icon: FiUsers, title: 'Compromiso', text: 'Tu satisfacción es nuestro objetivo principal.' },
];

export default function NosotrosPage() {
  return (
    <Box>
      <Header />
      <Box bg="brand.navy.900" pt={{ base: 32, md: 40 }} pb={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Text fontSize="sm" fontWeight="600" color="brand.teal.400" letterSpacing="wider" textTransform="uppercase" mb={4}>Sobre Nosotros</Text>
              <Heading as="h1" textStyle="heroTitle" color="white" mb={6}>Una agencia con valores claros</Heading>
              <Text fontSize="xl" color="whiteAlpha.800">Somos una agencia inmobiliaria en Madrid comprometida con hacer las cosas bien.</Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      <Box py={{ base: 16, md: 24 }} bg="brand.cream.50">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center" mb={20}>
            <GridItem>
              <Box borderRadius="2xl" overflow="hidden" bg="brand.navy.100" h="400px" display="flex" alignItems="center" justifyContent="center">
                <Icon as={FiUsers} boxSize={24} color="brand.navy.300" />
              </Box>
            </GridItem>
            <GridItem>
              <Text fontSize="sm" fontWeight="600" color="brand.teal.600" letterSpacing="wider" textTransform="uppercase" mb={4}>Nuestra historia</Text>
              <Heading textStyle="sectionTitle" mb={6}>Nacimos con un objetivo claro</Heading>
              <Text textStyle="subtitle" mb={6}>Hacer las cosas bien y de forma transparente. Creemos que vender o comprar una vivienda no debe ser estresante ni confuso.</Text>
              <Text color="brand.navy.600" lineHeight="tall">Por eso apostamos por una comunicación clara, precios realistas y un acompañamiento cercano. Trabajamos por y para las personas, cuidando cada detalle del proceso.</Text>
            </GridItem>
          </Grid>

          <VStack spacing={4} textAlign="center" mb={12}>
            <Text fontSize="sm" fontWeight="600" color="brand.teal.600" letterSpacing="wider" textTransform="uppercase">Nuestros valores</Text>
            <Heading textStyle="sectionTitle">Lo que nos define</Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {values.map((v) => (
              <VStack key={v.title} p={8} bg="white" borderRadius="xl" boxShadow="soft" spacing={4} textAlign="center">
                <Box w={16} h={16} borderRadius="full" bg="brand.teal.100" display="flex" alignItems="center" justifyContent="center">
                  <Icon as={v.icon} boxSize={7} color="brand.teal.600" />
                </Box>
                <Heading size="md" fontFamily="heading">{v.title}</Heading>
                <Text color="brand.navy.600" fontSize="sm">{v.text}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
