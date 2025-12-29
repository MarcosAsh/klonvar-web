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
  Image,
  IconButton,
  SimpleGrid,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiArrowLeft, FiSave, FiUpload, FiTrash2 } from 'react-icons/fi';
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

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<any[]>([]);

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

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  async function fetchProperty() {
    try {
      const res = await fetch(`/api/admin/properties/${params.id}`);
      if (!res.ok) throw new Error('Property not found');

      const data = await res.json();
      const p = data.property;

      setForm({
        title: p.title,
        description: p.description,
        price: p.price.toString(),
        address: p.address,
        city: p.city,
        neighborhood: p.neighborhood || '',
        postalCode: p.postalCode || '',
        propertyType: p.propertyType,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        squareMeters: p.squareMeters,
        floor: p.floor?.toString() || '',
        yearBuilt: p.yearBuilt?.toString() || '',
        energyRating: p.energyRating || '',
        status: p.status,
        featured: p.featured,
        hasElevator: p.hasElevator,
        hasParking: p.hasParking,
        hasStorage: p.hasStorage,
        hasTerrace: p.hasTerrace,
        hasPool: p.hasPool,
        hasAC: p.hasAC,
      });
      setImages(p.images || []);
    } catch (error) {
      toast({ title: 'Error al cargar propiedad', status: 'error', duration: 3000 });
      router.push('/admin/properties');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/properties/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          floor: form.floor ? parseInt(form.floor) : null,
          yearBuilt: form.yearBuilt ? parseInt(form.yearBuilt) : null,
        }),
      });

      if (!res.ok) throw new Error('Error updating property');

      toast({ title: 'Propiedad actualizada', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Error al actualizar', status: 'error', duration: 3000 });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/api/admin/properties/${params.id}/images`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setImages(prev => [...prev, data.image]);
      toast({ title: 'Imagen subida', status: 'success', duration: 2000 });
    } catch (error) {
      toast({ title: 'Error al subir imagen', status: 'error', duration: 3000 });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return;

    try {
      const res = await fetch(`/api/admin/properties/${params.id}/images?imageId=${imageId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setImages(prev => prev.filter(img => img.id !== imageId));
      toast({ title: 'Imagen eliminada', status: 'success', duration: 2000 });
    } catch (error) {
      toast({ title: 'Error al eliminar imagen', status: 'error', duration: 3000 });
    }
  };

  if (loading) {
    return (
      <Center h="400px">
        <Spinner size="xl" color="cyan.500" />
      </Center>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      <HStack spacing={4}>
        <Link href="/admin/properties">
          <Button variant="ghost" leftIcon={<FiArrowLeft />}>Volver</Button>
        </Link>
        <Heading size="lg">Editar Propiedad</Heading>
      </HStack>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {/* Images Section */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <HStack justify="space-between" mb={4}>
              <Heading size="md">Imágenes</Heading>
              <Button leftIcon={<FiUpload />} onClick={() => fileInputRef.current?.click()} isLoading={uploading} size="sm">
                Subir Imagen
              </Button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} style={{ display: 'none' }} />
            </HStack>

            {images.length === 0 ? (
              <Box py={8} textAlign="center" bg="gray.50" borderRadius="lg" border="2px dashed" borderColor="gray.200">
                <Text color="gray.500">No hay imágenes. Sube la primera imagen.</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {images.map((img) => (
                  <Box key={img.id} position="relative" borderRadius="lg" overflow="hidden">
                    <Image src={img.url} alt="" objectFit="cover" h="150px" w="100%" />
                    <IconButton
                      aria-label="Delete"
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      position="absolute"
                      top={2}
                      right={2}
                      onClick={() => handleDeleteImage(img.id)}
                    />
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>

          {/* Basic Info */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Información Básica</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Título</FormLabel>
                  <Input name="title" value={form.title} onChange={handleChange} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea name="description" value={form.description} onChange={handleChange} rows={4} />
                </FormControl>
              </GridItem>

              <FormControl isRequired>
                <FormLabel>Precio (€)</FormLabel>
                <Input name="price" type="number" value={form.price} onChange={handleChange} />
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

          {/* Location */}
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
            <Heading size="md" mb={4}>Ubicación</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <Input name="address" value={form.address} onChange={handleChange} />
                </FormControl>
              </GridItem>

              <FormControl isRequired>
                <FormLabel>Ciudad</FormLabel>
                <Input name="city" value={form.city} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Barrio</FormLabel>
                <Input name="neighborhood" value={form.neighborhood} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Código Postal</FormLabel>
                <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
              </FormControl>
            </Grid>
          </Box>

          {/* Characteristics */}
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
                <Input name="floor" type="number" value={form.floor} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Año de construcción</FormLabel>
                <Input name="yearBuilt" type="number" value={form.yearBuilt} onChange={handleChange} />
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
            <Button type="submit" colorScheme="cyan" leftIcon={<FiSave />} isLoading={saving}>
              Guardar Cambios
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}
