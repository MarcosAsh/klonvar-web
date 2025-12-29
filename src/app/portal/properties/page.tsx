'use client';

export const dynamic = 'force-dynamic';

import { Box, Button, Heading, HStack, Icon, SimpleGrid, Text, VStack, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiPlus, FiHome, FiMoreVertical, FiEdit2, FiTrash2, FiEye, FiImage, FiMapPin } from 'react-icons/fi';
import { useRequireAuth } from '@/lib/auth/client-auth';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

interface Property { id: string; title: string; address: string; neighborhood?: string; price: number; status: string; propertyType: string; bedrooms: number; bathrooms: number; squareMeters: number; images: { id: string; url: string }[]; createdAt: string; updatedAt: string; }

const statusConfig: Record<string, { label: string; colorScheme: 'teal' | 'amber' | 'neutral'; description: string }> = {
  DRAFT: { label: 'Borrador', colorScheme: 'neutral', description: 'Pendiente de completar' },
  PENDING_REVIEW: { label: 'En revisión', colorScheme: 'amber', description: 'En revisión por el equipo' },
  AVAILABLE: { label: 'Publicado', colorScheme: 'teal', description: 'Visible en la web' },
  RESERVED: { label: 'Reservado', colorScheme: 'amber', description: 'Con comprador interesado' },
  SOLD: { label: 'Vendido', colorScheme: 'neutral', description: 'Venta completada' },
  OFF_MARKET: { label: 'Retirado', colorScheme: 'neutral', description: 'No visible' },
};

const propertyTypeLabels: Record<string, string> = { APARTMENT: 'Piso', HOUSE: 'Casa', PENTHOUSE: 'Ático', STUDIO: 'Estudio', DUPLEX: 'Dúplex', LOFT: 'Loft', COMMERCIAL: 'Local', LAND: 'Terreno' };

export default function PortalPropertiesPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/portal/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({ title: 'Error', description: 'No se pudieron cargar las propiedades', status: 'error', duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) return;
    try {
      const response = await fetch(`/api/portal/properties/${propertyId}`, { method: 'DELETE' });
      if (response.ok) {
        setProperties(properties.filter((p) => p.id !== propertyId));
        toast({ title: 'Propiedad eliminada', status: 'success', duration: 3000 });
      } else throw new Error('Failed to delete');
    } catch {
      toast({ title: 'Error', description: 'No se pudo eliminar la propiedad', status: 'error', duration: 5000 });
    }
  };

  if (authLoading || isLoading) return <PortalLayout><Box py={20} textAlign="center"><Text color="brand.charcoal.500">Cargando...</Text></Box></PortalLayout>;

  return (
    <PortalLayout>
      <VStack align="stretch" spacing={8}>
        <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <VStack align="flex-start" spacing={1}>
            <Heading fontFamily="heading" fontSize={{ base: '28px', md: '36px' }} fontWeight="600" color="brand.charcoal.900" letterSpacing="-0.02em">Mis propiedades</Heading>
            <Text color="brand.charcoal.500">Gestiona las propiedades que quieres vender</Text>
          </VStack>
          <Link href="/portal/properties/new"><Button variant="primary" size="lg" leftIcon={<FiPlus />}>Nueva propiedad</Button></Link>
        </HStack>

        {properties.length === 0 ? (
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <GlassCard variant="subtle" p={12} textAlign="center">
              <VStack spacing={6}>
                <Box w={20} h={20} borderRadius="24px" bg="brand.glass.100" display="flex" alignItems="center" justifyContent="center">
                  <Icon as={FiHome} boxSize={10} color="brand.glass.500" />
                </Box>
                <VStack spacing={2}>
                  <Heading size="md" fontFamily="heading">No tienes propiedades aún</Heading>
                  <Text color="brand.charcoal.500" maxW="400px">Añade tu primera propiedad para comenzar el proceso de venta.</Text>
                </VStack>
                <Link href="/portal/properties/new"><Button variant="primary" size="lg" leftIcon={<FiPlus />}>Añadir mi primera propiedad</Button></Link>
              </VStack>
            </GlassCard>
          </MotionBox>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {properties.map((property, index) => {
              const status = statusConfig[property.status] || statusConfig.DRAFT;
              return (
                <MotionBox key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <GlassCard variant="default" p={0} overflow="hidden" h="100%">
                    <Box position="relative" h="180px" bg="brand.charcoal.100">
                      {property.images[0] ? (
                        <Box as="img" src={property.images[0].url} alt={property.title} w="100%" h="100%" objectFit="cover" />
                      ) : (
                        <VStack h="100%" justify="center" spacing={2}>
                          <Icon as={FiImage} boxSize={10} color="brand.charcoal.300" />
                          <Text fontSize="sm" color="brand.charcoal.400">Sin fotos</Text>
                        </VStack>
                      )}
                      <Box position="absolute" top={3} left={3}><GlassPill colorScheme={status.colorScheme}>{status.label}</GlassPill></Box>
                      {property.images.length > 0 && (
                        <HStack position="absolute" bottom={3} right={3} bg="rgba(0, 0, 0, 0.6)" px={2} py={1} borderRadius="full" spacing={1}>
                          <Icon as={FiImage} boxSize={3} color="white" />
                          <Text fontSize="xs" color="white" fontWeight="600">{property.images.length}</Text>
                        </HStack>
                      )}
                    </Box>
                    <VStack align="stretch" p={5} spacing={3}>
                      <HStack justify="space-between" align="flex-start">
                        <VStack align="flex-start" spacing={1} flex={1}>
                          <Text fontFamily="heading" fontSize="22px" fontWeight="600" color="brand.charcoal.900">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}</Text>
                          <Text fontWeight="500" color="brand.charcoal.800" noOfLines={1}>{property.title}</Text>
                        </VStack>
                        <Menu>
                          <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" borderRadius="full" />
                          <MenuList bg="rgba(255, 255, 255, 0.95)" backdropFilter="blur(20px)" borderRadius="12px" boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)">
                            <Link href={`/portal/properties/${property.id}`}><MenuItem icon={<FiEye />}>Ver detalles</MenuItem></Link>
                            <Link href={`/portal/properties/${property.id}/edit`}><MenuItem icon={<FiEdit2 />}>Editar</MenuItem></Link>
                            <Link href={`/portal/properties/${property.id}/photos`}><MenuItem icon={<FiImage />}>Gestionar fotos</MenuItem></Link>
                            <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => handleDelete(property.id)}>Eliminar</MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>
                      <HStack spacing={2} color="brand.charcoal.500">
                        <Icon as={FiMapPin} boxSize={4} />
                        <Text fontSize="sm" noOfLines={1}>{property.neighborhood || property.address}</Text>
                      </HStack>
                      <HStack spacing={4} pt={2} fontSize="sm" color="brand.charcoal.600">
                        <Text>{propertyTypeLabels[property.propertyType]}</Text>
                        <Text>•</Text>
                        <Text>{property.bedrooms} hab</Text>
                        <Text>•</Text>
                        <Text>{property.squareMeters} m²</Text>
                      </HStack>
                      <Box pt={2} borderTop="1px solid rgba(0, 0, 0, 0.04)">
                        <Text fontSize="xs" color="brand.charcoal.400">{status.description}</Text>
                      </Box>
                    </VStack>
                  </GlassCard>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        )}
      </VStack>
    </PortalLayout>
  );
}
