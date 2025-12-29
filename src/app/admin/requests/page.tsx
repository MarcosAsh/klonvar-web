'use client';

import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  useToast,
  Skeleton,
  SimpleGrid,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreVertical, FiCheck, FiX, FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  PENDING: 'orange',
  CONTACTED: 'blue',
  IN_PROGRESS: 'cyan',
  COMPLETED: 'green',
  ARCHIVED: 'gray',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pendiente',
  CONTACTED: 'Contactado',
  IN_PROGRESS: 'En Proceso',
  COMPLETED: 'Completado',
  ARCHIVED: 'Archivado',
};

function RequestCard({ request, type, onStatusChange }: { request: any; type: 'valuation' | 'contact'; onStatusChange: () => void }) {
  const toast = useToast();

  async function updateStatus(status: string) {
    try {
      const endpoint = type === 'valuation' ? 'valuations' : 'contacts';
      const res = await fetch(`/api/admin/requests/${endpoint}/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast({ title: 'Estado actualizado', status: 'success', duration: 2000 });
        onStatusChange();
      }
    } catch (error) {
      toast({ title: 'Error al actualizar', status: 'error', duration: 3000 });
    }
  }

  return (
    <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
      <HStack justify="space-between" mb={4}>
        <Badge colorScheme={statusColors[request.status]}>{statusLabels[request.status]}</Badge>
        <Menu>
          <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" />
          <MenuList>
            <MenuItem icon={<FiCheck />} onClick={() => updateStatus('CONTACTED')}>Marcar contactado</MenuItem>
            <MenuItem icon={<FiCheck />} onClick={() => updateStatus('IN_PROGRESS')}>En proceso</MenuItem>
            <MenuItem icon={<FiCheck />} onClick={() => updateStatus('COMPLETED')}>Completado</MenuItem>
            <MenuItem icon={<FiX />} onClick={() => updateStatus('ARCHIVED')}>Archivar</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Text fontWeight="600" fontSize="lg" mb={2}>{request.name}</Text>

      <VStack align="stretch" spacing={2} mb={4}>
        <HStack spacing={2} fontSize="sm" color="gray.600">
          <Icon as={FiMail} />
          <Text>{request.email}</Text>
        </HStack>
        <HStack spacing={2} fontSize="sm" color="gray.600">
          <Icon as={FiPhone} />
          <Text>{request.phone}</Text>
        </HStack>
        {type === 'valuation' && (
          <HStack spacing={2} fontSize="sm" color="gray.600">
            <Icon as={FiMapPin} />
            <Text>{request.address}</Text>
          </HStack>
        )}
      </VStack>

      {request.message && (
        <Box p={3} bg="gray.50" borderRadius="lg" mb={4}>
          <HStack spacing={2} mb={1}>
            <Icon as={FiMessageSquare} color="gray.400" boxSize={3} />
            <Text fontSize="xs" color="gray.500">Mensaje</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">{request.message}</Text>
        </Box>
      )}

      <Text fontSize="xs" color="gray.400">
        {new Date(request.createdAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </Box>
  );
}

export default function AdminRequestsPage() {
  const [valuations, setValuations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const [valRes, conRes] = await Promise.all([
        fetch('/api/admin/requests/valuations'),
        fetch('/api/admin/requests/contacts'),
      ]);

      if (valRes.ok) {
        const data = await valRes.json();
        setValuations(data.requests || []);
      }
      if (conRes.ok) {
        const data = await conRes.json();
        setContacts(data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  }

  const pendingValuations = valuations.filter((v) => v.status === 'PENDING').length;
  const pendingContacts = contacts.filter((c) => c.status === 'PENDING').length;

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="lg">Solicitudes</Heading>

      <Tabs colorScheme="cyan">
        <TabList>
          <Tab>
            Valoraciones
            {pendingValuations > 0 && (
              <Badge ml={2} colorScheme="orange" borderRadius="full">{pendingValuations}</Badge>
            )}
          </Tab>
          <Tab>
            Contactos
            {pendingContacts > 0 && (
              <Badge ml={2} colorScheme="orange" borderRadius="full">{pendingContacts}</Badge>
            )}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            {loading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} h="250px" borderRadius="xl" />
                ))}
              </SimpleGrid>
            ) : valuations.length === 0 ? (
              <Box textAlign="center" py={12}>
                <Text color="gray.500">No hay solicitudes de valoración</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {valuations.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    type="valuation"
                    onStatusChange={fetchRequests}
                  />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>

          <TabPanel px={0}>
            {loading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} h="250px" borderRadius="xl" />
                ))}
              </SimpleGrid>
            ) : contacts.length === 0 ? (
              <Box textAlign="center" py={12}>
                <Text color="gray.500">No hay solicitudes de contacto</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {contacts.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    type="contact"
                    onStatusChange={fetchRequests}
                  />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
