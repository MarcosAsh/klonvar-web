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
  Text,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/vender', label: 'Vender' },
  { href: '/comprar', label: 'Comprar' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/juridico', label: 'Jurídico' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <MotionBox
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(250, 250, 250, 0.72)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid rgba(0, 0, 0, 0.04)"
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            {/* Logo */}
            <Link href="/">
              <Flex
                align="center"
                gap={2}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s ease"
                cursor="pointer"
              >
                <Image
                  src="/logo.png"
                  alt="Klonvar"
                  h="120px"
                  fallback={
                    <Box
                      w="120px"
                      h="1200px"
                      borderRadius="12px"
                      bg="linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(6, 182, 212, 0.7) 100%)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontFamily="heading" fontWeight="700" fontSize="18px" color="white">
                        K
                      </Text>
                    </Box>
                  }
                />
                <Text
                  fontFamily="heading"
                  fontWeight="600"
                  fontSize="20px"
                  color="brand.charcoal.900"
                  letterSpacing="-0.02em"
                  display={{ base: 'none', sm: 'block' }}
                >
                  Klonvar
                </Text>
              </Flex>
            </Link>

            {/* Desktop Navigation */}
            <MotionFlex
              as="nav"
              display={{ base: 'none', lg: 'flex' }}
              bg="rgba(255, 255, 255, 0.72)"
              backdropFilter="blur(20px) saturate(180%)"
              borderRadius="980px"
              border="1px solid rgba(0, 0, 0, 0.04)"
              boxShadow="0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
              px={2}
              py={1.5}
              gap={1}
            >
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Box
                    px={4}
                    py={2}
                    borderRadius="980px"
                    fontSize="14px"
                    fontWeight={isActive(link.href) ? '600' : '500'}
                    color={isActive(link.href) ? 'brand.charcoal.900' : 'brand.charcoal.600'}
                    bg={isActive(link.href) ? 'rgba(0, 0, 0, 0.04)' : 'transparent'}
                    transition="all 0.2s ease"
                    cursor="pointer"
                    _hover={{
                      bg: 'rgba(0, 0, 0, 0.04)',
                      color: 'brand.charcoal.900',
                    }}
                  >
                    {link.label}
                  </Box>
                </Link>
              ))}
            </MotionFlex>

            {/* CTA Button */}
            <HStack spacing={3}>
              <Link href="/valoracion">
                <Button
                  variant="primary"
                  size="md"
                  display={{ base: 'none', md: 'flex' }}
                >
                  Valoración Gratuita
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Abrir menú"
                icon={<HamburgerIcon boxSize={5} />}
                variant="ghost"
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
                borderRadius="12px"
                bg="rgba(0, 0, 0, 0.02)"
                _hover={{ bg: 'rgba(0, 0, 0, 0.04)' }}
              />
            </HStack>
          </Flex>
        </Container>
      </MotionBox>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay bg="rgba(250, 250, 250, 0.8)" backdropFilter="blur(20px)" />
        <DrawerContent bg="transparent" boxShadow="none">
          <DrawerCloseButton
            size="lg"
            top={4}
            right={4}
            borderRadius="12px"
            bg="rgba(0, 0, 0, 0.04)"
            _hover={{ bg: 'rgba(0, 0, 0, 0.08)' }}
          />
          <DrawerBody
            pt={20}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={4} align="center">
              <AnimatePresence>
                {navLinks.map((link, index) => (
                  <MotionBox
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={link.href} onClick={onClose}>
                      <Box
                        py={3}
                        px={8}
                        fontSize="28px"
                        fontWeight={isActive(link.href) ? '600' : '500'}
                        fontFamily="heading"
                        color={isActive(link.href) ? 'brand.glass.600' : 'brand.charcoal.900'}
                        letterSpacing="-0.02em"
                        textAlign="center"
                        transition="all 0.2s ease"
                        cursor="pointer"
                        _hover={{
                          color: 'brand.glass.600',
                        }}
                      >
                        {link.label}
                      </Box>
                    </Link>
                  </MotionBox>
                ))}
              </AnimatePresence>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                pt={6}
              >
                <Link href="/valoracion" onClick={onClose}>
                  <Button variant="primary" size="xl">
                    Valoración Gratuita
                  </Button>
                </Link>
              </MotionBox>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
