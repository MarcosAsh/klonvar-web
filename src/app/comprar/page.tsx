'use client';

import { Box, Button, Container, Grid, GridItem, Heading, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiSearch, FiHome, FiFileText, FiKey } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';

const MotionBox = motion(Box);
const features = [
  { icon: FiSearch, title: 'Búsqueda personalizada', text: 'Te ayudamos a definir exactamente lo que buscas.' },
  { icon: FiHome, title: 'Selección de viviendas', text: 'Filtramos las opciones que mejor encajan contigo.' },
  { icon: FiFileText, title: 'Asesoramiento', text: 'Te acompañamos en visitas y negociación.' },
  { icon: FiKey, title: 'Hasta las llaves', text: 'Revisión documental y acompañamiento hasta la firma.' },
];

export default function ComprarPage() {
  return (
    <Box>
      <Header />
      <Box bg="brand.navy.900" pt={{ base: 32, md: 40 }} pb={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Text fontSize="sm" fontWeight="600" color="brand.gold.400" letterSpacing="wider" textTransform="uppercase" mb={4}>Compra tu vivienda</Text>
              <Heading as="h1" textStyle="heroTitle" color="white" mb={6}>Encuentra tu vivienda ideal en Madrid</Heading>
              <Text fontSize="xl" color="whiteAlpha.800">Te ayudamos a comprar con seguridad y sin sorpresas.</Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      <Box py={{ base: 16, md: 24 }} bg="brand.cream.50">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center" mb={20}>
            <GridItem order={{ base: 2, lg: 1 }}>
              <Box borderRadius="2xl" overflow="hidden" bg="brand.gold.100" h="400px" display="flex" alignItems="center" justifyContent="center">
                <Icon as={FiKey} boxSize={24} color="brand.gold.300" />
              </Box>
            </GridItem>
            <GridItem order={{ base: 1, lg: 2 }}>
              <Text fontSize="sm" fontWeight="600" color="brand.gold.600" letterSpacing="wider" textTransform="uppercase" mb={4}>¿Qué hacemos por ti?</Text>
              <Heading textStyle="sectionTitle" mb={6}>Comprar una vivienda es una decisión importante</Heading>
              <Text textStyle="subtitle" mb={8}>Te ayudamos a encontrar la que encaja contigo y te acompañamos durante todo el proceso para que compres con tranquilidad.</Text>
              <VStack align="flex-start" spacing={4} mb={8}>
                {['Te ayudamos a definir lo que buscas', 'Seleccionamos viviendas que encajen', 'Asesoramiento en la negociación', 'Revisión de documentación', 'Acompañamiento hasta la firma'].map((item) => (
                  <HStack key={item} spacing={3}><Icon as={FiCheckCircle} color="brand.gold.500" boxSize={5} /><Text fontWeight="500">{item}</Text></HStack>
                ))}
              </VStack>
              <Link href="/propiedades"><Button variant="gold" size="lg" rightIcon={<FiArrowRight />}>Ver Viviendas Disponibles</Button></Link>
            </GridItem>
          </Grid>

          <VStack spacing={4} textAlign="center" mb={12}>
            <Text fontSize="sm" fontWeight="600" color="brand.gold.600" letterSpacing="wider" textTransform="uppercase">Nuestro servicio</Text>
            <Heading textStyle="sectionTitle">Te acompañamos en cada paso</Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((f) => (
              <VStack key={f.title} p={8} bg="white" borderRadius="xl" boxShadow="soft" spacing={4} textAlign="center">
                <Box w={16} h={16} borderRadius="full" bg="brand.gold.100" display="flex" alignItems="center" justifyContent="center">
                  <Icon as={f.icon} boxSize={7} color="brand.gold.600" />
                </Box>
                <Heading size="md" fontFamily="heading">{f.title}</Heading>
                <Text color="brand.navy.600" fontSize="sm">{f.text}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
