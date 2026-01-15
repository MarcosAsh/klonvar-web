'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { Header, Footer } from '@/components/layout';

export default function PrivacidadPage() {
  return (
    <Box bg="rgba(250, 250, 250, 0.85)" minH="100vh">
      <Header />

      <Container maxW="container.md" pt={32} pb={20}>
        <VStack align="stretch" spacing={8}>
          <Heading size="xl" fontFamily="heading">Política de Privacidad</Heading>

          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="md" mb={3}>1. Responsable del tratamiento</Heading>
              <Text color="gray.600" lineHeight="1.8">
                <strong>Identidad:</strong> Klonvar Invest S.L.<br />
                <strong>CIF:</strong> B-XXXXXXXX<br />
                <strong>Dirección:</strong> Avda. García Tapia 171, Local 3, 28030 Madrid<br />
                <strong>Email:</strong> info@klonvar.com
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>2. Finalidad del tratamiento</Heading>
              <Text color="gray.600" lineHeight="1.8">
                En Klonvar tratamos la información que nos facilitan las personas interesadas con los siguientes fines:
              </Text>
              <UnorderedList mt={3} spacing={2} color="gray.600">
                <ListItem>Gestionar el envío de la información que nos soliciten.</ListItem>
                <ListItem>Gestionar las solicitudes de valoración de inmuebles.</ListItem>
                <ListItem>Prestar los servicios inmobiliarios contratados.</ListItem>
                <ListItem>Gestionar el alta en el área de clientes y su acceso.</ListItem>
                <ListItem>Enviar comunicaciones comerciales cuando hayan prestado su consentimiento.</ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Heading size="md" mb={3}>3. Legitimación</Heading>
              <Text color="gray.600" lineHeight="1.8">
                La base legal para el tratamiento de sus datos es:
              </Text>
              <UnorderedList mt={3} spacing={2} color="gray.600">
                <ListItem>El consentimiento del interesado para el envío de comunicaciones comerciales.</ListItem>
                <ListItem>La ejecución de un contrato en el que el interesado es parte.</ListItem>
                <ListItem>El interés legítimo del responsable para la gestión de consultas.</ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Heading size="md" mb={3}>4. Conservación de datos</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o no 
                solicite su supresión y durante el plazo por el cuál pudieran derivarse responsabilidades legales 
                por los servicios prestados.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>5. Destinatarios</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Los datos no se comunicarán a terceros salvo obligación legal. No se realizan transferencias 
                internacionales de datos.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>6. Derechos del interesado</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando datos personales 
                que le conciernan. Las personas interesadas tienen derecho a:
              </Text>
              <UnorderedList mt={3} spacing={2} color="gray.600">
                <ListItem>Acceder a sus datos personales.</ListItem>
                <ListItem>Solicitar la rectificación de los datos inexactos.</ListItem>
                <ListItem>Solicitar su supresión cuando los datos ya no sean necesarios.</ListItem>
                <ListItem>Solicitar la limitación del tratamiento en determinados casos.</ListItem>
                <ListItem>Solicitar la portabilidad de los datos.</ListItem>
                <ListItem>Oponerse al tratamiento de sus datos.</ListItem>
              </UnorderedList>
              <Text color="gray.600" lineHeight="1.8" mt={3}>
                Para ejercer estos derechos, puede dirigirse a info@klonvar.com adjuntando copia de su DNI o 
                documento identificativo equivalente.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>7. Medidas de seguridad</Heading>
              <Text color="gray.600" lineHeight="1.8">
                Hemos adoptado las medidas de seguridad técnicas y organizativas necesarias para garantizar la 
                seguridad de los datos de carácter personal y evitar su alteración, pérdida, tratamiento y/o 
                acceso no autorizado.
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
