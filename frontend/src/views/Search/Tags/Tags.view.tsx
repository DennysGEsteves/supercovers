import { NextPage } from 'next';
import React from 'react';
import { Flex, FormControl, FormErrorMessage, FormLabel, Button, Select, Heading, Box } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { SONG_STYLES_OPTIONS } from 'utils/song-styles';
import { Video } from 'components/Video';

import logic from './Tags.logic';

const SearchTags: NextPage = () => {
  const { data, methods } = logic();

  return (
    <>
      <Flex flexDir='column' align='center' justify='center' as='form' onSubmit={methods.handleSubmit(methods.submit)}>
        <Box mb='20px' w='30vw'>
          <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.instrumentalOrVocal}>
            <FormLabel>Essa cover é vocal ou instrumental?</FormLabel>
            <Controller
              name='instrumentalOrVocal'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  border='1px solid'
                  borderColor='gray.700'
                  focusBorderColor='purple.600'
                  bg='gray.900'
                  size='sm'
                  variant='outline'
                  color='white'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder=' '
                  sx={{
                    option: {
                      color: 'black',
                    },
                  }}
                >
                  <option key='vocal' value='vocal'>
                    Vocal
                  </option>
                  <option key='instrumental' value='instrumental'>
                    Instrumental
                  </option>
                </Select>
              )}
            />
            {!!data.errors.instrumentalOrVocal && (
              <FormErrorMessage>{data.errors.instrumentalOrVocal.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.songStyle}>
            <FormLabel>Qual o estilo da música do cover?</FormLabel>
            <Controller
              name='songStyle'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  border='1px solid'
                  borderColor='gray.700'
                  focusBorderColor='purple.600'
                  bg='gray.900'
                  size='sm'
                  variant='outline'
                  color='white'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder=' '
                  sx={{
                    option: {
                      color: 'black',
                    },
                  }}
                >
                  {SONG_STYLES_OPTIONS.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </Select>
              )}
            />
            {!!data.errors.songStyle && <FormErrorMessage>{data.errors.songStyle.message}</FormErrorMessage>}
          </FormControl>
          <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.formation}>
            <FormLabel>Qual a formação dos integrantes neste cover?</FormLabel>
            <Controller
              name='formation'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  border='1px solid'
                  borderColor='gray.700'
                  focusBorderColor='purple.600'
                  bg='gray.900'
                  size='sm'
                  variant='outline'
                  color='white'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder=' '
                  sx={{
                    option: {
                      color: 'black',
                    },
                  }}
                >
                  <option key='banda' value='banda'>
                    Banda
                  </option>
                  <option key='dupla' value='dupla'>
                    Dupla
                  </option>
                  <option key='solo' value='solo'>
                    Solo
                  </option>
                </Select>
              )}
            />
            {!!data.errors.formation && <FormErrorMessage>{data.errors.formation.message}</FormErrorMessage>}
          </FormControl>
          <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.typeInstruments}>
            <FormLabel>Qual a tipo dos instrumentos tocados no cover?</FormLabel>
            <Controller
              name='typeInstruments'
              control={data.control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  border='1px solid'
                  borderColor='gray.700'
                  focusBorderColor='purple.600'
                  bg='gray.900'
                  size='sm'
                  variant='outline'
                  color='white'
                  value={`${value || ''}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder=' '
                  sx={{
                    option: {
                      color: 'black',
                    },
                  }}
                >
                  <option key='acustico' value='acustico'>
                    Acustico
                  </option>
                  <option key='convencional' value='convencional'>
                    Convencional
                  </option>
                </Select>
              )}
            />
            {!!data.errors.typeInstruments && (
              <FormErrorMessage>{data.errors.typeInstruments.message}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Button type='submit' size='sm' w='100px' mt={10} colorScheme='purple'>
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

export default SearchTags;
