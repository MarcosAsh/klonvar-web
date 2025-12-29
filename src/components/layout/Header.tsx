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
  Text,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/vender', label: 'Vender' },
  { href: '/comprar', label: 'Comprar' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(250, 250, 250, 0)', 'rgba(250, 250, 250, 0.72)']
  );

  const headerBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(20px)']
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.04)']
  );

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
        style={{
          backgroundColor: headerBg as unknown as string,
          backdropFilter: headerBlur as unknown as string,
          WebkitBackdropFilter: headerBlur as unknown as string,
          borderBottom: `1px solid ${headerBorder}`,
        }}
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            {/* Logo */}
            <Link href="/" passHref>
              <ChakraLink
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ opacity: 0.8, textDecoration: 'none' }}
                transition="opacity 0.2s ease"
              >
                <Image
                  src="/logo.png"
                  alt="Klonvar"
                  h="40px"
                  fallback={
                    <Box
                      w="40px"
                      h="40px"
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
              </ChakraLink>
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
                <Link key={link.href} href={link.href} passHref>
                  <ChakraLink
                    px={4}
                    py={2}
                    borderRadius="980px"
                    fontSize="14px"
                    fontWeight={isActive(link.href) ? '600' : '500'}
                    color={isActive(link.href) ? 'brand.charcoal.900' : 'brand.charcoal.600'}
                    bg={isActive(link.href) ? 'rgba(0, 0, 0, 0.04)' : 'transparent'}
                    transition="all 0.2s ease"
                    _hover={{
                      bg: 'rgba(0, 0, 0, 0.04)',
                      color: 'brand.charcoal.900',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </ChakraLink>
                </Link>
              ))}
            </MotionFlex>

            {/* CTA Button */}
            <HStack spacing={3}>
              <Link href="/valoracion" passHref>
                <Button
                  as="a"
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
                    <Link href={link.href} passHref>
                      <ChakraLink
                        onClick={onClose}
                        display="block"
                        py={3}
                        px={8}
                        fontSize="28px"
                        fontWeight={isActive(link.href) ? '600' : '500'}
                        fontFamily="heading"
                        color={isActive(link.href) ? 'brand.glass.600' : 'brand.charcoal.900'}
                        letterSpacing="-0.02em"
                        textAlign="center"
                        transition="all 0.2s ease"
                        _hover={{
                          color: 'brand.glass.600',
                          textDecoration: 'none',
                        }}
                      >
                        {link.label}
                      </ChakraLink>
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
                <Link href="/valoracion" passHref>
                  <Button
                    as="a"
                    variant="primary"
                    size="xl"
                    onClick={onClose}
                  >
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
