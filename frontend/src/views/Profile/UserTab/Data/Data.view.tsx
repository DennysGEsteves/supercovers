import React from 'react';
import { NextPage } from 'next';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import logic from './Data.logic';

const UserDataView: NextPage = () => {
  const { data, methods } = logic();

  if (!data.me) return null;

  return (
    <Flex as='form' w='100%' flexDir='column' onSubmit={methods.handleSubmit(methods.submit)}>
      <FormControl
        maxWidth='600px'
        mb='20px'
        sx={{
          '& input': {
            border: 0,
          },
        }}
      >
        <FormLabel mb={0} fontSize={14}>
          Email
        </FormLabel>
        <Input color='white' px={0} bg='gray.900' readOnly size='sm' variant='standard' defaultValue={data.me.email} />
      </FormControl>

      <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.name}>
        <FormLabel mb={1} fontSize={14}>
          Nome
        </FormLabel>
        <Input
          border='1px solid'
          borderColor='gray.700'
          focusBorderColor='purple.600'
          bg='gray.900'
          size='sm'
          variant='outline'
          color='white'
          {...methods.register('name')}
        />
        <FormErrorMessage>{data.errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type='submit'
        mt='20px'
        w='100px'
        size='sm'
        borderColor='gray.700'
        fontWeight='normal'
        _hover={{
          bg: 'purple.400',
        }}
        bg='purple.600'
        color='white'
        isLoading={data.isSubmitting}
      >
        {data.isSubmitting ? 'ENVIANDO...' : 'SALVAR'}
      </Button>
      {/* <Button
        variant='ghost'
        mt='20px'
        w='100px'
        size='sm'
        borderColor='gray.700'
        fontWeight='normal'
        _hover={{
          bg: 'red.800',
          color: 'white',
        }}
        color='red.500'
      >
        deletar conta
      </Button> */}
    </Flex>
  );
};

export default UserDataView;
