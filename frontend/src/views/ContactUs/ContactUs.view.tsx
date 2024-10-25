import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { Controller } from 'react-hook-form';

import { Padding } from 'layout';

import logic from './ContactUs.logic';

const ContactUsView: NextPage = () => {
  const { data, methods } = logic();

  return (
    <Padding>
      <Flex alignItems='center' width='100%' justifyContent='center' flexDirection='column'>
        <Box color='purple.600' fontWeight='800' fontSize={20} mb={3}>
          Contato
        </Box>
        <Heading mb={3} color='white'>
          Ajuda & Suporte
        </Heading>
        <Box color='white' fontSize={18}>
          Entre em contato e diga-nos como podemos ajudar
        </Box>
        <Flex
          width='800px'
          p={20}
          flexDir='column'
          align='center'
          as='form'
          onSubmit={methods.handleSubmit(methods.submit)}
        >
          <FormControl maxWidth='700px' mb='40px' isInvalid={!!data.errors?.email}>
            <FormLabel>Seu Email</FormLabel>
            <Controller
              name='email'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  focusBorderColor='purple.600'
                  // size='sm'
                  variant='outline'
                  color='white'
                  bg='gray.900'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  px={2}
                />
              )}
            />
            {!!data.errors.email && <FormErrorMessage>{data.errors.email.message}</FormErrorMessage>}
          </FormControl>
          <FormControl maxWidth='700px' mb='40px' isInvalid={!!data.errors?.name}>
            <FormLabel>Seu Nome</FormLabel>
            <Controller
              name='name'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  // colorScheme='purple'
                  focusBorderColor='purple.600'
                  // size='lg'
                  variant='outline'
                  bg='gray.900'
                  color='white'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  px={2}
                />
              )}
            />
            {!!data.errors.name && <FormErrorMessage>{data.errors.name.message}</FormErrorMessage>}
          </FormControl>
          <FormControl maxWidth='700px' mb='40px' isInvalid={!!data.errors?.subject}>
            <FormLabel>Assunto</FormLabel>
            <Controller
              name='subject'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  focusBorderColor='purple.600'
                  // size='sm'
                  variant='outline'
                  color='white'
                  bg='gray.900'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  px={2}
                />
              )}
            />
            {!!data.errors.subject && <FormErrorMessage>{data.errors.subject.message}</FormErrorMessage>}
          </FormControl>
          <FormControl maxWidth='700px' mb='40px' isInvalid={!!data.errors?.message}>
            <FormLabel>Mensagem</FormLabel>
            <Controller
              name='message'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Textarea
                  focusBorderColor='purple.600'
                  size=''
                  variant='outline'
                  color='white'
                  bg='gray.900'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  px={2}
                  resize='vertical'
                />
              )}
            />
            {!!data.errors.message && <FormErrorMessage>{data.errors.message.message}</FormErrorMessage>}
          </FormControl>
          <Button w='100%' type='submit' colorScheme='purple'>
            ENVIAR
          </Button>
        </Flex>
      </Flex>
    </Padding>
  );
};

export default ContactUsView;
