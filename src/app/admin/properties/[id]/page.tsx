'use client';

import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  SimpleGrid,
  Icon,
  Divider,
  useToast,
  Spinner,
  Center,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiDroplet,
  FiMaximize,
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';

const statusColors: Record<string, string> = {
  DRAFT: 'gray',
  PENDING_REVIEW: 'yellow',
  AVAILABLE: 'green',
  RESERVED: 'orange',
  SOLD: 'blue',
  OFF_MARKET: 'red',
};

const statusLabels: Record<string, string> = {
  DRAFT: 'Borrador',
  PENDING_REVIEW: 'En Revisión',
  AVAILABLE: 'Disponible',
  RESERVED: 'Reservado',
  SOLD: 'Vendido',
  OFF_MARKET: 'Fuera de Mercado',
};

const propertyTypeLabels: Record<string, string> = {
  APARTMENT: 'Apartamento',
  HOUSE: 'Casa',
  PENTHOUSE: 'Ático',
  STUDIO: 'Estudio',
  DUPLEX: 'Dúplex',
  LOFT: 'Loft',
  COMMERCIAL: 'Local Comercial',
  LAND: 'Terreno',
};

export default function AdminPropertyViewPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  async function fetchProperty() {
    try {
      const res = await fetch(`/api/admin/properties/${params.id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setProperty(data.property);
    } catch (error) {
      toast({ title: 'Error al cargar propiedad', status: 'error', duration: 3000 });
      router.push('/admin/properties');
    } finally {
      setLoading(false);
    }
  }

  async function deleteProperty() {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) return;
    try {
      const res = await fetch(`/api/admin/properties/${params.id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Propiedad eliminada', status: 'success', duration: 3000 });
        router.push('/admin/properties');
      }
    } catch (error) {
      toast({ title: 'Error al eliminar', status: 'error', duration: 3000 });
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  if (loading) {
    return (
      <Center h="400px">
        <Spinner size="xl" color="cyan.500" />
      </Center>
    );
  }

  if (!property) {
    return (
      <Center h="400px">
        <Text>Propiedad no encontrada</Text>
      </Center>
    );
  }

  const amenities = [
    { key: 'hasElevator', label: 'Ascensor' },
    { key: 'hasParking', label: 'Parking' },
    { key: 'hasStorage', label: 'Trastero' },
    { key: 'hasTerrace', label: 'Terraza' },
    { key: 'hasPool', label: 'Piscina' },
    { key: 'hasAC', label: 'Aire Acondicionado' },
  ];

  return (
    <VStack align="stretch" spacing={6}>
      {/* Header */}
      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <HStack spacing={4}>
          <Link href="/admin/properties">
            <Button variant="ghost" leftIcon={<FiArrowLeft />}>Volver</Button>
          </Link>
          <Heading size="lg">{property.title}</Heading>
          <Badge colorScheme={statusColors[property.status]} fontSize="sm">
            {statusLabels[property.status]}
          </Badge>
          {property.featured && <Badge colorScheme="purple">Destacada</Badge>}
        </HStack>
        <HStack spacing={3}>
          <Link href={`/admin/properties/${property.id}/edit`}>
            <Button leftIcon={<FiEdit />} colorScheme="cyan">Editar</Button>
          </Link>
          <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="outline" onClick={deleteProperty}>
            Eliminar
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Main Content */}
        <GridItem>
          {/* Images */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100" mb={6}>
            <Heading size="md" mb={4}>Imágenes</Heading>
            {property.images?.length > 0 ? (
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                {property.images.map((img: any) => (
                  <Image key={img.id} src={img.url} alt="" borderRadius="lg" objectFit="cover" h="150px" w="100%" />
                ))}
              </SimpleGrid>
            ) : (
              <Text color="gray.500">No hay imágenes</Text>
            )}
          </Box>

          {/* Description */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100" mb={6}>
            <Heading size="md" mb={4}>Descripción</Heading>
            <Text color="gray.600" whiteSpace="pre-line">{property.description}</Text>
          </Box>

          {/* Amenities */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Características</Heading>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
              {amenities.map(({ key, label }) => (
                <HStack key={key} spacing={2}>
                  <Icon as={property[key] ? FiCheck : FiX} color={property[key] ? 'green.500' : 'gray.300'} />
                  <Text color={property[key] ? 'gray.700' : 'gray.400'}>{label}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </Box>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          {/* Price & Stats */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100" mb={6}>
            <Text fontFamily="heading" fontSize="32px" fontWeight="700" color="cyan.600" mb={4}>
              {formatPrice(Number(property.price))}
            </Text>
            <SimpleGrid columns={3} spacing={4} mb={6}>
              <VStack p={3} bg="gray.50" borderRadius="lg">
                <Icon as={IoBedOutline} boxSize={5} color="gray.500" />
                <Text fontWeight="600">{property.bedrooms}</Text>
                <Text fontSize="xs" color="gray.500">Hab.</Text>
              </VStack>
              <VStack p={3} bg="gray.50" borderRadius="lg">
                <Icon as={FiDroplet} boxSize={5} color="gray.500" />
                <Text fontWeight="600">{property.bathrooms}</Text>
                <Text fontSize="xs" color="gray.500">Baños</Text>
              </VStack>
              <VStack p={3} bg="gray.50" borderRadius="lg">
                <Icon as={FiMaximize} boxSize={5} color="gray.500" />
                <Text fontWeight="600">{property.squareMeters}</Text>
                <Text fontSize="xs" color="gray.500">m²</Text>
              </VStack>
            </SimpleGrid>
            <Divider mb={4} />
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text color="gray.500">Tipo</Text>
                <Text fontWeight="500">{propertyTypeLabels[property.propertyType]}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.500">Planta</Text>
                <Text fontWeight="500">{property.floor ?? '-'}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.500">Año</Text>
                <Text fontWeight="500">{property.yearBuilt ?? '-'}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.500">Energía</Text>
                <Text fontWeight="500">{property.energyRating ?? '-'}</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Location */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100" mb={6}>
            <Heading size="md" mb={4}>Ubicación</Heading>
            <VStack align="stretch" spacing={2}>
              <HStack>
                <Icon as={FiMapPin} color="gray.400" />
                <Text>{property.address}</Text>
              </HStack>
              <Text color="gray.500">{property.neighborhood}, {property.city}</Text>
              {property.postalCode && <Text color="gray.500">CP: {property.postalCode}</Text>}
            </VStack>
          </Box>

          {/* Activity */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Actividad Reciente</Heading>
            {property.activities?.length > 0 ? (
              <VStack align="stretch" spacing={3}>
                {property.activities.slice(0, 5).map((activity: any) => (
                  <HStack key={activity.id} fontSize="sm">
                    <Box w={2} h={2} borderRadius="full" bg="cyan.400" />
                    <Text color="gray.600">{activity.description}</Text>
                    <Text color="gray.400" fontSize="xs">
                      {new Date(activity.createdAt).toLocaleDateString('es-ES')}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Text color="gray.500" fontSize="sm">Sin actividad reciente</Text>
            )}
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  );
}
