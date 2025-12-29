'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Divider,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const toast = useToast();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmin();
  }, []);

  async function fetchAdmin() {
    try {
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
      }
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  }

  const handleSave = async () => {
    setLoading(true);
    // TODO: Implement save
    setTimeout(() => {
      toast({ title: 'Configuración guardada', status: 'success', duration: 3000 });
      setLoading(false);
    }, 500);
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="lg">Configuración</Heading>

      {/* Profile Settings */}
      <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
        <Heading size="md" mb={6}>Perfil</Heading>

        <HStack spacing={6} mb={6}>
          <Avatar size="xl" name={admin?.name} />
          <VStack align="flex-start" spacing={1}>
            <Text fontWeight="600" fontSize="lg">{admin?.name}</Text>
            <Text color="gray.500">{admin?.email}</Text>
            <Text color="gray.400" fontSize="sm">
              {admin?.role === 'SUPER_ADMIN' ? 'Super Administrador' : admin?.role === 'ADMIN' ? 'Administrador' : 'Agente'}
            </Text>
          </VStack>
        </HStack>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input defaultValue={admin?.name} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input defaultValue={admin?.email} isReadOnly bg="gray.50" />
          </FormControl>
          <FormControl>
            <FormLabel>Teléfono</FormLabel>
            <Input defaultValue={admin?.phone || ''} placeholder="+34 XXX XXX XXX" />
          </FormControl>
        </VStack>
      </Box>

      {/* Company Settings */}
      <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
        <Heading size="md" mb={6}>Empresa</Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Nombre de la empresa</FormLabel>
            <Input defaultValue="Klonvar Invest S.L." />
          </FormControl>
          <FormControl>
            <FormLabel>Email de contacto</FormLabel>
            <Input defaultValue="info@klonvar.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Teléfono de contacto</FormLabel>
            <Input defaultValue="+34 XXX XXX XXX" />
          </FormControl>
          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input defaultValue="Avda. García Tapia 171, Local 3, 28030 Madrid" />
          </FormControl>
        </VStack>
      </Box>

      {/* Notification Settings */}
      <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
        <Heading size="md" mb={6}>Notificaciones</Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Email para notificaciones</FormLabel>
            <Input defaultValue={admin?.email} placeholder="notificaciones@klonvar.com" />
          </FormControl>
          <Text fontSize="sm" color="gray.500">
            Las solicitudes de valoración y contacto se enviarán a este email.
          </Text>
        </VStack>
      </Box>

      <HStack justify="flex-end">
        <Button variant="ghost">Cancelar</Button>
        <Button colorScheme="cyan" onClick={handleSave} isLoading={loading}>
          Guardar cambios
        </Button>
      </HStack>
    </VStack>
  );
}
