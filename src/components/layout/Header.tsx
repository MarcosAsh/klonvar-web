'use client';

import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Link as ChakraLink,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionBox = motion(Box);

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/vender', label: 'Vender' },
  { href: '/comprar', label: 'Comprar' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/opiniones', label: 'Opiniones' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(254, 253, 251, 0)', 'rgba(254, 253, 251, 0.95)']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(26, 54, 93, 0)', '0 4px 20px rgba(26, 54, 93, 0.08)']
  );

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <MotionBox
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      style={{
        backgroundColor: headerBg as unknown as string,
        boxShadow: headerShadow as unknown as string,
      }}
      backdropFilter="blur(10px)"
    >
      <Container maxW="container.xl" py={4}>
        <Flex justify="space-between" align="center">
          {/* Logo */}
          <Link href="/" passHref>
            <ChakraLink
              display="flex"
              alignItems="center"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Image
                src="/logo.png"
                alt="Klonvar Inmobiliaria"
                h={{ base: '40px', md: '50px' }}
                objectFit="contain"
              />
            </ChakraLink>
          </Link>

          {/* Desktop Navigation */}
          <HStack
            as="nav"
            spacing={8}
            display={{ base: 'none', lg: 'flex' }}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <ChakraLink
                  fontFamily="body"
                  fontSize="sm"
                  fontWeight={isActive(link.href) ? '600' : '500'}
                  color={isActive(link.href) ? 'brand.teal.600' : 'brand.navy.900'}
                  position="relative"
                  _hover={{ color: 'brand.teal.600' }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: isActive(link.href) ? '100%' : '0%',
                    height: '2px',
                    bg: 'brand.teal.500',
                    transition: 'width 0.3s ease',
                  }}
                  sx={{
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {link.label}
                </ChakraLink>
              </Link>
            ))}
          </HStack>

          {/* CTA Button */}
          <HStack spacing={4}>
            <Link href="/valoracion" passHref>
              <Button
                as="a"
                variant="primary"
                size="md"
                display={{ base: 'none', md: 'flex' }}
                px={6}
              >
                Valoración Gratuita
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Abrir menú"
              icon={<HamburgerIcon boxSize={6} />}
              variant="ghost"
              display={{ base: 'flex', lg: 'none' }}
              onClick={onOpen}
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent bg="brand.cream.50">
          <DrawerCloseButton size="lg" mt={2} />
          <DrawerBody pt={16}>
            <VStack spacing={6} align="stretch">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <ChakraLink
                    onClick={onClose}
                    py={3}
                    px={4}
                    fontSize="lg"
                    fontWeight={isActive(link.href) ? '600' : '500'}
                    color={isActive(link.href) ? 'brand.teal.600' : 'brand.navy.900'}
                    bg={isActive(link.href) ? 'brand.cream.200' : 'transparent'}
                    borderRadius="lg"
                    _hover={{
                      bg: 'brand.cream.200',
                      color: 'brand.teal.600',
                    }}
                  >
                    {link.label}
                  </ChakraLink>
                </Link>
              ))}
              <Box pt={4}>
                <Link href="/valoracion" passHref>
                  <Button
                    as="a"
                    variant="primary"
                    size="lg"
                    width="100%"
                    onClick={onClose}
                  >
                    Valoración Gratuita
                  </Button>
                </Link>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}
