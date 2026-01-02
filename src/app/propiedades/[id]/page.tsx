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
  Badge,
  Divider,
  useToast,
  Spinner,
  Center,
  AspectRatio,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiDroplet,
  FiMaximize,
  FiMapPin,
  FiCalendar,
  FiZap,
  FiHome,
  FiPhone,
  FiMail,
  FiCheck,
} from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  neighborhood?: string;
  postalCode?: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  floor?: number;
  hasElevator: boolean;
  hasParking: boolean;
  hasStorage: boolean;
  hasTerrace: boolean;
  hasPool: boolean;
  hasAC: boolean;
  yearBuilt?: number;
  energyRating?: string;
  status: string;
  featured: boolean;
  images: PropertyImage[];
}

const propertyTypeLabels: Record<string, string> = {
  APARTMENT: 'Piso',
  HOUSE: 'Casa',
  PENTHOUSE: 'Ático',
  STUDIO: 'Estudio',
  DUPLEX: 'Dúplex',
  LOFT: 'Loft',
  COMMERCIAL: 'Local Comercial',
  LAND: 'Terreno',
};

const amenities = [
  { key: 'hasElevator', label: 'Ascensor', icon: FiHome },
  { key: 'hasParking', label: 'Parking', icon: FiHome },
  { key: 'hasStorage', label: 'Trastero', icon: FiHome },
  { key: 'hasTerrace', label: 'Terraza', icon: FiHome },
  { key: 'hasPool', label: 'Piscina', icon: FiHome },
  { key: 'hasAC', label: 'Aire Acondicionado', icon: FiZap },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const toast = useToast();

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  async function fetchProperty() {
    try {
      const res = await fetch(`/api/properties/${params.id}`);
      if (!res.ok) throw new Error('Property not found');
      const data = await res.json();
      setProperty(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cargar la propiedad',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Box bg="#fafafa" minH="100vh">
        <Header />
        <Center py={40}>
          <VStack spacing={4}>
            <Spinner size="xl" color="brand.glass.500" thickness="3px" />
            <Text color="brand.charcoal.500">Cargando propiedad...</Text>
          </VStack>
        </Center>
        <Footer />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box bg="#fafafa" minH="100vh">
        <Header />
        <Container maxW="container.xl" py={40}>
          <VStack spacing={6} textAlign="center">
            <Icon as={FiHome} boxSize={16} color="brand.charcoal.300" />
            <Heading size="lg">Propiedad no encontrada</Heading>
            <Text color="brand.charcoal.500">
              La propiedad que buscas no existe o ya no está disponible.
            </Text>
            <Link href="/propiedades">
              <Button variant="primary" leftIcon={<FiArrowLeft />}>
                Ver todas las propiedades
              </Button>
            </Link>
          </VStack>
        </Container>
        <Footer />
      </Box>
    );
  }

  const activeAmenities = amenities.filter(
    (a) => property[a.key as keyof Property]
  );

  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      {/* Back Button */}
      <Container maxW="container.xl" pt={28} pb={4}>
        <Link href="/propiedades">
          <Button variant="ghost" leftIcon={<FiArrowLeft />} size="sm">
            Volver a propiedades
          </Button>
        </Link>
      </Container>

      {/* Main Content */}
      <Container maxW="container.xl" pb={20}>
        <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={8}>
          {/* Left Column - Images */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <GlassCard variant="default" p={0} overflow="hidden" mb={4}>
                <AspectRatio ratio={16 / 10}>
                  {property.images[selectedImage] ? (
                    <Image
                      src={property.images[selectedImage].url}
                      alt={property.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  ) : (
                    <Box bg="brand.charcoal.100" display="flex" alignItems="center" justifyContent="center">
                      <Icon as={FiHome} boxSize={20} color="brand.charcoal.300" />
                    </Box>
                  )}
                </AspectRatio>
              </GlassCard>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <SimpleGrid columns={{ base: 4, md: 6 }} spacing={2}>
                  {property.images.map((image, index) => (
                    <Box
                      key={image.id}
                      cursor="pointer"
                      borderRadius="12px"
                      overflow="hidden"
                      border={selectedImage === index ? '2px solid' : '2px solid transparent'}
                      borderColor={selectedImage === index ? 'brand.glass.500' : 'transparent'}
                      transition="all 0.2s"
                      onClick={() => setSelectedImage(index)}
                      _hover={{ opacity: 0.8 }}
                    >
                      <AspectRatio ratio={1}>
                        <Image
                          src={image.url}
                          alt={`${property.title} - ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </AspectRatio>
                    </Box>
                  ))}
                </SimpleGrid>
              )}

              {/* Description */}
              <GlassCard variant="subtle" p={8} mt={6}>
                <Heading size="md" fontFamily="heading" mb={4}>
                  Descripción
                </Heading>
                <Text color="brand.charcoal.600" lineHeight="1.8" whiteSpace="pre-line">
                  {property.description}
                </Text>
              </GlassCard>

              {/* Amenities */}
              {activeAmenities.length > 0 && (
                <GlassCard variant="subtle" p={8} mt={6}>
                  <Heading size="md" fontFamily="heading" mb={4}>
                    Características
                  </Heading>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                    {activeAmenities.map((amenity) => (
                      <HStack key={amenity.key} spacing={3}>
                        <Box
                          w={10}
                          h={10}
                          borderRadius="12px"
                          bg="brand.glass.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiCheck} color="brand.glass.600" />
                        </Box>
                        <Text fontWeight="500">{amenity.label}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </GlassCard>
              )}
            </MotionBox>
          </GridItem>

          {/* Right Column - Details */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              position="sticky"
              top="100px"
            >
              <GlassCard variant="elevated" p={8}>
                {/* Status & Type */}
                <HStack spacing={2} mb={4}>
                  <GlassPill colorScheme="teal">
                    {property.status === 'AVAILABLE' ? 'Disponible' : 'Reservado'}
                  </GlassPill>
                  <GlassPill colorScheme="neutral">
                    {propertyTypeLabels[property.propertyType]}
                  </GlassPill>
                  {property.featured && (
                    <GlassPill colorScheme="amber">Destacado</GlassPill>
                  )}
                </HStack>

                {/* Price */}
                <Text
                  fontFamily="heading"
                  fontSize="40px"
                  fontWeight="600"
                  letterSpacing="-0.02em"
                  color="brand.charcoal.900"
                  mb={2}
                >
                  {formatPrice(property.price)}
                </Text>

                {/* Title */}
                <Heading size="lg" fontFamily="heading" mb={4}>
                  {property.title}
                </Heading>

                {/* Location */}
                <HStack spacing={2} color="brand.charcoal.500" mb={6}>
                  <Icon as={FiMapPin} color="brand.glass.500" />
                  <Text>
                    {property.address}, {property.neighborhood || property.city}
                    {property.postalCode && ` - ${property.postalCode}`}
                  </Text>
                </HStack>

                <Divider mb={6} />

                {/* Quick Stats */}
                <SimpleGrid columns={3} spacing={4} mb={6}>
                  <VStack
                    p={4}
                    bg="rgba(6, 182, 212, 0.06)"
                    borderRadius="16px"
                    spacing={1}
                  >
                    <Icon as={IoBedOutline} boxSize={6} color="brand.glass.600" />
                    <Text fontWeight="700" fontSize="xl">
                      {property.bedrooms}
                    </Text>
                    <Text fontSize="xs" color="brand.charcoal.500">
                      Habitaciones
                    </Text>
                  </VStack>
                  <VStack
                    p={4}
                    bg="rgba(6, 182, 212, 0.06)"
                    borderRadius="16px"
                    spacing={1}
                  >
                    <Icon as={FiDroplet} boxSize={6} color="brand.glass.600" />
                    <Text fontWeight="700" fontSize="xl">
                      {property.bathrooms}
                    </Text>
                    <Text fontSize="xs" color="brand.charcoal.500">
                      Baños
                    </Text>
                  </VStack>
                  <VStack
                    p={4}
                    bg="rgba(6, 182, 212, 0.06)"
                    borderRadius="16px"
                    spacing={1}
                  >
                    <Icon as={FiMaximize} boxSize={6} color="brand.glass.600" />
                    <Text fontWeight="700" fontSize="xl">
                      {property.squareMeters}
                    </Text>
                    <Text fontSize="xs" color="brand.charcoal.500">
                      m²
                    </Text>
                  </VStack>
                </SimpleGrid>

                {/* Additional Info */}
                <VStack align="stretch" spacing={3} mb={6}>
                  {property.floor !== null && property.floor !== undefined && (
                    <HStack justify="space-between">
                      <Text color="brand.charcoal.500">Planta</Text>
                      <Text fontWeight="600">{property.floor}ª</Text>
                    </HStack>
                  )}
                  {property.yearBuilt && (
                    <HStack justify="space-between">
                      <Text color="brand.charcoal.500">Año construcción</Text>
                      <Text fontWeight="600">{property.yearBuilt}</Text>
                    </HStack>
                  )}
                  {property.energyRating && (
                    <HStack justify="space-between">
                      <Text color="brand.charcoal.500">Certificado energético</Text>
                      <Badge colorScheme="green" fontSize="sm">
                        {property.energyRating}
                      </Badge>
                    </HStack>
                  )}
                </VStack>

                <Divider mb={6} />

                {/* Contact CTAs */}
                <VStack spacing={3}>
                  <Button
                    as="a"
                    href="https://wa.me/34653945930"
                    target="_blank"
                    variant="primary"
                    size="lg"
                    width="100%"
                    leftIcon={<FaWhatsapp />}
                  >
                    Contactar por WhatsApp
                  </Button>
                  <Button
                    as="a"
                    href="tel:+34653945930"
                    variant="secondary"
                    size="lg"
                    width="100%"
                    leftIcon={<FiPhone />}
                  >
                    Llamar ahora
                  </Button>
                  <Link href={`/contacto?property=${property.id}`} style={{ width: '100%' }}>
                    <Button
                      variant="glass"
                      size="lg"
                      width="100%"
                      leftIcon={<FiMail />}
                    >
                      Enviar mensaje
                    </Button>
                  </Link>
                </VStack>
              </GlassCard>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
