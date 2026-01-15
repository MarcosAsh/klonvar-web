'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiFilter, FiHome, FiGrid, FiList } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { PropertyCard } from '@/components/property';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

interface PropertyImage {
  id: string;
  url: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  neighborhood?: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  featured: boolean;
  status: string;
  images: PropertyImage[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function PropiedadesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    bedrooms: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '12' });
      if (filters.type) params.append('type', filters.type);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await fetch(`/api/properties?${params}`);
      const data = await response.json();
      setProperties(data.properties || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchProperties(1);
  };

  return (
    <Box bg="rgba(250, 250, 250, 0.85)" minH="100vh">
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
            right: '-15%',
            width: '60%',
            height: '80%',
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: 36, md: 40 }} pb={{ base: 16, md: 20 }}>
          <VStack spacing={6} textAlign="center" maxW="600px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassPill colorScheme="teal">
                <HStack spacing={2}>
                  <Icon as={FiHome} boxSize={3} />
                  <Text>Propiedades</Text>
                </HStack>
              </GlassPill>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading textStyle="heroTitle" color="white" mb={4}>
                Encuentra tu próximo hogar
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.700">
                Explora nuestra selección de propiedades en Madrid
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Filters Section */}
      <Box py={8} position="relative" zIndex={2} mt={-12}>
        <Container maxW="container.xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard variant="elevated" p={6}>
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(4, 1fr) auto' }}
                gap={4}
                alignItems="end"
              >
                <Box>
                  <Text fontSize="12px" fontWeight="600" color="brand.charcoal.600" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                    Tipo
                  </Text>
                  <Select
                    placeholder="Todos"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    bg="white"
                    borderColor="rgba(0, 0, 0, 0.08)"
                    borderRadius="12px"
                    _focus={{ borderColor: 'brand.glass.500', boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)' }}
                  >
                    <option value="APARTMENT">Piso</option>
                    <option value="HOUSE">Casa</option>
                    <option value="PENTHOUSE">Ático</option>
                    <option value="STUDIO">Estudio</option>
                    <option value="DUPLEX">Dúplex</option>
                  </Select>
                </Box>

                <Box>
                  <Text fontSize="12px" fontWeight="600" color="brand.charcoal.600" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                    Habitaciones
                  </Text>
                  <Select
                    placeholder="Cualquiera"
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    bg="white"
                    borderColor="rgba(0, 0, 0, 0.08)"
                    borderRadius="12px"
                    _focus={{ borderColor: 'brand.glass.500', boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)' }}
                  >
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </Select>
                </Box>

                <Box>
                  <Text fontSize="12px" fontWeight="600" color="brand.charcoal.600" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                    Precio mínimo
                  </Text>
                  <Select
                    placeholder="Sin mínimo"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    bg="white"
                    borderColor="rgba(0, 0, 0, 0.08)"
                    borderRadius="12px"
                    _focus={{ borderColor: 'brand.glass.500', boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)' }}
                  >
                    <option value="100000">100.000 €</option>
                    <option value="200000">200.000 €</option>
                    <option value="300000">300.000 €</option>
                    <option value="500000">500.000 €</option>
                  </Select>
                </Box>

                <Box>
                  <Text fontSize="12px" fontWeight="600" color="brand.charcoal.600" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                    Precio máximo
                  </Text>
                  <Select
                    placeholder="Sin máximo"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    bg="white"
                    borderColor="rgba(0, 0, 0, 0.08)"
                    borderRadius="12px"
                    _focus={{ borderColor: 'brand.glass.500', boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.12)' }}
                  >
                    <option value="200000">200.000 €</option>
                    <option value="300000">300.000 €</option>
                    <option value="500000">500.000 €</option>
                    <option value="1000000">1.000.000 €</option>
                  </Select>
                </Box>

                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<FiFilter />}
                  onClick={applyFilters}
                  h="48px"
                >
                  Filtrar
                </Button>
              </Grid>
            </GlassCard>
          </MotionBox>
        </Container>
      </Box>

      {/* Properties Grid */}
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          {loading ? (
            <Center py={20}>
              <VStack spacing={4}>
                <Spinner size="xl" color="brand.glass.500" thickness="3px" />
                <Text color="brand.charcoal.500">Cargando propiedades...</Text>
              </VStack>
            </Center>
          ) : properties.length === 0 ? (
            <Center py={20}>
              <GlassCard variant="subtle" p={12} textAlign="center" maxW="400px">
                <Icon as={FiHome} boxSize={12} color="brand.charcoal.300" mb={4} />
                <Heading size="md" fontFamily="heading" mb={3}>
                  No hay propiedades
                </Heading>
                <Text color="brand.charcoal.600">
                  No encontramos propiedades con los filtros seleccionados. Prueba a cambiar los criterios de búsqueda.
                </Text>
              </GlassCard>
            </Center>
          ) : (
            <>
              {/* Results header */}
              <HStack justify="space-between" mb={8}>
                <Text color="brand.charcoal.600">
                  {pagination?.total || 0} propiedades encontradas
                </Text>
                <HStack spacing={2}>
                  <Button
                    variant="ghost"
                    size="sm"
                    borderRadius="10px"
                    bg="rgba(0, 0, 0, 0.04)"
                  >
                    <Icon as={FiGrid} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    borderRadius="10px"
                  >
                    <Icon as={FiList} />
                  </Button>
                </HStack>
              </HStack>

              {/* Properties grid */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {properties.map((property, index) => (
                  <MotionBox
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </MotionBox>
                ))}
              </SimpleGrid>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <HStack justify="center" spacing={2} pt={12}>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === pagination.page ? 'primary' : 'glass'}
                      size="sm"
                      w="40px"
                      h="40px"
                      borderRadius="12px"
                      onClick={() => fetchProperties(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </HStack>
              )}
            </>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
