import { NextPage } from 'next';
import React from 'react';
import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';

import { ArtistListWithCat } from 'components';

import logic from './SearchSuperArtist.logic';

const SearchSuperArtists: NextPage = () => {
  const { data, methods } = logic();

  return (
    <>
      <Flex flexDir='column' align='center' justify='center'>
        <Box mb='20px' w='30vw'>
          <FormLabel>Nome do Super Artista</FormLabel>
          <Input
            border='1px solid'
            borderColor='gray.700'
            focusBorderColor='purple.600'
            bg='gray.900'
            size='sm'
            variant='outline'
            color='white'
            value={data.superArtist}
            onBlur={(e) => methods.setSuperArtist(e.target.value)}
            onChange={(e) => methods.setSuperArtist(e.target.value)}
          />
        </Box>
        <Button size='sm' w='100px' mt={10} colorScheme='purple' onClick={methods.submit}>
          BUSCAR
        </Button>
        <Heading size='lg' my={8} borderBottom='1px solid'>
          Resultado:
        </Heading>
        {data.result && !data.result.length && <>Vídeos não encontrados com esse artista</>}
      </Flex>
      {data.result && (
        <Flex direction='column' gap={10}>
          <ArtistListWithCat artists={data.result} title='Artistas' />
        </Flex>
      )}
    </>
  );
};

export default SearchSuperArtists;
