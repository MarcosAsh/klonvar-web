'use client';

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiArrowUpRight,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const footerLinks = {
  servicios: [
    { label: 'Vender tu vivienda', href: '/vender' },
    { label: 'Comprar vivienda', href: '/comprar' },
    { label: 'Valoración gratuita', href: '/valoracion' },
    { label: 'Ver propiedades', href: '/propiedades' },
  ],
  empresa: [
    { label: 'Sobre nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { label: 'Aviso legal', href: '/legal/aviso-legal' },
    { label: 'Privacidad', href: '/legal/privacidad' },
    { label: 'Cookies', href: '/legal/cookies' },
  ],
};

const contactInfo = {
  phone: '+34 XXX XXX XXX',
  email: 'info@klonvar.com',
  address: 'Avda. García Tapia 171\nLocal 3, 28030 Madrid',
  whatsapp: '+34XXXXXXXXX',
};

const socialLinks = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <Box as="footer" position="relative" overflow="hidden">
      {/* Gradient Background */}
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
          top: '-50%',
          left: '-20%',
          width: '60%',
          height: '100%',
          background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '50%',
          height: '80%',
          background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        {/* Main Footer Content */}
        <Box pt={{ base: 16, md: 24 }} pb={12}>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: '1.5fr 1fr 1fr 1.2fr' }}
            gap={{ base: 12, lg: 16 }}
          >
            {/* Brand Column */}
            <GridItem>
              <VStack align="flex-start" spacing={6}>
                {/* Logo */}
                <HStack spacing={3}>
                  <Image
                    src="/logo.png"
                    alt="Klonvar"
                    h="48px"
                    filter="brightness(0) invert(1)"
                    fallback={
                      <Box
                        w="48px"
                        h="48px"
                        borderRadius="14px"
                        bg="linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(6, 182, 212, 0.7) 100%)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontFamily="heading" fontWeight="700" fontSize="22px" color="white">
                          K
                        </Text>
                      </Box>
                    }
                  />
                  <Box>
                    <Text
                      fontFamily="heading"
                      fontWeight="600"
                      fontSize="22px"
                      color="white"
                      letterSpacing="-0.02em"
                    >
                      Klonvar
                    </Text>
                    <Text
                      fontSize="12px"
                      color="whiteAlpha.500"
                      letterSpacing="0.04em"
                      textTransform="uppercase"
                    >
                      Inmobiliaria
                    </Text>
                  </Box>
                </HStack>

                <Text
                  color="whiteAlpha.700"
                  fontSize="15px"
                  lineHeight="1.7"
                  maxW="280px"
                >
                  Tu agencia inmobiliaria de confianza en Madrid. Te acompañamos en cada paso.
                </Text>

                {/* Social Links */}
                <HStack spacing={3} pt={2}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MotionBox
                        w="44px"
                        h="44px"
                        borderRadius="14px"
                        bg="rgba(255, 255, 255, 0.06)"
                        backdropFilter="blur(10px)"
                        border="1px solid rgba(255, 255, 255, 0.08)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.3s ease"
                        cursor="pointer"
                        _hover={{
                          bg: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon as={social.icon} boxSize={5} color="whiteAlpha.800" />
                      </MotionBox>
                    </a>
                  ))}
                </HStack>
              </VStack>
            </GridItem>

            {/* Services Column */}
            <GridItem>
              <VStack align="flex-start" spacing={5}>
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="brand.glass.400"
                >
                  Servicios
                </Text>
                {footerLinks.servicios.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Text
                      color="whiteAlpha.700"
                      fontSize="15px"
                      transition="all 0.2s ease"
                      cursor="pointer"
                      _hover={{
                        color: 'white',
                        transform: 'translateX(4px)',
                      }}
                    >
                      {link.label}
                    </Text>
                  </Link>
                ))}
              </VStack>
            </GridItem>

            {/* Company Column */}
            <GridItem>
              <VStack align="flex-start" spacing={5}>
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="brand.glass.400"
                >
                  Empresa
                </Text>
                {footerLinks.empresa.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Text
                      color="whiteAlpha.700"
                      fontSize="15px"
                      transition="all 0.2s ease"
                      cursor="pointer"
                      _hover={{
                        color: 'white',
                        transform: 'translateX(4px)',
                      }}
                    >
                      {link.label}
                    </Text>
                  </Link>
                ))}
              </VStack>
            </GridItem>

            {/* Contact Column */}
            <GridItem>
              <Box
                bg="rgba(255, 255, 255, 0.04)"
                backdropFilter="blur(20px)"
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.06)"
                p={6}
              >
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="brand.glass.400"
                  mb={5}
                >
                  Contacto
                </Text>
                <VStack align="flex-start" spacing={4}>
                  <HStack spacing={3}>
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="10px"
                      bg="rgba(6, 182, 212, 0.15)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiPhone} boxSize={4} color="brand.glass.400" />
                    </Box>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                      <Text
                        color="whiteAlpha.800"
                        fontSize="15px"
                        _hover={{ color: 'white' }}
                        cursor="pointer"
                      >
                        {contactInfo.phone}
                      </Text>
                    </a>
                  </HStack>

                  <HStack spacing={3}>
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="10px"
                      bg="rgba(6, 182, 212, 0.15)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FaWhatsapp} boxSize={4} color="brand.glass.400" />
                    </Box>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <HStack
                        color="whiteAlpha.800"
                        fontSize="15px"
                        _hover={{ color: 'white' }}
                        cursor="pointer"
                      >
                        <Text>WhatsApp</Text>
                        <Icon as={FiArrowUpRight} boxSize={3} />
                      </HStack>
                    </a>
                  </HStack>

                  <HStack spacing={3}>
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="10px"
                      bg="rgba(6, 182, 212, 0.15)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiMail} boxSize={4} color="brand.glass.400" />
                    </Box>
                    <a href={`mailto:${contactInfo.email}`}>
                      <Text
                        color="whiteAlpha.800"
                        fontSize="15px"
                        _hover={{ color: 'white' }}
                        cursor="pointer"
                      >
                        {contactInfo.email}
                      </Text>
                    </a>
                  </HStack>

                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="10px"
                      bg="rgba(6, 182, 212, 0.15)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={FiMapPin} boxSize={4} color="brand.glass.400" />
                    </Box>
                    <Text
                      color="whiteAlpha.800"
                      fontSize="15px"
                      whiteSpace="pre-line"
                      lineHeight="1.5"
                    >
                      {contactInfo.address}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </Box>

        {/* Bottom Bar */}
        <Box
          borderTop="1px solid rgba(255, 255, 255, 0.06)"
          py={6}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text color="whiteAlpha.500" fontSize="13px">
              © {new Date().getFullYear()} Klonvar Invest S.L. Todos los derechos reservados.
            </Text>
            <HStack spacing={6}>
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text
                    color="whiteAlpha.500"
                    fontSize="13px"
                    cursor="pointer"
                    _hover={{ color: 'whiteAlpha.800' }}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
