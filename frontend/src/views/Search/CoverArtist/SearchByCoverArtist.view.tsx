import { NextPage } from 'next';
import React from 'react';
import { Box, Button, Flex, FormLabel, Heading } from '@chakra-ui/react';

import { SearchCoverArtistInput } from 'components/SearchCoverArtistInput';
import { VideosListWithCat } from 'components';

import logic from './SearchByCoverArtist.logic';

const SearchByCoverArtist: NextPage = () => {
  const { data, methods } = logic();

  return (
    <>
      <Flex flexDir='column' align='center' justify='center'>
        <Box mb='20px' w='30vw'>
          <FormLabel>Nome do Artista</FormLabel>
          <SearchCoverArtistInput value={data.coverArtist} onChange={methods.setCoverArtist} />
        </Box>
        <Button size='sm' w='100px' mt={10} colorScheme='purple' onClick={methods.submit}>
          BUSCAR
        </Button>
        <Heading size='lg' my={8} borderBottom='1px solid'>
          Resultado:
        </Heading>
        {data.result && !data.result.length && <>Vídeos não encontrados com esse artista</>}
      </Flex>
      {data.result?.map((result) => (
        <Flex key={result.songTitle} direction='column' gap={10}>
          <VideosListWithCat videos={result.videos} title={result.songTitle} />
        </Flex>
      ))}
    </>
  );
};

export default SearchByCoverArtist;
