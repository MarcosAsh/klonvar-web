'use client'

import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  FiHome,
  FiFileText,
  FiBell,
  FiPlus,
  FiUpload,
  FiArrowRight,
} from 'react-icons/fi'
import { useAuth } from '@/lib/auth'
import { PortalLayout } from '@/components/portal/PortalLayout'
import { GlassCard, GlassPill } from '@/components/ui/GlassCard'

const MotionBox = motion(Box)

interface DashboardStats {
  properties: number
  documents: number
  notifications: number
}

interface RecentProperty {
  id: string
  title: string
  status: string
  price: number
  updatedAt: string
}

const statusLabels: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Borrador', color: 'gray' },
  PENDING_REVIEW: { label: 'En revisión', color: 'orange' },
  AVAILABLE: { label: 'Publicado', color: 'green' },
  RESERVED: { label: 'Reservado', color: 'blue' },
  SOLD: { label: 'Vendido', color: 'purple' },
}

export default function PortalDashboardPage() {
  const { profile, isLoading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    properties: 0,
    documents: 0,
    notifications: 0,
  })
  const [recentProperties, setRecentProperties] = useState<RecentProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portal/properties')
        if (response.ok) {
          const data = await response.json()
          setRecentProperties(data.properties?.slice(0, 3) || [])
          setStats((prev) => ({ ...prev, properties: data.properties?.length || 0 }))
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      fetchData()
    }
  }, [authLoading])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Buenos días'
    if (hour < 20) return 'Buenas tardes'
    return 'Buenas noches'
  }

  if (authLoading || isLoading) {
    return (
      <PortalLayout>
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size="xl" color="brand.glass.500" thickness="3px" />
            <Text color="brand.charcoal.500">Cargando...</Text>
          </VStack>
        </Center>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout>
      <VStack align="stretch" spacing={8}>
        {/* Welcome */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            fontFamily="heading"
            fontSize={{ base: '28px', md: '36px' }}
            fontWeight="600"
            color="brand.charcoal.900"
            letterSpacing="-0.02em"
          >
            {getGreeting()}, {profile?.name?.split(' ')[0] || 'Usuario'}
          </Heading>
          <Text color="brand.charcoal.500" mt={1}>
            Bienvenido a tu portal de gestión inmobiliaria
          </Text>
        </MotionBox>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
          {[
            { label: 'Propiedades', value: stats.properties, icon: FiHome, href: '/portal/properties' },
            { label: 'Documentos', value: stats.documents, icon: FiFileText, href: '/portal/documents' },
            { label: 'Notificaciones', value: stats.notifications, icon: FiBell, href: '/portal/notifications' },
          ].map((stat, i) => (
            <MotionBox
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={stat.href}>
                <GlassCard variant="subtle" p={5} _hover={{ transform: 'translateY(-2px)' }}>
                  <HStack justify="space-between" mb={3}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="12px"
                      bg="brand.glass.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={stat.icon} boxSize={5} color="brand.glass.600" />
                    </Box>
                    {stat.value > 0 && stat.label === 'Notificaciones' && (
                      <Box
                        bg="red.500"
                        color="white"
                        borderRadius="full"
                        minW="20px"
                        h="20px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="11px"
                        fontWeight="bold"
                      >
                        {stat.value}
                      </Box>
                    )}
                  </HStack>
                  <Text fontFamily="heading" fontSize="28px" fontWeight="600" color="brand.charcoal.900">
                    {stat.value}
                  </Text>
                  <Text fontSize="13px" color="brand.charcoal.500">
                    {stat.label}
                  </Text>
                </GlassCard>
              </Link>
            </MotionBox>
          ))}
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          {/* Recent Properties */}
          <GridItem>
            <GlassCard variant="default" p={6}>
              <HStack justify="space-between" mb={6}>
                <Heading size="md" fontFamily="heading">
                  Mis propiedades
                </Heading>
                <Link href="/portal/properties">
                  <Button variant="ghost" size="sm" rightIcon={<FiArrowRight />}>
                    Ver todas
                  </Button>
                </Link>
              </HStack>

              {recentProperties.length === 0 ? (
                <VStack py={8} spacing={4}>
                  <Icon as={FiHome} boxSize={12} color="brand.charcoal.200" />
                  <Text color="brand.charcoal.500">No tienes propiedades aún</Text>
                  <Link href="/portal/properties/new">
                    <Button variant="primary" leftIcon={<FiPlus />}>
                      Añadir propiedad
                    </Button>
                  </Link>
                </VStack>
              ) : (
                <VStack align="stretch" spacing={3}>
                  {recentProperties.map((property) => (
                    <Link key={property.id} href={`/portal/properties/${property.id}`}>
                      <HStack
                        p={4}
                        bg="rgba(0, 0, 0, 0.02)"
                        borderRadius="12px"
                        justify="space-between"
                        _hover={{ bg: 'rgba(0, 0, 0, 0.04)' }}
                        transition="all 0.2s"
                      >
                        <VStack align="flex-start" spacing={1}>
                          <Text fontWeight="600">{property.title}</Text>
                          <Text fontSize="sm" color="brand.charcoal.500">
                            {new Intl.NumberFormat('es-ES', {
                              style: 'currency',
                              currency: 'EUR',
                              maximumFractionDigits: 0,
                            }).format(property.price)}
                          </Text>
                        </VStack>
                        <GlassPill
                          colorScheme={
                            statusLabels[property.status]?.color === 'green' ? 'teal' : 'neutral'
                          }
                        >
                          {statusLabels[property.status]?.label}
                        </GlassPill>
                      </HStack>
                    </Link>
                  ))}
                </VStack>
              )}
            </GlassCard>
          </GridItem>

          {/* Quick Actions */}
          <GridItem>
            <GlassCard variant="accent" p={6}>
              <Heading size="md" fontFamily="heading" mb={6}>
                Acciones rápidas
              </Heading>
              <VStack align="stretch" spacing={3}>
                <Link href="/portal/properties/new">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<FiPlus />}
                    w="100%"
                    justifyContent="flex-start"
                  >
                    Nueva propiedad
                  </Button>
                </Link>
                <Link href="/portal/documents">
                  <Button
                    variant="glass"
                    size="lg"
                    leftIcon={<FiUpload />}
                    w="100%"
                    justifyContent="flex-start"
                  >
                    Subir documento
                  </Button>
                </Link>
              </VStack>
            </GlassCard>
          </GridItem>
        </Grid>
      </VStack>
    </PortalLayout>
  )
}
