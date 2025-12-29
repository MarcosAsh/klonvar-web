'use client';

import { Box, Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMaximize, FiDroplet, FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { GlassPill } from '@/components/ui/GlassCard';

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

const propertyTypeLabels: Record<string, string> = {
  APARTMENT: 'Piso',
  HOUSE: 'Casa',
  PENTHOUSE: 'Ático',
  STUDIO: 'Estudio',
  DUPLEX: 'Dúplex',
  LOFT: 'Loft',
  COMMERCIAL: 'Local',
  LAND: 'Terreno',
};

const statusConfig: Record<string, { label: string; colorScheme: 'teal' | 'amber' | 'neutral' }> = {
  AVAILABLE: { label: 'Disponible', colorScheme: 'teal' },
  RESERVED: { label: 'Reservado', colorScheme: 'amber' },
  SOLD: { label: 'Vendido', colorScheme: 'neutral' },
};

export function PropertyCard({ property }: { property: Property }) {
  const imageUrl = property.images[0]?.url || null;
  const status = statusConfig[property.status] || statusConfig.AVAILABLE;

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link href={`/propiedades/${property.id}`} passHref>
      <MotionBox
        as="article"
        position="relative"
        bg="rgba(255, 255, 255, 0.72)"
        backdropFilter="blur(20px) saturate(180%)"
        borderRadius="24px"
        border="1px solid rgba(255, 255, 255, 0.22)"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
        overflow="hidden"
        cursor="pointer"
        h="100%"
        transition="all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _hover={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          transform: 'translateY(-6px)',
        }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Image Container */}
        <Box position="relative" h="220px" overflow="hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={property.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Flex
              w="100%"
              h="100%"
              bg="linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 100%)"
              align="center"
              justify="center"
            >
              <Icon as={FiMapPin} boxSize={12} color="whiteAlpha.200" />
            </Flex>
          )}

          {/* Overlay gradient */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)"
            pointerEvents="none"
          />

          {/* Status & Featured Pills */}
          <HStack position="absolute" top={4} left={4} spacing={2}>
            {property.featured && (
              <GlassPill colorScheme="amber">
                Destacado
              </GlassPill>
            )}
            <GlassPill colorScheme={status.colorScheme}>
              {status.label}
            </GlassPill>
          </HStack>

          {/* Property Type - Bottom Right */}
          <Box
            position="absolute"
            bottom={4}
            right={4}
            px={3}
            py={1.5}
            borderRadius="980px"
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(10px)"
            fontSize="12px"
            fontWeight="600"
            color="brand.charcoal.800"
          >
            {propertyTypeLabels[property.propertyType]}
          </Box>

          {/* Arrow indicator on hover */}
          <MotionBox
            position="absolute"
            top={4}
            right={4}
            w="36px"
            h="36px"
            borderRadius="10px"
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(10px)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={0}
            transition="opacity 0.3s ease"
            sx={{
              '.property-card:hover &': {
                opacity: 1,
              },
            }}
          >
            <Icon as={FiArrowUpRight} boxSize={4} color="brand.charcoal.800" />
          </MotionBox>
        </Box>

        {/* Content */}
        <VStack align="stretch" p={6} spacing={4} className="property-card">
          {/* Price */}
          <Text
            fontFamily="heading"
            fontSize="28px"
            fontWeight="600"
            letterSpacing="-0.02em"
            color="brand.charcoal.900"
          >
            {formattedPrice}
          </Text>

          {/* Title */}
          <Heading
            size="sm"
            fontFamily="body"
            fontWeight="600"
            color="brand.charcoal.800"
            noOfLines={2}
            lineHeight="1.4"
          >
            {property.title}
          </Heading>

          {/* Location */}
          <HStack spacing={2} color="brand.charcoal.500">
            <Icon as={FiMapPin} boxSize={4} color="brand.glass.500" />
            <Text fontSize="14px" noOfLines={1}>
              {property.neighborhood || property.address}
            </Text>
          </HStack>

          {/* Specs Divider */}
          <Box h="1px" bg="rgba(0, 0, 0, 0.04)" />

          {/* Property Specs */}
          <HStack spacing={5} pt={1}>
            <HStack spacing={2}>
              <Box
                w="32px"
                h="32px"
                borderRadius="10px"
                bg="rgba(6, 182, 212, 0.08)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={IoBedOutline} boxSize={4} color="brand.glass.600" />
              </Box>
              <Text fontSize="14px" fontWeight="600" color="brand.charcoal.800">
                {property.bedrooms}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Box
                w="32px"
                h="32px"
                borderRadius="10px"
                bg="rgba(6, 182, 212, 0.08)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiDroplet} boxSize={4} color="brand.glass.600" />
              </Box>
              <Text fontSize="14px" fontWeight="600" color="brand.charcoal.800">
                {property.bathrooms}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Box
                w="32px"
                h="32px"
                borderRadius="10px"
                bg="rgba(6, 182, 212, 0.08)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiMaximize} boxSize={4} color="brand.glass.600" />
              </Box>
              <Text fontSize="14px" fontWeight="600" color="brand.charcoal.800">
                {property.squareMeters} m²
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </MotionBox>
    </Link>
  );
}
