'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheck, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Header, Footer } from '@/components/layout';
import { GlassCard, GlassPill } from '@/components/ui/GlassCard';

const MotionBox = motion(Box);

const contactInfo = [
  {
    icon: FiPhone,
    label: 'Teléfono',
    value: '+34 653 945 930',
    href: 'tel:+34653945930',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Escríbenos',
    href: 'https://wa.me/34653945930',
    external: true,
  },
  {
    icon: FiMail,
    label: 'Email',
    value: 'miguel@klonvar.com',
    href: 'mailto:miguel@klonvar.com',
  },
  {
    icon: FiMapPin,
    label: 'Dirección',
    value: 'Avda. García Tapia 171\nLocal 3, 28030 Madrid',
    href: 'https://maps.google.com/?q=Avda.+García+Tapia+171,+28030+Madrid',
    external: true,
  },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: 'Mensaje enviado',
          description: 'Te responderemos lo antes posible.',
          status: 'success',
          duration: 5000,
        });
      } else {
        // Show validation error if available
        const errorMessage = data.details?.fieldErrors 
          ? Object.values(data.details.fieldErrors).flat()[0] as string
          : data.error || 'No se pudo enviar el mensaje.';
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 5000,
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo enviar el mensaje.',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="rgba(250, 250, 250, 0.85)" minH="100vh">
      <Header />

      {/* Hero Section */}
      <Box position="relative" overflow="hidden">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="brand.charcoal.900"
          _before={{
            content: '""',
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '70%',
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: 36, md: 40 }} pb={{ base: 20, md: 28 }}>
          <VStack spacing={6} textAlign="center" maxW="600px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassPill colorScheme="teal">
                <Text>Contacto</Text>
              </GlassPill>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading textStyle="heroTitle" color="white" mb={4}>
                Hablemos sin compromiso
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.700">
                Estamos aquí para ayudarte. Cuéntanos qué necesitas.
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '5fr 7fr' }} gap={{ base: 12, lg: 16 }}>
            {/* Contact Info */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <VStack align="flex-start" spacing={6}>
                  <Box>
                    <Heading size="lg" fontFamily="heading" mb={3}>
                      Información de contacto
                    </Heading>
                    <Text color="brand.charcoal.600">
                      Elige el canal que prefieras para ponerte en contacto con nosotros.
                    </Text>
                  </Box>

                  <VStack align="stretch" spacing={4} w="100%">
                    {contactInfo.map((item) => (
                      <Box
                        key={item.label}
                        as="a"
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        <GlassCard variant="subtle" p={5} _hover={{ transform: 'translateY(-2px)' }}>
                          <HStack spacing={4}>
                            <Box
                              w={12}
                              h={12}
                              borderRadius="14px"
                              bg="brand.glass.100"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              flexShrink={0}
                            >
                              <Icon as={item.icon} boxSize={5} color="brand.glass.600" />
                            </Box>
                            <Box flex={1}>
                              <Text fontSize="12px" color="brand.charcoal.500" textTransform="uppercase" letterSpacing="0.05em">
                                {item.label}
                              </Text>
                              <Text fontWeight="600" color="brand.charcoal.900" whiteSpace="pre-line">
                                {item.value}
                              </Text>
                            </Box>
                            {item.external && (
                              <Icon as={FiArrowUpRight} color="brand.charcoal.400" />
                            )}
                          </HStack>
                        </GlassCard>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Contact Form */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassCard variant="elevated" p={{ base: 6, md: 10 }}>
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <MotionBox
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        textAlign="center"
                        py={10}
                      >
                        <Box
                          w={20}
                          h={20}
                          borderRadius="full"
                          bg="brand.glass.500"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mx="auto"
                          mb={6}
                        >
                          <Icon as={FiCheck} boxSize={10} color="white" />
                        </Box>
                        <Heading size="lg" fontFamily="heading" mb={3}>
                          ¡Mensaje enviado!
                        </Heading>
                        <Text color="brand.charcoal.600">
                          Te responderemos lo antes posible.
                        </Text>
                      </MotionBox>
                    ) : (
                      <MotionBox key="form">
                        <VStack spacing={2} mb={8} align="flex-start">
                          <Heading size="lg" fontFamily="heading">
                            Envíanos un mensaje
                          </Heading>
                          <Text color="brand.charcoal.500" fontSize="15px">
                            Rellena el formulario y te contactaremos pronto.
                          </Text>
                        </VStack>

                        <Box as="form" onSubmit={handleSubmit}>
                          <VStack spacing={5}>
                            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="100%">
                              <FormControl isRequired>
                                <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                  Nombre
                                </FormLabel>
                                <Input
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder="Tu nombre"
                                  size="lg"
                                />
                              </FormControl>

                              <FormControl isRequired>
                                <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                  Email
                                </FormLabel>
                                <Input
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="tu@email.com"
                                  size="lg"
                                />
                              </FormControl>
                            </Grid>

                            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="100%">
                              <FormControl>
                                <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                  Teléfono
                                </FormLabel>
                                <Input
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="612 345 678"
                                  size="lg"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                  Asunto
                                </FormLabel>
                                <Input
                                  name="subject"
                                  value={formData.subject}
                                  onChange={handleChange}
                                  placeholder="¿En qué podemos ayudarte?"
                                  size="lg"
                                />
                              </FormControl>
                            </Grid>

                            <FormControl isRequired>
                              <FormLabel fontWeight="500" color="brand.charcoal.800" fontSize="14px">
                                Mensaje
                              </FormLabel>
                              <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Cuéntanos más..."
                                size="lg"
                                rows={5}
                              />
                            </FormControl>

                            <Button
                              type="submit"
                              variant="primary"
                              size="xl"
                              width="100%"
                              isLoading={isSubmitting}
                              loadingText="Enviando..."
                              rightIcon={<FiSend />}
                            >
                              Enviar mensaje
                            </Button>

                            <Text fontSize="13px" color="brand.charcoal.400" textAlign="center">
                              Al enviar aceptas nuestra política de privacidad.
                            </Text>
                          </VStack>
                        </Box>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}