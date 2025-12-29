'use client';

import {
  Box,
  Flex,
  VStack,
  HStack,
  Icon,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  IconButton,
} from '@chakra-ui/react';
import { FiHome, FiGrid, FiUsers, FiFileText, FiMail, FiSettings, FiLogOut, FiMenu, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';

const navItems = [
  { icon: FiHome, label: 'Dashboard', href: '/admin' },
  { icon: FiGrid, label: 'Propiedades', href: '/admin/properties' },
  { icon: FiUsers, label: 'Clientes', href: '/admin/clients' },
  { icon: FiFileText, label: 'Solicitudes', href: '/admin/requests' },
  { icon: FiMail, label: 'Mensajes', href: '/admin/messages' },
  { icon: FiSettings, label: 'Configuración', href: '/admin/settings' },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <VStack align="stretch" spacing={1} py={4}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
        return (
          <Link key={item.href} href={item.href} onClick={onClose}>
            <Flex
              align="center"
              px={4}
              py={3}
              mx={2}
              borderRadius="lg"
              bg={isActive ? 'cyan.50' : 'transparent'}
              color={isActive ? 'cyan.700' : 'gray.600'}
              fontWeight={isActive ? '600' : '500'}
              _hover={{ bg: isActive ? 'cyan.50' : 'gray.50' }}
              transition="all 0.2s"
            >
              <Icon as={item.icon} boxSize={5} mr={3} />
              <Text fontSize="sm">{item.label}</Text>
            </Flex>
          </Link>
        );
      })}
    </VStack>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    async function checkAdmin() {
      const res = await fetch('/api/admin/me');
      if (!res.ok) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setAdmin(data.admin);
      setLoading(false);
    }
    checkAdmin();
  }, [router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center" bg="gray.50">
        <Text color="gray.500">Cargando...</Text>
      </Flex>
    );
  }

  return (
    <Flex h="100vh" bg="gray.50">
      <Box
        display={{ base: 'none', lg: 'block' }}
        w="260px"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.200"
        position="fixed"
        h="100vh"
        overflowY="auto"
      >
        <Flex align="center" h="16" px={6} borderBottom="1px solid" borderColor="gray.100">
          <Box
            w="36px"
            h="36px"
            borderRadius="10px"
            bg="linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr={3}
          >
            <Text fontWeight="700" fontSize="16px" color="white">K</Text>
          </Box>
          <Text fontWeight="600" fontSize="lg" color="gray.800">Klonvar Admin</Text>
        </Flex>
        <Sidebar />
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0} pt={12}>
            <Sidebar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box flex={1} ml={{ base: 0, lg: '260px' }}>
        <Flex
          h="16"
          px={{ base: 4, md: 8 }}
          align="center"
          justify="space-between"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          position="sticky"
          top={0}
          zIndex={10}
        >
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            aria-label="Menu"
            icon={<FiMenu />}
            variant="ghost"
            onClick={onOpen}
          />
          <Box display={{ base: 'none', lg: 'block' }} />
          <Menu>
            <MenuButton as={Button} variant="ghost" rightIcon={<FiChevronDown />}>
              <HStack spacing={3}>
                <Avatar size="sm" name={admin?.name} />
                <Text display={{ base: 'none', md: 'block' }} fontWeight="500">{admin?.name}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiSettings />}>Configuración</MenuItem>
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Box p={{ base: 4, md: 8 }} minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
