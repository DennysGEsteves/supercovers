import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import {
  Alert,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  // Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import useLogic from './Signup.logic';

const SignUp: NextPage = () => {
  const { data, methods } = useLogic();

  // if (data.status === 'loading') {
  //   return (
  //     <Flex direction='row' justify='center' pt={20}>
  //       <Spinner w='70px' h='70px' thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.500' />
  //     </Flex>
  //   );
  // }

  if (data.created) {
    return (
      <Flex direction='column' justify='center' align='center' h='100vh'>
        <Icon as={BsFillCheckCircleFill} fontSize='100px' color='green.500' mb={10} />
        <Text textAlign='center' fontSize='25px'>
          Usuario criado com sucesso! <br />
          Aguarde...
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Center mt={5} as='h1' fontWeight='bold' fontSize={30}>
        Informe seus dados
      </Center>
      {data.showCredentialError && (
        <Alert status='error' justifyContent='center' mt={3}>
          <Text color='red.600' fontSize={14}>
            {data.showCredentialError}
          </Text>
        </Alert>
      )}
      <Stack direction={{ base: 'column', md: 'row' }} w='100%'>
        <Flex p={8} align='center' justify='space-between' gap={8}>
          <Stack flex={1} spacing={2} as='form' onSubmit={methods.handleSubmit(methods.submit)}>
            <FormControl isInvalid={!!data.errors?.name}>
              <FormLabel>Nome</FormLabel>
              <Input type='text' {...methods.register('name')} />
              <FormErrorMessage>{data.errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!data.errors?.email}>
              <FormLabel>Email</FormLabel>
              <Input type='text' {...methods.register('email')} />
              <FormErrorMessage>{data.errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!data.errors?.password}>
              <FormLabel>Senha</FormLabel>
              <Input type='password' {...methods.register('password')} />
              <FormErrorMessage>{data.errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!data.errors?.confirmPassword}>
              <FormLabel>Repita a Senha</FormLabel>
              <Input type='password' {...methods.register('confirmPassword')} />
              <FormErrorMessage>{data.errors?.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Button
                disabled={data.isSubmitting}
                mt={5}
                colorScheme='blue'
                type='submit'
                variant='solid'
                py={6}
                fontSize={18}
              >
                {data.isSubmitting ? 'Enviando...' : 'Registrar'}
              </Button>
            </Stack>
            <Center fontSize={14}>
              Já é membro?
              <NextLink href='/auth/signin'>
                <Text color='blue.500' ml={2}>
                  Faça o login
                </Text>
              </NextLink>
            </Center>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};

export default SignUp;
