'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Button,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiFileText,
  FiShield,
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiClipboard,
  FiBookOpen,
  FiAlertCircle,
} from 'react-icons/fi'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { GlassCard, GlassPill } from '@/components/ui/GlassCard'

const MotionBox = motion(Box)

const services = [
  {
    icon: FiFileText,
    title: 'Revisión de Contratos',
    description: 'Análisis exhaustivo de contratos de compraventa, arrendamiento y cualquier documento inmobiliario.',
    features: [
      'Contratos de compraventa',
      'Contratos de arrendamiento',
      'Contratos de arras',
      'Opciones de compra',
    ],
  },
  {
    icon: FiShield,
    title: 'Due Diligence Inmobiliaria',
    description: 'Verificación completa del estado legal de la propiedad antes de cualquier transacción.',
    features: [
      'Comprobación de cargas',
      'Verificación de titularidad',
      'Análisis urbanístico',
      'Revisión catastral',
    ],
  },
  {
    icon: FiHome,
    title: 'Derecho Inmobiliario',
    description: 'Asesoramiento legal especializado en todas las operaciones relacionadas con inmuebles.',
    features: [
      'Compraventa de inmuebles',
      'Herencias y donaciones',
      'Divisiones de propiedad',
      'Servidumbres y derechos reales',
    ],
  },
  {
    icon: FiUsers,
    title: 'Comunidades de Propietarios',
    description: 'Gestión legal de conflictos y asesoramiento para comunidades de vecinos.',
    features: [
      'Impugnación de acuerdos',
      'Reclamación de cuotas',
      'Modificación de estatutos',
      'Conflictos vecinales',
    ],
  },
  {
    icon: FiClipboard,
    title: 'Gestión Notarial',
    description: 'Acompañamiento y preparación de toda la documentación necesaria para notaría.',
    features: [
      'Preparación de escrituras',
      'Coordinación con notaría',
      'Gestión de impuestos',
      'Inscripción registral',
    ],
  },
  {
    icon: FiAlertCircle,
    title: 'Reclamaciones',
    description: 'Defensa de tus derechos en caso de vicios ocultos, incumplimientos o problemas legales.',
    features: [
      'Vicios ocultos',
      'Incumplimiento contractual',
      'Defectos constructivos',
      'Reclamaciones a promotoras',
    ],
  },
]

export default function JuridicoPage() {
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
          <VStack spacing={6} textAlign="center" maxW="700px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassPill colorScheme="teal">
                <HStack spacing={2}>
                  <Icon as={FiBookOpen} />
                  <Text>Servicios Jurídicos</Text>
                </HStack>
              </GlassPill>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Heading textStyle="heroTitle" color="white" mb={4}>
                Asesoramiento Legal Inmobiliario
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.700">
                Protegemos tus intereses en cada operación. Especialistas en derecho inmobiliario con más de 15 años de experiencia.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Button
                  as={Link}
                  href="/contacto"
                  variant="primary"
                  size="lg"
                  borderRadius="full"
                  px={8}
                >
                  Consulta Gratuita
                </Button>
                <Button
                  as="a"
                  href="tel:+34XXXXXXXXX"
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  borderRadius="full"
                  px={8}
                  _hover={{ bg: 'whiteAlpha.200' }}
                  leftIcon={<FiPhone />}
                >
                  Llámanos
                </Button>
              </HStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box py={{ base: 20, md: 32 }}>
        <Container maxW="container.xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            mb={16}
          >
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="600"
              fontFamily="heading"
              color="brand.charcoal.900"
              mb={4}
            >
              Nuestros Servicios Legales
            </Heading>
            <Text color="brand.charcoal.600" maxW="600px" mx="auto">
              Contamos con un equipo de profesionales especializados en derecho inmobiliario
              para ofrecerte el mejor asesoramiento.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {services.map((service, index) => (
              <MotionBox
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlassCard
                  variant="elevated"
                  p={8}
                  h="100%"
                  _hover={{
                    transform: 'translateY(-4px)',
                  }}
                >
                  <Box
                    w={14}
                    h={14}
                    borderRadius="xl"
                    bg="brand.glass.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={5}
                  >
                    <Icon as={service.icon} boxSize={7} color="brand.glass.600" />
                  </Box>
                  <Heading fontSize="xl" fontWeight="600" mb={3} color="brand.charcoal.900">
                    {service.title}
                  </Heading>
                  <Text color="brand.charcoal.600" mb={5} fontSize="sm">
                    {service.description}
                  </Text>
                  <List spacing={2}>
                    {service.features.map((feature) => (
                      <ListItem key={feature} fontSize="sm" color="brand.charcoal.600">
                        <ListIcon as={FiCheckCircle} color="brand.glass.500" />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                </GlassCard>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={{ base: 16, md: 20 }}>
        <Container maxW="container.lg">
          <GlassCard
            variant="elevated"
            p={{ base: 8, md: 12 }}
            textAlign="center"
            bg="linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)"
            border="1px solid"
            borderColor="brand.glass.200"
          >
            <Heading fontSize={{ base: '2xl', md: '3xl' }} fontWeight="600" fontFamily="heading" mb={4}>
              ¿Necesitas asesoramiento legal?
            </Heading>
            <Text fontSize="lg" mb={8} color="brand.charcoal.600">
              Primera consulta gratuita. Te ayudamos a resolver tus dudas sin compromiso.
            </Text>
            <HStack spacing={4} justify="center" flexWrap="wrap">
              <Button
                as={Link}
                href="/contacto"
                variant="primary"
                size="lg"
                borderRadius="full"
                px={8}
              >
                Solicitar Consulta
              </Button>
              <Button
                as="a"
                href="mailto:juridico@klonvar.com"
                size="lg"
                variant="outline"
                borderRadius="full"
                px={8}
                leftIcon={<FiMail />}
              >
                juridico@klonvar.com
              </Button>
            </HStack>
          </GlassCard>
        </Container>
      </Box>

      {/* Trust Section */}
      <Box py={{ base: 12, md: 16 }} bg="white">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} textAlign="center">
            <VStack>
              <Text fontSize="4xl" fontWeight="700" color="brand.glass.500">
                +500
              </Text>
              <Text color="brand.charcoal.600">Operaciones asesoradas</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="700" color="brand.glass.500">
                15+
              </Text>
              <Text color="brand.charcoal.600">Años de experiencia</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="700" color="brand.glass.500">
                98%
              </Text>
              <Text color="brand.charcoal.600">Clientes satisfechos</Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
