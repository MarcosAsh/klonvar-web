'use client';

import { Box, Flex, Heading, HStack, Icon, Image, Tag, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FiBed, FiMaximize, FiDroplet, FiMapPin } from 'react-icons/fi';

interface PropertyImage { id: string; url: string; }
interface Property {
  id: string; title: string; price: number; address: string; neighborhood?: string;
  propertyType: string; bedrooms: number; bathrooms: number; squareMeters: number;
  featured: boolean; status: string; images: PropertyImage[];
}

const propertyTypeLabels: Record<string, string> = { APARTMENT: 'Piso', HOUSE: 'Casa', PENTHOUSE: 'Ático', STUDIO: 'Estudio', DUPLEX: 'Dúplex', LOFT: 'Loft', COMMERCIAL: 'Local', LAND: 'Terreno' };
const statusLabels: Record<string, { label: string; color: string }> = { AVAILABLE: { label: 'Disponible', color: 'green' }, RESERVED: { label: 'Reservado', color: 'orange' }, SOLD: { label: 'Vendido', color: 'red' } };

export function PropertyCard({ property }: { property: Property }) {
  const imageUrl = property.images[0]?.url || '/placeholder-property.jpg';
  const status = statusLabels[property.status] || statusLabels.AVAILABLE;

  return (
    <Link href={`/propiedades/${property.id}`} passHref>
      <Box as="article" bg="white" borderRadius="2xl" overflow="hidden" boxShadow="elegant" transition="all 0.4s ease" cursor="pointer" _hover={{ boxShadow: 'elegantHover', transform: 'translateY(-8px)' }} h="100%">
        <Box position="relative" h="220px" overflow="hidden">
          <Image src={imageUrl} alt={property.title} w="100%" h="100%" objectFit="cover" transition="transform 0.4s ease" fallback={<Flex w="100%" h="100%" bg="brand.cream.200" align="center" justify="center"><Icon as={FiMapPin} boxSize={12} color="brand.navy.300" /></Flex>} />
          <HStack position="absolute" top={4} left={4} spacing={2}>
            {property.featured && <Tag bg="brand.gold.500" color="brand.navy.900" fontWeight="600" size="sm">Destacado</Tag>}
            <Tag bg={`${status.color}.500`} color="white" size="sm">{status.label}</Tag>
          </HStack>
          <Tag position="absolute" bottom={4} right={4} bg="rgba(26, 54, 93, 0.9)" color="white" size="sm">{propertyTypeLabels[property.propertyType]}</Tag>
        </Box>
        <VStack align="stretch" p={5} spacing={3}>
          <Text fontFamily="heading" fontSize="2xl" fontWeight="700" color="brand.navy.900">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}</Text>
          <Heading size="sm" fontFamily="body" fontWeight="600" color="brand.navy.800" noOfLines={2}>{property.title}</Heading>
          <HStack spacing={1} color="brand.navy.500"><Icon as={FiMapPin} boxSize={4} /><Text fontSize="sm" noOfLines={1}>{property.neighborhood || property.address}</Text></HStack>
          <HStack spacing={4} pt={2} borderTop="1px solid" borderColor="brand.cream.200">
            <HStack spacing={1}><Icon as={FiBed} boxSize={4} color="brand.teal.500" /><Text fontSize="sm" fontWeight="500">{property.bedrooms}</Text></HStack>
            <HStack spacing={1}><Icon as={FiDroplet} boxSize={4} color="brand.teal.500" /><Text fontSize="sm" fontWeight="500">{property.bathrooms}</Text></HStack>
            <HStack spacing={1}><Icon as={FiMaximize} boxSize={4} color="brand.teal.500" /><Text fontSize="sm" fontWeight="500">{property.squareMeters} m²</Text></HStack>
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
}
