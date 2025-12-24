'use client';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Icon,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiCheck, FiSend } from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  message?: string;
}

export function ValuationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un email válido';
    }

    if (!formData.phone || !/^(\+34)?[6-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Introduce un teléfono válido (ej: 612345678)';
    }

    if (!formData.address || formData.address.length < 5) {
      newErrors.address = 'La dirección debe tener al menos 5 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: '¡Solicitud enviada!',
          description: 'Te contactaremos en menos de 24 horas.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        if (data.details) {
          const fieldErrors: FormErrors = {};
          data.details.forEach((detail: { field: string; message: string }) => {
            fieldErrors[detail.field as keyof FormErrors] = detail.message;
          });
          setErrors(fieldErrors);
        }
        toast({
          title: 'Error',
          description: data.error || 'Ha ocurrido un error. Inténtalo de nuevo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la solicitud. Inténtalo de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Box textAlign="center" py={10}>
        <Box
          w={20}
          h={20}
          borderRadius="full"
          bg="brand.teal.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb={6}
        >
          <Icon as={FiCheck} boxSize={10} color="white" />
        </Box>
        <Text fontSize="xl" fontWeight="600" color="brand.navy.900" mb={2}>
          ¡Gracias por tu solicitud!
        </Text>
        <Text color="brand.navy.600">
          Hemos recibido tu información. Un agente se pondrá en contacto contigo en menos de 24 horas.
        </Text>
      </Box>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel color="brand.navy.800" fontWeight="500">
            Nombre completo
          </FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            size="lg"
            bg="white"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} width="100%" align="flex-start">
          <FormControl isInvalid={!!errors.email} flex={1}>
            <FormLabel color="brand.navy.800" fontWeight="500">
              Email
            </FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              size="lg"
              bg="white"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone} flex={1}>
            <FormLabel color="brand.navy.800" fontWeight="500">
              Teléfono
            </FormLabel>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="612 345 678"
              size="lg"
              bg="white"
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl isInvalid={!!errors.address}>
          <FormLabel color="brand.navy.800" fontWeight="500">
            Dirección del inmueble
          </FormLabel>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Calle, número, ciudad"
            size="lg"
            bg="white"
          />
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel color="brand.navy.800" fontWeight="500">
            Mensaje (opcional)
          </FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos más sobre tu vivienda..."
            size="lg"
            bg="white"
            rows={4}
          />
        </FormControl>

        <Button
          type="submit"
          variant="primary"
          size="xl"
          width="100%"
          isLoading={isLoading}
          loadingText="Enviando..."
          rightIcon={<FiSend />}
        >
          Solicitar valoración gratuita
        </Button>

        <Text fontSize="sm" color="brand.navy.500" textAlign="center">
          Al enviar este formulario, aceptas nuestra política de privacidad. No compartiremos tus datos con terceros.
        </Text>
      </VStack>
    </Box>
  );
}
