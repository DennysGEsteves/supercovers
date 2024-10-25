/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import NextLink from 'next/link';
import {
  Alert,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
// import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { NextPage } from 'next';

import logic from './Signin.logic';

const SignInView: NextPage = (props: any) => {
  const { data: session, status } = useSession();
  const { data, methods } = logic(props);

  if (session?.user?.email) {
    window.close();
    return null;
  }

  if (status === 'loading') {
    return (
      <Flex direction='row' justify='center' pt={20}>
        <Spinner w='70px' h='70px' thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.500' />
      </Flex>
    );
  }

  return (
    <>
      <Center mt={5} as='h1' fontWeight='bold' fontSize={30}>
        Faça o login
      </Center>
      {data.error && (
        <Alert status='error' justifyContent='center' mt={3}>
          <Text color='red.600' fontSize={14}>
            {data.errorMsgs[data.error] || 'Erro ao tentar se autenticar'}
          </Text>
        </Alert>
      )}
      <Stack flex={1}>
        <Flex align='center' mt={7}>
          <Stack spacing={2} align='center' direction='row' w='full' px='30px'>
            {/* Facebook */}
            {/* <Button
              w='full'
              colorScheme='facebook'
              leftIcon={<FaFacebook />}
              onClick={() => methods.loginWithSocialBtn('facebook')}
              py={6}
              fontSize={16}
            >
              <Center>
                <Text>Facebook</Text>
              </Center>
            </Button> */}

            {/* Google */}
            <Button
              py={6}
              w='full'
              variant='outline'
              leftIcon={<FcGoogle />}
              fontSize={16}
              onClick={() => methods.loginWithSocialBtn('google')}
            >
              <Center>
                <Text>Google</Text>
              </Center>
            </Button>
          </Stack>
        </Flex>
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} w='100%'>
        <Flex p={8} align='center' justify='space-between' gap={8}>
          <Stack flex={1} spacing={2} as='form' onSubmit={methods.loginWithCredentials}>
            <input name='csrfToken' type='hidden' defaultValue={data.csrfToken} />
            <FormControl id='email' isInvalid={!data.validCredentials.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={data.credentials.email}
                onChange={(e) => {
                  methods.setValidCredentials({ ...data.validCredentials, email: e.target.value.length > 0 });
                  methods.setCredentials({ ...data.credentials, email: e.target.value });
                }}
              />
              <FormErrorMessage>* obrigatório</FormErrorMessage>
            </FormControl>
            <FormControl id='password' isInvalid={!data.validCredentials.password}>
              <FormLabel>
                <Flex align='center' justify='space-between'>
                  <Text>Senha</Text>
                  <Link color='blue.500' fontSize={14}>
                    Esqueceu a senha?
                  </Link>
                </Flex>
              </FormLabel>
              <Input
                type='password'
                value={data.credentials.password}
                onChange={(e) => {
                  methods.setValidCredentials({ ...data.validCredentials, password: e.target.value.length > 0 });
                  methods.setCredentials({ ...data.credentials, password: e.target.value });
                }}
              />
              <FormErrorMessage>* obrigatório</FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Button colorScheme='blue' mt={5} type='submit' variant='solid' py={6} fontSize={18}>
                Entrar
              </Button>
            </Stack>
            <Center fontSize={14}>
              Ainda não é membro?
              <NextLink href='/auth/signup'>
                <Text color='blue.500' ml={2}>
                  Registre-se
                </Text>
              </NextLink>
            </Center>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};

export default SignInView;
