import { NextPage } from 'next';
import React from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Heading } from '@chakra-ui/react';

import { SearchCoverArtistInput } from 'components/SearchCoverArtistInput';
import { SearchCoverSongsInput } from 'components/SearchCoverSongsInput';
import { Video } from 'components/Video';

import logic from './SearchByCoverSong.logic';

const SearchByCoverSong: NextPage = () => {
  const { data, methods } = logic();

  return (
    <>
      <Flex flexDir='column' align='center' justify='center'>
        <Box mb='20px' w='30vw'>
          <FormControl maxWidth='600px' mb='20px'>
            <FormLabel>Nome do Artista</FormLabel>
            <Flex gap={5}>
              <Box w='100%'>
                <SearchCoverArtistInput value={data.coverArtist} onChange={methods.setCoverArtist} />
              </Box>
              <Button
                size='sm'
                type='button'
                w='150px'
                colorScheme='purple'
                onClick={() => methods.searchCoverArtistSongs()}
              >
                buscar músicas
              </Button>
            </Flex>
          </FormControl>
          <FormControl maxWidth='600px' mb='20px'>
            <FormLabel>Nome da música do cover</FormLabel>
            <SearchCoverSongsInput
              artistName={data.searchArtistSongs}
              onChange={methods.setCoverSong}
              value={data.coverSong}
            />
          </FormControl>
        </Box>
        <Button size='sm' w='100px' mt={10} colorScheme='purple' onClick={methods.submit}>
          BUSCAR
        </Button>
        <Heading size='lg' my={8} borderBottom='1px solid'>
          Resultado:
        </Heading>
        {data.result && !data.result.length && <>Vídeos não encontrados com esses dados</>}
      </Flex>
      {data.result?.length && (
        <Flex direction='row' gap={7} flexWrap='wrap'>
          {data.result.map((video) => (
            <Video key={video.id} video={video} hideArtist />
          ))}
        </Flex>
      )}
    </>
  );
};

export default SearchByCoverSong;
