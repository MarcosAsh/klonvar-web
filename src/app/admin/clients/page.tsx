'use client';

import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Skeleton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiPlus, FiMoreVertical, FiSearch, FiMail, FiPhone, FiEye } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const clientTypeLabels: Record<string, string> = {
  SELLER: 'Vendedor',
  BUYER: 'Comprador',
  BOTH: 'Ambos',
};

const statusColors: Record<string, string> = {
  ACTIVE: 'green',
  INACTIVE: 'gray',
  SUSPENDED: 'red',
};

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const res = await fetch('/api/admin/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VStack align="stretch" spacing={6}>
      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <Heading size="lg">Clientes</Heading>
        <HStack spacing={4}>
          <InputGroup maxW="300px">
            <InputLeftElement>
              <FiSearch color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar clientes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="white"
            />
          </InputGroup>
        </HStack>
      </HStack>

      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden" border="1px solid" borderColor="gray.100">
        <Table>
          <Thead bg="gray.50">
            <Tr>
              <Th>Cliente</Th>
              <Th>Contacto</Th>
              <Th>Tipo</Th>
              <Th>Estado</Th>
              <Th>Propiedades</Th>
              <Th>Fecha registro</Th>
              <Th w="50px"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <Tr key={i}>
                  <Td><Skeleton h="40px" /></Td>
                  <Td><Skeleton h="20px" /></Td>
                  <Td><Skeleton h="20px" w="60px" /></Td>
                  <Td><Skeleton h="20px" w="60px" /></Td>
                  <Td><Skeleton h="20px" w="40px" /></Td>
                  <Td><Skeleton h="20px" w="80px" /></Td>
                  <Td><Skeleton h="20px" w="30px" /></Td>
                </Tr>
              ))
            ) : filteredClients.length === 0 ? (
              <Tr>
                <Td colSpan={7} textAlign="center" py={8}>
                  <Text color="gray.500">No hay clientes</Text>
                </Td>
              </Tr>
            ) : (
              filteredClients.map((client) => (
                <Tr key={client.id} _hover={{ bg: 'gray.50' }}>
                  <Td>
                    <HStack spacing={3}>
                      <Avatar size="sm" name={client.name} />
                      <Text fontWeight="600">{client.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <VStack align="flex-start" spacing={0}>
                      <HStack spacing={1} fontSize="sm">
                        <FiMail size={12} />
                        <Text>{client.email}</Text>
                      </HStack>
                      {client.phone && (
                        <HStack spacing={1} fontSize="sm" color="gray.500">
                          <FiPhone size={12} />
                          <Text>{client.phone}</Text>
                        </HStack>
                      )}
                    </VStack>
                  </Td>
                  <Td>
                    <Badge variant="subtle" colorScheme="blue">
                      {clientTypeLabels[client.clientType]}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={statusColors[client.status]}>
                      {client.status === 'ACTIVE' ? 'Activo' : client.status === 'INACTIVE' ? 'Inactivo' : 'Suspendido'}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontWeight="500">{client._count?.properties || 0}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(client.createdAt).toLocaleDateString('es-ES')}
                    </Text>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" />
                      <MenuList>
                        <MenuItem icon={<FiEye />}>Ver detalles</MenuItem>
                        <MenuItem icon={<FiMail />}>Enviar email</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
}
