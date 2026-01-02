'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHome, FiSearch, FiArrowLeft, FiMapPin } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';
import { GlassCard } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

export default function NotFound() {
  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      <Box position="relative" overflow="hidden" minH="80vh" display="flex" alignItems="center">
        {/* Background gradient orbs */}
        <MotionBox
          position="absolute"
          top="-20%"
          right="-10%"
          width="50vw"
          height="50vw"
          maxW="600px"
          maxH="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)"
          filter="blur(60px)"
          pointerEvents="none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <MotionBox
          position="absolute"
          bottom="-30%"
          left="-10%"
          width="40vw"
          height="40vw"
          maxW="500px"
          maxH="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)"
          filter="blur(50px)"
          pointerEvents="none"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <Container maxW="container.md" position="relative" zIndex={1}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard variant="elevated" p={{ base: 10, md: 16 }} textAlign="center">
              <VStack spacing={8}>
                {/* 404 Number */}
                <Box position="relative">
                  <Text
                    fontFamily="heading"
                    fontSize={{ base: '120px', md: '180px' }}
                    fontWeight="600"
                    lineHeight="1"
                    bgGradient="linear(135deg, brand.glass.400, brand.glass.600)"
                    bgClip="text"
                    letterSpacing="-0.04em"
                  >
                    404
                  </Text>
                  <MotionBox
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Box
                      w={20}
                      h={20}
                      borderRadius="full"
                      bg="rgba(6, 182, 212, 0.1)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiMapPin} boxSize={10} color="brand.glass.500" />
                    </Box>
                  </MotionBox>
                </Box>

                {/* Message */}
                <VStack spacing={3}>
                  <Heading
                    fontFamily="heading"
                    fontSize={{ base: '24px', md: '32px' }}
                    fontWeight="600"
                    color="brand.charcoal.900"
                    letterSpacing="-0.02em"
                  >
                    Página no encontrada
                  </Heading>
                  <Text
                    color="brand.charcoal.500"
                    fontSize={{ base: '16px', md: '18px' }}
                    maxW="400px"
                    lineHeight="1.6"
                  >
                    Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
                  </Text>
                </VStack>

                {/* Action Buttons */}
                <HStack spacing={4} pt={4} flexWrap="wrap" justify="center">
                  <Link href="/">
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<FiHome />}
                    >
                      Volver al inicio
                    </Button>
                  </Link>
                  <Link href="/propiedades">
                    <Button
                      variant="secondary"
                      size="lg"
                      leftIcon={<FiSearch />}
                    >
                      Ver propiedades
                    </Button>
                  </Link>
                </HStack>

                {/* Additional Help */}
                <Box pt={4}>
                  <Text color="brand.charcoal.400" fontSize="14px">
                    ¿Necesitas ayuda?{' '}
                    <Link href="/contacto">
                      <Text
                        as="span"
                        color="brand.glass.600"
                        fontWeight="500"
                        _hover={{ textDecoration: 'underline' }}
                        cursor="pointer"
                      >
                        Contáctanos
                      </Text>
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </GlassCard>
          </MotionBox>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
