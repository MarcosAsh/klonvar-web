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
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Skeleton,
  Select,
} from '@chakra-ui/react';
import { FiPlus, FiMoreVertical, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const statusColors: Record<string, string> = {
  DRAFT: 'gray',
  PENDING_REVIEW: 'yellow',
  AVAILABLE: 'green',
  RESERVED: 'orange',
  SOLD: 'blue',
  OFF_MARKET: 'red',
};

const statusLabels: Record<string, string> = {
  DRAFT: 'Borrador',
  PENDING_REVIEW: 'En Revisión',
  AVAILABLE: 'Disponible',
  RESERVED: 'Reservado',
  SOLD: 'Vendido',
  OFF_MARKET: 'Fuera de Mercado',
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  async function fetchProperties() {
    try {
      const url = statusFilter ? `/api/admin/properties?status=${statusFilter}` : '/api/admin/properties';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProperty(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) return;

    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Propiedad eliminada', status: 'success', duration: 3000 });
        fetchProperties();
      }
    } catch (error) {
      toast({ title: 'Error al eliminar', status: 'error', duration: 3000 });
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <VStack align="stretch" spacing={6}>
      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <Heading size="lg">Propiedades</Heading>
        <HStack spacing={4}>
          <Select placeholder="Todos los estados" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} w="200px" bg="white">
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Link href="/admin/properties/new">
            <Button leftIcon={<FiPlus />} colorScheme="cyan">Nueva Propiedad</Button>
          </Link>
        </HStack>
      </HStack>

      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden" border="1px solid" borderColor="gray.100">
        <Table>
          <Thead bg="gray.50">
            <Tr>
              <Th>Propiedad</Th>
              <Th>Precio</Th>
              <Th>Tipo</Th>
              <Th>Estado</Th>
              <Th>Características</Th>
              <Th w="50px"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <Tr key={i}>
                  <Td><Skeleton h="40px" /></Td>
                  <Td><Skeleton h="20px" w="80px" /></Td>
                  <Td><Skeleton h="20px" w="60px" /></Td>
                  <Td><Skeleton h="20px" w="80px" /></Td>
                  <Td><Skeleton h="20px" w="100px" /></Td>
                  <Td><Skeleton h="20px" w="30px" /></Td>
                </Tr>
              ))
            ) : properties.length === 0 ? (
              <Tr>
                <Td colSpan={6} textAlign="center" py={8}>
                  <Text color="gray.500">No hay propiedades</Text>
                </Td>
              </Tr>
            ) : (
              properties.map((property) => (
                <Tr key={property.id} _hover={{ bg: 'gray.50' }}>
                  <Td>
                    <HStack spacing={3}>
                      <Image
                        src={property.images[0]?.url || '/placeholder.jpg'}
                        alt={property.title}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/50"
                      />
                      <Box>
                        <Text fontWeight="600" noOfLines={1}>{property.title}</Text>
                        <Text fontSize="sm" color="gray.500" noOfLines={1}>{property.address}, {property.city}</Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td fontWeight="600">{formatPrice(Number(property.price))}</Td>
                  <Td>{property.propertyType}</Td>
                  <Td>
                    <Badge colorScheme={statusColors[property.status]}>{statusLabels[property.status]}</Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">{property.bedrooms} hab · {property.bathrooms} baños · {property.squareMeters}m²</Text>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" />
                      <MenuList>
                        <MenuItem icon={<FiEye />} onClick={() => router.push(`/admin/properties/${property.id}`)}>Ver</MenuItem>
                        <MenuItem icon={<FiEdit />} onClick={() => router.push(`/admin/properties/${property.id}/edit`)}>Editar</MenuItem>
                        <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => deleteProperty(property.id)}>Eliminar</MenuItem>
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
