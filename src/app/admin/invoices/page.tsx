'use client'

import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  useToast,
  Spinner,
  Center,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiMoreVertical,
  FiMail,
  FiPhone,
  FiHome,
  FiFilter,
} from 'react-icons/fi'
import { GlassCard } from '@/components/ui/GlassCard'

const MotionBox = motion(Box)

interface Client {
  id: string
  name: string
  email: string
  phone: string | null
}

interface Property {
  id: string
  title: string
  address: string
}

interface InvoiceRequest {
  id: string
  description: string
  amount: number | null
  invoiceType: string
  status: string
  adminNotes: string | null
  createdAt: string
  client: Client
  property: Property | null
}

interface StatusCounts {
  PENDING: number
  PROCESSING: number
  COMPLETED: number
  REJECTED: number
  total: number
}

const invoiceTypeLabels: Record<string, string> = {
  RENT: 'Alquiler',
  MAINTENANCE: 'Mantenimiento',
  SERVICE: 'Servicio',
  OTHER: 'Otro',
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof FiClock }> = {
  PENDING: { label: 'Pendiente', color: 'yellow', icon: FiClock },
  PROCESSING: { label: 'En Proceso', color: 'blue', icon: FiLoader },
  COMPLETED: { label: 'Completada', color: 'green', icon: FiCheckCircle },
  REJECTED: { label: 'Rechazada', color: 'red', icon: FiXCircle },
}

export default function AdminInvoicesPage() {
  const [invoiceRequests, setInvoiceRequests] = useState<InvoiceRequest[]>([])
  const [counts, setCounts] = useState<StatusCounts>({ PENDING: 0, PROCESSING: 0, COMPLETED: 0, REJECTED: 0, total: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedRequest, setSelectedRequest] = useState<InvoiceRequest | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    fetchInvoiceRequests()
  }, [statusFilter])

  const fetchInvoiceRequests = async () => {
    setIsLoading(true)
    try {
      const url = statusFilter
        ? `/api/admin/invoice-requests?status=${statusFilter}`
        : '/api/admin/invoice-requests'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setInvoiceRequests(data.invoiceRequests || [])
        setCounts(data.counts || { PENDING: 0, PROCESSING: 0, COMPLETED: 0, REJECTED: 0, total: 0 })
      }
    } catch (error) {
      console.error('Error fetching invoice requests:', error)
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las solicitudes',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenUpdate = (request: InvoiceRequest) => {
    setSelectedRequest(request)
    setNewStatus(request.status)
    setAdminNotes(request.adminNotes || '')
    onOpen()
  }

  const handleUpdateStatus = async () => {
    if (!selectedRequest) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/invoice-requests?id=${selectedRequest.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes.trim() || undefined,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setInvoiceRequests((prev) =>
          prev.map((req) => (req.id === selectedRequest.id ? data.invoiceRequest : req))
        )
        onClose()
        toast({
          title: 'Solicitud actualizada',
          status: 'success',
          duration: 3000,
        })
        // Refresh counts
        fetchInvoiceRequests()
      } else {
        throw new Error('Failed to update')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la solicitud',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const quickUpdateStatus = async (requestId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/invoice-requests?id=${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        const data = await response.json()
        setInvoiceRequests((prev) =>
          prev.map((req) => (req.id === requestId ? data.invoiceRequest : req))
        )
        toast({
          title: 'Estado actualizado',
          status: 'success',
          duration: 2000,
        })
        fetchInvoiceRequests()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar',
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <VStack align="stretch" spacing={6} p={{ base: 4, md: 8 }}>
      {/* Header */}
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
          Solicitudes de Factura
        </Heading>
        <Text color="brand.charcoal.500" mt={1}>
          Gestiona las solicitudes de factura de los clientes
        </Text>
      </MotionBox>

     {/* Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <Box cursor="pointer" onClick={() => setStatusFilter('')}>
          <GlassCard variant="default">
            <Stat>
              <StatLabel color="gray.500">Total</StatLabel>
              <StatNumber fontSize="2xl">{counts.total}</StatNumber>
            </Stat>
          </GlassCard>
        </Box>
        <Box
          cursor="pointer"
          onClick={() => setStatusFilter('PENDING')}
        >
          <GlassCard
            variant="default"
            borderLeft={statusFilter === 'PENDING' ? '3px solid' : 'none'}
            borderColor="yellow.400"
          >
            <Stat>
              <StatLabel color="yellow.600">
                <HStack>
                  <Icon as={FiClock} />
                  <Text>Pendientes</Text>
                </HStack>
              </StatLabel>
              <StatNumber fontSize="2xl" color="yellow.600">
                {counts.PENDING}
              </StatNumber>
            </Stat>
          </GlassCard>
        </Box>
        <Box
          cursor="pointer"
          onClick={() => setStatusFilter('PROCESSING')}
        >
          <GlassCard
            variant="default"
            borderLeft={statusFilter === 'PROCESSING' ? '3px solid' : 'none'}
            borderColor="blue.400"
          >
            <Stat>
              <StatLabel color="blue.600">
                <HStack>
                  <Icon as={FiLoader} />
                  <Text>En Proceso</Text>
                </HStack>
              </StatLabel>
              <StatNumber fontSize="2xl" color="blue.600">
                {counts.PROCESSING}
              </StatNumber>
            </Stat>
          </GlassCard>
        </Box>
        <Box
          cursor="pointer"
          onClick={() => setStatusFilter('COMPLETED')}
        >
          <GlassCard
            variant="default"
            borderLeft={statusFilter === 'COMPLETED' ? '3px solid' : 'none'}
            borderColor="green.400"
          >
            <Stat>
              <StatLabel color="green.600">
                <HStack>
                  <Icon as={FiCheckCircle} />
                  <Text>Completadas</Text>
                </HStack>
              </StatLabel>
              <StatNumber fontSize="2xl" color="green.600">
                {counts.COMPLETED}
              </StatNumber>
            </Stat>
          </GlassCard>
        </Box>
      </SimpleGrid>

      {/* Filter */}
      <HStack>
        <Icon as={FiFilter} color="gray.500" />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW="200px"
          placeholder="Todos los estados"
        >
          <option value="PENDING">Pendientes</option>
          <option value="PROCESSING">En Proceso</option>
          <option value="COMPLETED">Completadas</option>
          <option value="REJECTED">Rechazadas</option>
        </Select>
      </HStack>

      {/* Table */}
      <GlassCard variant="default" overflow="hidden">
        {isLoading ? (
          <Center py={10}>
            <Spinner size="lg" color="brand.glass.500" />
          </Center>
        ) : invoiceRequests.length === 0 ? (
          <VStack py={12} spacing={4}>
            <Icon as={FiFileText} boxSize={12} color="gray.300" />
            <Text color="gray.500">No hay solicitudes de factura</Text>
          </VStack>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Cliente</Th>
                  <Th>Descripción</Th>
                  <Th>Tipo</Th>
                  <Th>Monto</Th>
                  <Th>Estado</Th>
                  <Th>Fecha</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoiceRequests.map((request) => {
                  const status = statusConfig[request.status] || statusConfig.PENDING
                  return (
                    <Tr key={request.id} _hover={{ bg: 'gray.50' }}>
                      <Td>
                        <HStack>
                          <Avatar size="sm" name={request.client.name} />
                          <Box>
                            <Text fontWeight="500">{request.client.name}</Text>
                            <Text fontSize="xs" color="gray.500">
                              {request.client.email}
                            </Text>
                          </Box>
                        </HStack>
                      </Td>
                      <Td maxW="250px">
                        <Text noOfLines={2}>{request.description}</Text>
                        {request.property && (
                          <HStack fontSize="xs" color="gray.500" mt={1}>
                            <Icon as={FiHome} />
                            <Text noOfLines={1}>{request.property.title}</Text>
                          </HStack>
                        )}
                      </Td>
                      <Td>
                        <Badge>{invoiceTypeLabels[request.invoiceType] || request.invoiceType}</Badge>
                      </Td>
                      <Td>
                        {request.amount ? (
                          <Text fontWeight="600" color="green.600">
                            €{request.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                          </Text>
                        ) : (
                          <Text color="gray.400">-</Text>
                        )}
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={status.color}
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          <HStack spacing={1}>
                            <Icon as={status.icon} boxSize={3} />
                            <Text>{status.label}</Text>
                          </HStack>
                        </Badge>
                      </Td>
                      <Td>
                        <Text fontSize="sm" color="gray.600">
                          {formatDate(request.createdAt)}
                        </Text>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem onClick={() => handleOpenUpdate(request)}>
                              Editar estado
                            </MenuItem>
                            {request.status === 'PENDING' && (
                              <MenuItem
                                onClick={() => quickUpdateStatus(request.id, 'PROCESSING')}
                                icon={<FiLoader />}
                              >
                                Marcar en proceso
                              </MenuItem>
                            )}
                            {(request.status === 'PENDING' || request.status === 'PROCESSING') && (
                              <>
                                <MenuItem
                                  onClick={() => quickUpdateStatus(request.id, 'COMPLETED')}
                                  icon={<FiCheckCircle />}
                                  color="green.500"
                                >
                                  Marcar completada
                                </MenuItem>
                                <MenuItem
                                  onClick={() => quickUpdateStatus(request.id, 'REJECTED')}
                                  icon={<FiXCircle />}
                                  color="red.500"
                                >
                                  Rechazar
                                </MenuItem>
                              </>
                            )}
                            <MenuItem
                              as="a"
                              href={`mailto:${request.client.email}`}
                              icon={<FiMail />}
                            >
                              Enviar email
                            </MenuItem>
                            {request.client.phone && (
                              <MenuItem
                                as="a"
                                href={`tel:${request.client.phone}`}
                                icon={<FiPhone />}
                              >
                                Llamar
                              </MenuItem>
                            )}
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        )}
      </GlassCard>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="24px" mx={4}>
          <ModalHeader>Actualizar Solicitud</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRequest && (
              <VStack spacing={4} align="stretch">
                <Box bg="gray.50" p={4} borderRadius="md">
                  <Text fontWeight="600">{selectedRequest.client.name}</Text>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    {selectedRequest.description}
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="500" mb={2}>
                    Estado
                  </Text>
                  <Select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="PENDING">Pendiente</option>
                    <option value="PROCESSING">En Proceso</option>
                    <option value="COMPLETED">Completada</option>
                    <option value="REJECTED">Rechazada</option>
                  </Select>
                </Box>

                <Box>
                  <Text fontWeight="500" mb={2}>
                    Notas para el cliente (opcional)
                  </Text>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Añade notas que el cliente podrá ver..."
                    rows={3}
                  />
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleUpdateStatus}
              isLoading={isUpdating}
            >
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
