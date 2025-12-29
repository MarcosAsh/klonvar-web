'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Header, Footer } from '@/components/layout';

export default function CookiesPage() {
  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      <Container maxW="container.md" pt={32} pb={20}>
        <VStack align="stretch" spacing={8}>
          <Heading size="xl" fontFamily="heading">Política de Cookies</Heading>

          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="md" mb={3}>¿Qué son las cookies?</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando 
                los visitas. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, 
                así como para proporcionar información a los propietarios del sitio.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Tipos de cookies que utilizamos</Heading>
              <Text color="gray.600" lineHeight="1.8" mb={4}>
                En nuestra web utilizamos las siguientes categorías de cookies:
              </Text>

              <Box overflowX="auto">
                <Table variant="simple" size="sm" bg="white" borderRadius="lg">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th>Finalidad</Th>
                      <Th>Duración</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontWeight="500">Técnicas</Td>
                      <Td>Permiten la navegación y el uso de funciones básicas</Td>
                      <Td>Sesión</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="500">Autenticación</Td>
                      <Td>Mantienen la sesión del usuario iniciada</Td>
                      <Td>7 días</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="500">Preferencias</Td>
                      <Td>Recuerdan tus preferencias de configuración</Td>
                      <Td>1 año</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="500">Analíticas</Td>
                      <Td>Nos ayudan a entender cómo usas el sitio</Td>
                      <Td>2 años</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Cookies de terceros</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Algunas cookies son establecidas por servicios de terceros que aparecen en nuestras páginas. 
                No tenemos control sobre estas cookies. Puedes consultar las políticas de privacidad de estos 
                terceros para obtener más información sobre cómo gestionan las cookies.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>¿Cómo gestionar las cookies?</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Puedes configurar tu navegador para que rechace todas las cookies o para que te avise cuando se 
                envía una cookie. Sin embargo, si rechazas las cookies, es posible que algunas partes de nuestra 
                web no funcionen correctamente.
              </Text>
              <Text color="gray.600" lineHeight="1.8" mt={3}>
                La mayoría de los navegadores te permiten:
              </Text>
              <Box as="ul" pl={6} mt={2} color="gray.600">
                <li>Ver qué cookies tienes y eliminarlas individualmente</li>
                <li>Bloquear cookies de terceros</li>
                <li>Bloquear cookies de sitios específicos</li>
                <li>Bloquear todas las cookies</li>
                <li>Eliminar todas las cookies al cerrar el navegador</li>
              </Box>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Configuración por navegador</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Puedes encontrar información sobre cómo gestionar las cookies en los navegadores más comunes 
                en los siguientes enlaces:
              </Text>
              <Box as="ul" pl={6} mt={3} color="gray.600">
                <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
                <li>Firefox: Opciones → Privacidad y Seguridad</li>
                <li>Safari: Preferencias → Privacidad</li>
                <li>Edge: Configuración → Cookies y permisos del sitio</li>
              </Box>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Actualización de la política</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Podemos actualizar esta política de cookies periódicamente. Te recomendamos revisarla de vez 
                en cuando para estar informado sobre cómo utilizamos las cookies.
              </Text>
            </Box>
          </VStack>

          <Text fontSize="sm" color="gray.500" mt={8}>
            Última actualización: Diciembre 2025
          </Text>
        </VStack>
      </Container>

      <Footer />
    </Box>
  );
}
