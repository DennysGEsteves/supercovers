import { NextPage } from 'next';
import React from 'react';
import { Box, Flex, FormLabel, Select } from '@chakra-ui/react';

import { Padding } from 'layout';

import logic from './Search.logic';
import SearchByCoverArtist from './CoverArtist/SearchByCoverArtist.view';
import SearchSuperArtists from './SuperArtist/SearchSuperArtist.view';
import SearchByCoverSong from './CoverSong/SearchByCoverSong.view';
import SearchTags from './Tags/Tags.view';

const Search: NextPage = () => {
  const { data, methods } = logic();

  return (
    <Padding>
      <Flex flexDir='column' align='center' justify='center'>
        <Box mb='20px' w='30vw'>
          <FormLabel>Quero buscar:</FormLabel>
          <Select
            border='1px solid'
            borderColor='gray.700'
            focusBorderColor='purple.600'
            bg='gray.900'
            size='sm'
            variant='outline'
            color='white'
            value={`${data.searchTypeValue}`}
            placeholder='Escolha uma opção'
            onChange={(e) => methods.setSearchTypeValue(e.target.value)}
            sx={{
              option: {
                color: 'black',
              },
            }}
          >
            <option key='superArtist' value='superArtist'>
              Super Artista
            </option>
            <option key='coverArtist' value='coverArtist'>
              Todos os covers de um artista
            </option>
            <option key='coverSong' value='coverSong'>
              Todos os covers de uma música específica
            </option>
            <option key='tags' value='tags'>
              Filtrar pelas características
            </option>
          </Select>
        </Box>
      </Flex>
      {data.searchTypeValue === 'superArtist' && <SearchSuperArtists />}
      {data.searchTypeValue === 'coverArtist' && <SearchByCoverArtist />}
      {data.searchTypeValue === 'coverSong' && <SearchByCoverSong />}
      {data.searchTypeValue === 'tags' && <SearchTags />}
    </Padding>
  );
};

export default Search;
