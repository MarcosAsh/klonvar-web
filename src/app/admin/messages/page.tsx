'use client';

import {
  Box,
  Heading,
  VStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FiMessageSquare } from 'react-icons/fi';

export default function AdminMessagesPage() {
  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="lg">Mensajes</Heading>

      <Box bg="white" p={12} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100" textAlign="center">
        <Icon as={FiMessageSquare} boxSize={16} color="gray.300" mb={4} />
        <Heading size="md" color="gray.600" mb={2}>Sistema de mensajes</Heading>
        <Text color="gray.500" maxW="400px" mx="auto">
          El sistema de mensajería estará disponible próximamente. Aquí podrás comunicarte directamente con tus clientes.
        </Text>
      </Box>
    </VStack>
  );
}
