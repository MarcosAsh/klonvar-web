'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Header, Footer } from '@/components/layout';

export default function AvisoLegalPage() {
  return (
    <Box bg="#fafafa" minH="100vh">
      <Header />

      <Container maxW="container.md" pt={32} pb={20}>
        <VStack align="stretch" spacing={8}>
          <Heading size="xl" fontFamily="heading">Aviso Legal</Heading>

          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="md" mb={3}>1. Datos identificativos</Heading>
              <Text color="gray.600" lineHeight="1.8">
                En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, 
                de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los 
                siguientes datos:
              </Text>
              <Box mt={4} p={4} bg="white" borderRadius="lg">
                <Text><strong>Denominación social:</strong> Klonvar Invest S.L.</Text>
                <Text><strong>CIF:</strong> B-XXXXXXXX</Text>
                <Text><strong>Domicilio:</strong> Avda. García Tapia 171, Local 3, 28030 Madrid</Text>
                <Text><strong>Email:</strong> info@klonvar.com</Text>
                <Text><strong>Teléfono:</strong> +34 XXX XXX XXX</Text>
              </Box>
            </Box>

            <Box>
              <Heading size="md" mb={3}>2. Objeto</Heading>
              <Text color="gray.600" lineHeight="1.8">
                El prestador, responsable del sitio web, pone a disposición de los usuarios el presente documento con el 
                que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de Servicios de la Sociedad 
                de la Información y del Comercio Electrónico (LSSI-CE), así como informar a todos los usuarios del sitio 
                web respecto a cuáles son las condiciones de uso del sitio web.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>3. Propiedad intelectual e industrial</Heading>
              <Text color="gray.600" lineHeight="1.8">
                El sitio web, incluyendo a título enunciativo pero no limitativo su programación, edición, compilación y 
                demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos son propiedad 
                del prestador o en su caso dispone de licencia o autorización expresa por parte de los autores.
              </Text>
              <Text color="gray.600" lineHeight="1.8" mt={3}>
                Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad 
                intelectual e industrial, así como inscritos en los registros públicos correspondientes.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>4. Condiciones de acceso y utilización</Heading>
              <Text color="gray.600" lineHeight="1.8">
                El sitio web y sus servicios son de acceso libre y gratuito, no obstante, el prestador condiciona la 
                utilización de algunos de los servicios ofrecidos en su web a la previa cumplimentación del correspondiente 
                formulario.
              </Text>
              <Text color="gray.600" lineHeight="1.8" mt={3}>
                El usuario garantiza la autenticidad y actualidad de todos aquellos datos que comunique al prestador y 
                será el único responsable de las manifestaciones falsas o inexactas que realice.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>5. Exclusión de garantías y responsabilidad</Heading>
              <Text color="gray.600" lineHeight="1.8">
                El prestador no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza 
                que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad 
                del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber 
                adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>6. Modificaciones</Heading>
              <Text color="gray.600" lineHeight="1.8">
                El prestador se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas 
                en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través 
                de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>7. Legislación aplicable y jurisdicción</Heading>
              <Text color="gray.600" lineHeight="1.8">
                La relación entre el prestador y el usuario se regirá por la normativa española vigente y cualquier 
                controversia se someterá a los Juzgados y tribunales de la ciudad de Madrid.
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
