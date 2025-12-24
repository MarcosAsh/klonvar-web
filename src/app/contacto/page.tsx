'use client';

import { Box, Button, Container, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Icon, Input, Link as ChakraLink, Text, Textarea, useToast, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Header, Footer } from '@/components/layout';

const MotionBox = motion(Box);

export default function ContactoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) { setIsSubmitted(true); toast({ title: 'Mensaje enviado', status: 'success' }); }
      else { toast({ title: 'Error', status: 'error' }); }
    } catch { toast({ title: 'Error', status: 'error' }); }
    finally { setIsSubmitting(false); }
  };

  return (
    <Box>
      <Header />
      <Box bg="brand.navy.900" pt={{ base: 32, md: 40 }} pb={{ base: 16, md: 24 }}>
        <Container maxW="container.xl"><VStack spacing={6} textAlign="center" maxW="2xl" mx="auto">
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Text fontSize="sm" fontWeight="600" color="brand.teal.400" letterSpacing="wider" textTransform="uppercase" mb={4}>Contacto</Text>
            <Heading as="h1" textStyle="heroTitle" color="white" mb={6}>Hablemos sin compromiso</Heading>
          </MotionBox>
        </VStack></Container>
      </Box>
      <Box py={{ base: 16, md: 24 }} bg="brand.cream.50" mt={-12}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1.2fr' }} gap={16}>
            <GridItem>
              <VStack spacing={6} align="flex-start">
                <Heading size="lg" fontFamily="heading">Información de contacto</Heading>
                {[{ icon: FiPhone, label: 'Teléfono', value: '+34 XXX XXX XXX' }, { icon: FaWhatsapp, label: 'WhatsApp', value: 'Escríbenos' }, { icon: FiMail, label: 'Email', value: 'info@klonvar.com' }, { icon: FiMapPin, label: 'Dirección', value: 'Avda. García Tapia 171\n28030 Madrid' }].map((item) => (
                  <HStack key={item.label} spacing={4} p={5} bg="white" borderRadius="xl" boxShadow="soft" w="100%">
                    <Icon as={item.icon} boxSize={6} color="brand.teal.500" />
                    <Box><Text fontSize="sm" color="brand.navy.400">{item.label}</Text><Text fontWeight="600" whiteSpace="pre-line">{item.value}</Text></Box>
                  </HStack>
                ))}
              </VStack>
            </GridItem>
            <GridItem>
              <Box bg="white" borderRadius="2xl" boxShadow="elegant" p={{ base: 6, md: 10 }}>
                {isSubmitted ? (
                  <VStack py={8}><Icon as={FiCheckCircle} boxSize={16} color="brand.teal.500" /><Heading size="lg">¡Mensaje enviado!</Heading></VStack>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                      <Heading size="md" fontFamily="heading" alignSelf="flex-start">Envíanos un mensaje</Heading>
                      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="100%">
                        <FormControl><FormLabel>Nombre</FormLabel><Input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></FormControl>
                        <FormControl><FormLabel>Email</FormLabel><Input name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></FormControl>
                      </Grid>
                      <FormControl><FormLabel>Mensaje</FormLabel><Textarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} required /></FormControl>
                      <Button type="submit" variant="primary" size="lg" w="100%" isLoading={isSubmitting} rightIcon={<FiSend />}>Enviar</Button>
                    </VStack>
                  </form>
                )}
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
