'use client';

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from '@chakra-ui/react';
import { FiHome, FiUsers, FiFileText, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Stats {
  totalProperties: number;
  activeProperties: number;
  totalClients: number;
  pendingRequests: number;
}

function StatCard({ icon, label, value, helpText, color }: any) {
  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
      <HStack spacing={4}>
        <Box p={3} borderRadius="lg" bg={`${color}.50`}>
          <Icon as={icon} boxSize={6} color={`${color}.500`} />
        </Box>
        <Stat>
          <StatLabel color="gray.500" fontSize="sm">{label}</StatLabel>
          <StatNumber fontSize="2xl" fontWeight="700">{value}</StatNumber>
          {helpText && <StatHelpText mb={0}>{helpText}</StatHelpText>}
        </Stat>
      </HStack>
    </Box>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
    fetchStats();
  }, []);

  return (
    <VStack align="stretch" spacing={8}>
      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <Box>
          <Heading size="lg" color="gray.800">Dashboard</Heading>
          <Text color="gray.500" mt={1}>Bienvenido al panel de administración</Text>
        </Box>
        <Link href="/admin/properties/new">
          <Button leftIcon={<FiPlus />} colorScheme="cyan">Nueva Propiedad</Button>
        </Link>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <GridItem>
          <StatCard icon={FiHome} label="Total Propiedades" value={stats?.totalProperties || 0} color="cyan" />
        </GridItem>
        <GridItem>
          <StatCard icon={FiHome} label="Propiedades Activas" value={stats?.activeProperties || 0} helpText="En venta" color="green" />
        </GridItem>
        <GridItem>
          <StatCard icon={FiUsers} label="Clientes" value={stats?.totalClients || 0} color="blue" />
        </GridItem>
        <GridItem>
          <StatCard icon={FiFileText} label="Solicitudes Pendientes" value={stats?.pendingRequests || 0} color="orange" />
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <GridItem>
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Acciones Rápidas</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Link href="/admin/properties/new">
                <Button w="full" variant="outline" leftIcon={<FiPlus />} justifyContent="flex-start">Añadir Propiedad</Button>
              </Link>
              <Link href="/admin/properties">
                <Button w="full" variant="outline" leftIcon={<FiHome />} justifyContent="flex-start">Ver Propiedades</Button>
              </Link>
              <Link href="/admin/clients">
                <Button w="full" variant="outline" leftIcon={<FiUsers />} justifyContent="flex-start">Ver Clientes</Button>
              </Link>
              <Link href="/admin/requests">
                <Button w="full" variant="outline" leftIcon={<FiFileText />} justifyContent="flex-start">Ver Solicitudes</Button>
              </Link>
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  );
}
