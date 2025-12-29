'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Switch,
  Textarea,
  VStack,
  HStack,
  useToast,
  Divider,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Link from 'next/link';

const propertyTypes = [
  { value: 'APARTMENT', label: 'Apartamento' },
  { value: 'HOUSE', label: 'Casa' },
  { value: 'PENTHOUSE', label: 'Ático' },
  { value: 'STUDIO', label: 'Estudio' },
  { value: 'DUPLEX', label: 'Dúplex' },
  { value: 'LOFT', label: 'Loft' },
  { value: 'COMMERCIAL', label: 'Local Comercial' },
  { value: 'LAND', label: 'Terreno' },
];

const statusOptions = [
  { value: 'DRAFT', label: 'Borrador' },
  { value: 'AVAILABLE', label: 'Disponible' },
  { value: 'RESERVED', label: 'Reservado' },
  { value: 'SOLD', label: 'Vendido' },
  { value: 'OFF_MARKET', label: 'Fuera de Mercado' },
];

export default function NewPropertyPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: 'Madrid',
    neighborhood: '',
    postalCode: '',
    propertyType: 'APARTMENT',
    bedrooms: 1,
    bathrooms: 1,
    squareMeters: 50,
    floor: '',
    yearBuilt: '',
    energyRating: '',
    status: 'DRAFT',
    featured: false,
    hasElevator: false,
    hasParking: false,
    hasStorage: false,
    hasTerrace: false,
    hasPool: false,
    hasAC: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          floor: form.floor ? parseInt(form.floor) : null,
          yearBuilt: form.yearBuilt ? parseInt(form.yearBuilt) : null,
        }),
      });

      if (!res.ok) throw new Error('Error creating property');

      const data = await res.json();
      toast({ title: 'Propiedad creada', status: 'success', duration: 3000 });
      router.push(`/admin/properties/${data.property.id}/edit`);
    } catch (error) {
      toast({ title: 'Error al crear propiedad', status: 'error', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack align="stretch" spacing={6}>
      <HStack spacing={4}>
        <Link href="/admin/properties">
          <Button variant="ghost" leftIcon={<FiArrowLeft />}>Volver</Button>
        </Link>
        <Heading size="lg">Nueva Propiedad</Heading>
      </HStack>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Información Básica</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Título</FormLabel>
                  <Input name="title" value={form.title} onChange={handleChange} placeholder="Ej: Piso luminoso en Salamanca" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Descripción detallada..." />
                </FormControl>
              </GridItem>

              <FormControl isRequired>
                <FormLabel>Precio (€)</FormLabel>
                <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="350000" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Tipo de Propiedad</FormLabel>
                <Select name="propertyType" value={form.propertyType} onChange={handleChange}>
                  {propertyTypes.map(type => (<option key={type.value} value={type.value}>{type.label}</option>))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select name="status" value={form.status} onChange={handleChange}>
                  {statusOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center" pt={8}>
                <FormLabel mb={0}>Destacada</FormLabel>
                <Switch isChecked={form.featured} onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))} colorScheme="cyan" />
              </FormControl>
            </Grid>
          </Box>

          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Ubicación</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <Input name="address" value={form.address} onChange={handleChange} placeholder="Calle, número" />
                </FormControl>
              </GridItem>

              <FormControl isRequired>
                <FormLabel>Ciudad</FormLabel>
                <Input name="city" value={form.city} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Barrio</FormLabel>
                <Input name="neighborhood" value={form.neighborhood} onChange={handleChange} placeholder="Salamanca" />
              </FormControl>

              <FormControl>
                <FormLabel>Código Postal</FormLabel>
                <Input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="28001" />
              </FormControl>
            </Grid>
          </Box>

          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Características</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
              <FormControl isRequired>
                <FormLabel>Habitaciones</FormLabel>
                <NumberInput min={0} max={20} value={form.bedrooms} onChange={(_, val) => setForm(prev => ({ ...prev, bedrooms: val }))}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Baños</FormLabel>
                <NumberInput min={1} max={10} value={form.bathrooms} onChange={(_, val) => setForm(prev => ({ ...prev, bathrooms: val }))}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Metros cuadrados</FormLabel>
                <NumberInput min={1} value={form.squareMeters} onChange={(_, val) => setForm(prev => ({ ...prev, squareMeters: val }))}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Planta</FormLabel>
                <Input name="floor" type="number" value={form.floor} onChange={handleChange} placeholder="0" />
              </FormControl>

              <FormControl>
                <FormLabel>Año de construcción</FormLabel>
                <Input name="yearBuilt" type="number" value={form.yearBuilt} onChange={handleChange} placeholder="1990" />
              </FormControl>

              <FormControl>
                <FormLabel>Certificado energético</FormLabel>
                <Select name="energyRating" value={form.energyRating} onChange={handleChange} placeholder="Seleccionar">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => (<option key={r} value={r}>{r}</option>))}
                </Select>
              </FormControl>
            </Grid>

            <Divider my={6} />

            <Heading size="sm" mb={4}>Extras</Heading>
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
              {[
                { name: 'hasElevator', label: 'Ascensor' },
                { name: 'hasParking', label: 'Parking' },
                { name: 'hasStorage', label: 'Trastero' },
                { name: 'hasTerrace', label: 'Terraza' },
                { name: 'hasPool', label: 'Piscina' },
                { name: 'hasAC', label: 'Aire acondicionado' },
              ].map(({ name, label }) => (
                <FormControl key={name} display="flex" alignItems="center">
                  <Switch
                    isChecked={(form as any)[name]}
                    onChange={(e) => setForm(prev => ({ ...prev, [name]: e.target.checked }))}
                    colorScheme="cyan"
                    mr={2}
                  />
                  <FormLabel mb={0} cursor="pointer">{label}</FormLabel>
                </FormControl>
              ))}
            </Grid>
          </Box>

          <HStack justify="flex-end" spacing={4}>
            <Link href="/admin/properties">
              <Button variant="ghost">Cancelar</Button>
            </Link>
            <Button type="submit" colorScheme="cyan" leftIcon={<FiSave />} isLoading={loading}>
              Crear Propiedad
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}
