'use client';

import { Box, Container, Flex, HStack, VStack, IconButton, Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Icon, Badge, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { FiMenu, FiHome, FiUsers, FiClipboard, FiFileText, FiMessageSquare, FiBarChart2, FiSettings, FiLogOut, FiChevronDown, FiBell, FiInbox, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { useAdminAuth } from '@/lib/auth/admin-auth';

const navSections = [
  { title: 'Principal', items: [
    { href: '/admin', label: 'Dashboard', icon: FiHome },
    { href: '/admin/properties', label: 'Propiedades', icon: FiClipboard, badge: 3 },
    { href: '/admin/clients', label: 'Clientes', icon: FiUsers },
  ]},
  { title: 'Gestión', items: [
    { href: '/admin/leads', label: 'Leads', icon: FiInbox, badge: 5 },
    { href: '/admin/documents', label: 'Documentos', icon: FiFileText },
    { href: '/admin/messages', label: 'Mensajes', icon: FiMessageSquare, badge: 2 },
    { href: '/admin/contracts', label: 'Contratos', icon: FiDollarSign },
    { href: '/admin/calendar', label: 'Calendario', icon: FiCalendar },
  ]},
  { title: 'Análisis', items: [{ href: '/admin/analytics', label: 'Analíticas', icon: FiBarChart2 }]},
];

interface AdminLayoutProps { children: ReactNode; }

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signOut } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => { signOut(); router.push('/admin/login'); };
  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <Box minH="100vh" bg="#f8f9fa">
      {/* Sidebar - Desktop */}
      <Box as="aside" position="fixed" left={0} top={0} bottom={0} w="260px" bg="brand.charcoal.900" display={{ base: 'none', lg: 'flex' }} flexDirection="column" zIndex={100}>
        <Box p={6} borderBottom="1px solid rgba(255, 255, 255, 0.06)">
          <HStack spacing={3}>
            <Box w="40px" h="40px" borderRadius="12px" bg="linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0%, rgba(6, 182, 212, 0.7) 100%)" display="flex" alignItems="center" justifyContent="center">
              <Text fontFamily="heading" fontWeight="700" fontSize="18px" color="white">K</Text>
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Text fontFamily="heading" fontWeight="600" fontSize="18px" color="white">Klonvar</Text>
              <Text fontSize="10px" color="whiteAlpha.500" letterSpacing="0.1em">ADMIN PANEL</Text>
            </VStack>
          </HStack>
        </Box>

        <VStack flex={1} align="stretch" p={4} spacing={6} overflowY="auto">
          {navSections.map((section) => (
            <Box key={section.title}>
              <Text fontSize="11px" fontWeight="600" letterSpacing="0.08em" color="whiteAlpha.400" textTransform="uppercase" px={3} mb={2}>{section.title}</Text>
              <VStack align="stretch" spacing={1}>
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <HStack px={3} py={2.5} borderRadius="10px" bg={isActive(item.href) ? 'whiteAlpha.100' : 'transparent'} color={isActive(item.href) ? 'white' : 'whiteAlpha.700'} fontWeight={isActive(item.href) ? '600' : '500'} transition="all 0.2s" _hover={{ bg: 'whiteAlpha.100', color: 'white' }} justify="space-between">
                      <HStack spacing={3}><Icon as={item.icon} boxSize={5} /><Text fontSize="14px">{item.label}</Text></HStack>
                      {item.badge && <Badge colorScheme="red" borderRadius="full" px={2} fontSize="10px">{item.badge}</Badge>}
                    </HStack>
                  </Link>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>

        <Box p={4} borderTop="1px solid rgba(255, 255, 255, 0.06)">
          <Menu>
            <MenuButton as={Button} variant="ghost" w="100%" h="auto" p={3} borderRadius="12px" _hover={{ bg: 'whiteAlpha.100' }}>
              <HStack spacing={3}>
                <Avatar size="sm" name={user?.name} bg="brand.glass.500" />
                <VStack align="flex-start" spacing={0} flex={1}>
                  <Text fontSize="14px" fontWeight="600" color="white" noOfLines={1}>{user?.name}</Text>
                  <Text fontSize="11px" color="whiteAlpha.500">{user?.role === 'ADMIN' ? 'Administrador' : 'Agente'}</Text>
                </VStack>
                <Icon as={FiChevronDown} color="whiteAlpha.500" />
              </HStack>
            </MenuButton>
            <MenuList bg="brand.charcoal.800" border="1px solid rgba(255, 255, 255, 0.08)" borderRadius="12px">
              <Link href="/admin/settings"><MenuItem icon={<FiSettings />} bg="transparent" color="whiteAlpha.800" _hover={{ bg: 'whiteAlpha.100' }}>Configuración</MenuItem></Link>
              <MenuDivider borderColor="whiteAlpha.100" />
              <MenuItem icon={<FiLogOut />} bg="transparent" color="red.400" _hover={{ bg: 'whiteAlpha.100' }} onClick={handleSignOut}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Header */}
      <Box as="header" position="fixed" top={0} left={{ base: 0, lg: '260px' }} right={0} zIndex={99} bg="rgba(248, 249, 250, 0.9)" backdropFilter="blur(20px)" borderBottom="1px solid rgba(0, 0, 0, 0.04)">
        <Flex h={16} px={{ base: 4, lg: 8 }} justify="space-between" align="center">
          <IconButton aria-label="Menu" icon={<FiMenu />} variant="ghost" display={{ base: 'flex', lg: 'none' }} onClick={onOpen} />
          <Box flex={1} />
          <HStack spacing={2}>
            <Tooltip label="Notificaciones"><IconButton aria-label="Notificaciones" icon={<Box position="relative"><Icon as={FiBell} boxSize={5} /><Badge position="absolute" top="-4px" right="-4px" colorScheme="red" borderRadius="full" minW="18px" h="18px" fontSize="10px">5</Badge></Box>} variant="ghost" borderRadius="full" /></Tooltip>
            <Avatar size="sm" name={user?.name} display={{ base: 'flex', lg: 'none' }} bg="brand.glass.500" />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay bg="rgba(0, 0, 0, 0.5)" />
        <DrawerContent maxW="280px" bg="brand.charcoal.900">
          <DrawerCloseButton color="white" />
          <DrawerBody pt={16}>
            <VStack align="stretch" spacing={6}>
              {navSections.map((section) => (
                <Box key={section.title}>
                  <Text fontSize="11px" fontWeight="600" letterSpacing="0.08em" color="whiteAlpha.400" textTransform="uppercase" mb={2}>{section.title}</Text>
                  <VStack align="stretch" spacing={1}>
                    {section.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={onClose}>
                        <HStack px={3} py={2.5} borderRadius="10px" bg={isActive(item.href) ? 'whiteAlpha.100' : 'transparent'} color={isActive(item.href) ? 'white' : 'whiteAlpha.700'} justify="space-between">
                          <HStack spacing={3}><Icon as={item.icon} boxSize={5} /><Text fontSize="14px">{item.label}</Text></HStack>
                          {item.badge && <Badge colorScheme="red" borderRadius="full" px={2}>{item.badge}</Badge>}
                        </HStack>
                      </Link>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box as="main" ml={{ base: 0, lg: '260px' }} pt={20} pb={8} px={{ base: 4, lg: 8 }} minH="100vh">{children}</Box>
    </Box>
  );
}
