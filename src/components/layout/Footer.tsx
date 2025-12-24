'use client';

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const footerLinks = {
  servicios: [
    { label: 'Vender tu vivienda', href: '/vender' },
    { label: 'Comprar vivienda', href: '/comprar' },
    { label: 'Valoración gratuita', href: '/valoracion' },
    { label: 'Ver propiedades', href: '/propiedades' },
  ],
  empresa: [
    { label: 'Sobre nosotros', href: '/nosotros' },
    { label: 'Opiniones', href: '/opiniones' },
    { label: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { label: 'Aviso legal', href: '/legal/aviso-legal' },
    { label: 'Política de privacidad', href: '/legal/privacidad' },
    { label: 'Política de cookies', href: '/legal/cookies' },
  ],
};

const contactInfo = {
  phone: '+34 XXX XXX XXX',
  email: 'info@klonvar.com',
  address: 'Avda. García Tapia 171, local 3\n28030 Madrid',
  whatsapp: '+34XXXXXXXXX',
};

const socialLinks = [
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <Box as="footer" bg="brand.navy.900" color="white" pt={{ base: 16, md: 20 }} pb={8}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: 10, lg: 12 }}
          mb={16}
        >
          {/* Brand Column */}
          <GridItem>
            <VStack align="flex-start" spacing={6}>
              <Image
                src="/logo-white.png"
                alt="Klonvar Inmobiliaria"
                h="50px"
                objectFit="contain"
                filter="brightness(0) invert(1)"
                fallback={
                  <Heading size="lg" fontFamily="heading" color="white">
                    KLONVAR
                  </Heading>
                }
              />
              <Text color="whiteAlpha.800" fontSize="sm" lineHeight="tall">
                Tu agencia inmobiliaria de confianza en Madrid. Te acompañamos en
                la venta o compra de tu vivienda con profesionalidad y cercanía.
              </Text>
              <HStack spacing={4}>
                {socialLinks.map((social) => (
                  <ChakraLink
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    p={2}
                    borderRadius="full"
                    bg="whiteAlpha.100"
                    _hover={{
                      bg: 'brand.teal.500',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon as={social.icon} boxSize={5} />
                  </ChakraLink>
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Services Column */}
          <GridItem>
            <VStack align="flex-start" spacing={5}>
              <Heading
                size="sm"
                fontFamily="body"
                fontWeight="600"
                letterSpacing="wider"
                textTransform="uppercase"
                color="brand.gold.400"
              >
                Servicios
              </Heading>
              {footerLinks.servicios.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <ChakraLink
                    color="whiteAlpha.800"
                    fontSize="sm"
                    _hover={{ color: 'white' }}
                  >
                    {link.label}
                  </ChakraLink>
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Company Column */}
          <GridItem>
            <VStack align="flex-start" spacing={5}>
              <Heading
                size="sm"
                fontFamily="body"
                fontWeight="600"
                letterSpacing="wider"
                textTransform="uppercase"
                color="brand.gold.400"
              >
                Empresa
              </Heading>
              {footerLinks.empresa.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <ChakraLink
                    color="whiteAlpha.800"
                    fontSize="sm"
                    _hover={{ color: 'white' }}
                  >
                    {link.label}
                  </ChakraLink>
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Contact Column */}
          <GridItem>
            <VStack align="flex-start" spacing={5}>
              <Heading
                size="sm"
                fontFamily="body"
                fontWeight="600"
                letterSpacing="wider"
                textTransform="uppercase"
                color="brand.gold.400"
              >
                Contacto
              </Heading>
              <VStack align="flex-start" spacing={4}>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FiPhone} boxSize={4} mt={1} color="brand.teal.400" />
                  <ChakraLink
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    color="whiteAlpha.800"
                    fontSize="sm"
                    _hover={{ color: 'white' }}
                  >
                    {contactInfo.phone}
                  </ChakraLink>
                </HStack>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FaWhatsapp} boxSize={4} mt={1} color="brand.teal.400" />
                  <ChakraLink
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    color="whiteAlpha.800"
                    fontSize="sm"
                    _hover={{ color: 'white' }}
                    isExternal
                  >
                    WhatsApp
                  </ChakraLink>
                </HStack>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FiMail} boxSize={4} mt={1} color="brand.teal.400" />
                  <ChakraLink
                    href={`mailto:${contactInfo.email}`}
                    color="whiteAlpha.800"
                    fontSize="sm"
                    _hover={{ color: 'white' }}
                  >
                    {contactInfo.email}
                  </ChakraLink>
                </HStack>
                <HStack spacing={3} align="flex-start">
                  <Icon as={FiMapPin} boxSize={4} mt={1} color="brand.teal.400" />
                  <Text color="whiteAlpha.800" fontSize="sm" whiteSpace="pre-line">
                    {contactInfo.address}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>

        {/* Bottom Bar */}
        <Box borderTopWidth={1} borderColor="whiteAlpha.200" pt={8}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text color="whiteAlpha.600" fontSize="sm">
              © {new Date().getFullYear()} Klonvar Invest S.L. Todos los derechos
              reservados.
            </Text>
            <HStack spacing={6}>
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <ChakraLink
                    color="whiteAlpha.600"
                    fontSize="xs"
                    _hover={{ color: 'white' }}
                  >
                    {link.label}
                  </ChakraLink>
                </Link>
              ))}
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
