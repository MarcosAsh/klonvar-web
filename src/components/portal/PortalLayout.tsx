'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  Badge,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
  FiMenu,
  FiHome,
  FiClipboard,
  FiFileText,
  FiBell,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi'
import { useAuth } from '@/lib/auth'

const navLinks = [
  { href: '/portal/dashboard', label: 'Inicio', icon: FiHome },
  { href: '/portal/properties', label: 'Propiedades', icon: FiClipboard },
  { href: '/portal/documents', label: 'Documentos', icon: FiFileText },
]

interface PortalLayoutProps {
  children: ReactNode
}

export function PortalLayout({ children }: PortalLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { profile, signOut } = useAuth()
  const pathname = usePathname()

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <Box minH="100vh" bg="rgba(250, 250, 250, 0.85)">
      {/* Header */}
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(250, 250, 250, 0.9)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid rgba(0, 0, 0, 0.04)"
      >
        <Container maxW="container.xl">
          <Flex h={16} justify="space-between" align="center">
            <HStack spacing={4}>
              <IconButton
                aria-label="Menu"
                icon={<FiMenu />}
                variant="ghost"
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
              />
              <Link href="/portal/dashboard">
                <HStack spacing={2}>
                  <Box
                    w="36px"
                    h="36px"
                    borderRadius="10px"
                    bg="linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(6, 182, 212, 0.7) 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontFamily="heading" fontWeight="700" fontSize="16px" color="white">
                      K
                    </Text>
                  </Box>
                  <Text
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize="18px"
                    color="brand.charcoal.900"
                    display={{ base: 'none', sm: 'block' }}
                  >
                    Mi Portal
                  </Text>
                </HStack>
              </Link>
            </HStack>

            {/* Desktop Nav */}
            <HStack
              as="nav"
              spacing={1}
              display={{ base: 'none', lg: 'flex' }}
              bg="rgba(255, 255, 255, 0.72)"
              backdropFilter="blur(20px)"
              borderRadius="980px"
              border="1px solid rgba(0, 0, 0, 0.04)"
              p={1.5}
            >
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <HStack
                    px={4}
                    py={2}
                    borderRadius="980px"
                    bg={isActive(link.href) ? 'rgba(0, 0, 0, 0.04)' : 'transparent'}
                    color={isActive(link.href) ? 'brand.charcoal.900' : 'brand.charcoal.600'}
                    fontWeight={isActive(link.href) ? '600' : '500'}
                    fontSize="14px"
                    transition="all 0.2s"
                    _hover={{ bg: 'rgba(0, 0, 0, 0.04)', color: 'brand.charcoal.900' }}
                    spacing={2}
                  >
                    <Icon as={link.icon} boxSize={4} />
                    <Text>{link.label}</Text>
                  </HStack>
                </Link>
              ))}
            </HStack>

            {/* User Menu */}
            <HStack spacing={3}>
              <IconButton
                aria-label="Notificaciones"
                icon={
                  <Box position="relative">
                    <Icon as={FiBell} boxSize={5} />
                    <Badge
                      position="absolute"
                      top="-4px"
                      right="-4px"
                      colorScheme="red"
                      borderRadius="full"
                      minW="16px"
                      h="16px"
                      fontSize="10px"
                    >
                      3
                    </Badge>
                  </Box>
                }
                variant="ghost"
                borderRadius="full"
              />
              <Menu>
                <MenuButton as={Button} variant="ghost" borderRadius="full" p={1}>
                  <HStack spacing={2}>
                    <Avatar size="sm" name={profile?.name} bg="brand.glass.500" />
                    <Icon as={FiChevronDown} display={{ base: 'none', md: 'block' }} />
                  </HStack>
                </MenuButton>
                <MenuList
                  bg="rgba(255, 255, 255, 0.95)"
                  backdropFilter="blur(20px)"
                  borderRadius="16px"
                  boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
                >
                  <Box px={4} py={3} borderBottom="1px solid rgba(0, 0, 0, 0.04)">
                    <Text fontWeight="600">{profile?.name}</Text>
                    <Text fontSize="sm" color="brand.charcoal.500">
                      {profile?.email}
                    </Text>
                  </Box>
                  <Link href="/portal/profile">
                    <MenuItem icon={<FiSettings />}>Mi perfil</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem icon={<FiLogOut />} color="red.500" onClick={signOut}>
                    Cerrar sesión
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay bg="rgba(0, 0, 0, 0.3)" />
        <DrawerContent maxW="280px">
          <DrawerCloseButton />
          <DrawerBody pt={16}>
            <VStack align="stretch" spacing={2}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose}>
                  <HStack
                    px={4}
                    py={3}
                    borderRadius="12px"
                    bg={isActive(link.href) ? 'brand.glass.100' : 'transparent'}
                    color={isActive(link.href) ? 'brand.glass.700' : 'brand.charcoal.700'}
                    spacing={3}
                  >
                    <Icon as={link.icon} boxSize={5} />
                    <Text fontWeight="500">{link.label}</Text>
                  </HStack>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box as="main" pt={24} pb={12} px={{ base: 4, md: 8 }}>
        <Container maxW="container.xl">{children}</Container>
      </Box>
    </Box>
  )
}
