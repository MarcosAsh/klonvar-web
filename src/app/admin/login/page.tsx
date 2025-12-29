'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
        });
        return;
      }

      const res = await fetch('/api/admin/me');
      if (!res.ok) {
        await supabase.auth.signOut();
        toast({
          title: 'Acceso denegado',
          description: 'No tienes permisos de administrador',
          status: 'error',
          duration: 5000,
        });
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Error al iniciar sesión',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center">
      <Container maxW="md">
        <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" border="1px solid" borderColor="gray.200">
          <VStack spacing={6}>
            <Box textAlign="center">
              <Box
                w="60px"
                h="60px"
                borderRadius="16px"
                bg="linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb={4}
              >
                <Text fontFamily="heading" fontWeight="700" fontSize="24px" color="white">
                  K
                </Text>
              </Box>
              <Heading size="lg" color="gray.800">Admin Portal</Heading>
              <Text color="gray.500" mt={2}>Acceso para administradores</Text>
            </Box>

            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@klonvar.com"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    size="lg"
                  />
                </FormControl>

                <Button type="submit" colorScheme="cyan" size="lg" width="100%" isLoading={loading} mt={4}>
                  Iniciar Sesión
                </Button>
              </VStack>
            </form>

            <Link href="/" passHref>
              <ChakraLink color="gray.500" fontSize="sm">← Volver al inicio</ChakraLink>
            </Link>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
