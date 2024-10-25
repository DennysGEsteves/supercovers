/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NextPage } from 'next';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  Select,
  Divider,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { Steps, Step } from 'chakra-ui-steps';

// import { PlatformEnum } from 'types';

import { SearchCoverArtistInput } from 'components/SearchCoverArtistInput';
import { SearchCoverSongsInput } from 'components/SearchCoverSongsInput';
import { SONG_STYLES_OPTIONS } from 'utils/song-styles';

import { UpsertModalProps } from './UpsertModal.props';
import logic from './UpsertModal.logic';
import { StepperCSS } from './UpsertModal.style';

const UpsertVideo: NextPage<UpsertModalProps> = (props: any) => {
  const { data, methods } = logic(props);

  return (
    <Modal
      isOpen={data.isModalOpen}
      onClose={methods.closeModal}
      isCentered
      size='xl'
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg='gray.800' as='form' onSubmit={methods.handleSubmit(methods.submit)} sx={{ minHeight: '600px' }}>
        <ModalHeader color='white'>Cadastrar Video</ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody color='white'>
          <Steps size='sm' variant='circles-alt' colorScheme='purple' activeStep={data.activeStep} sx={StepperCSS}>
            <Step label='Passo 1 - Informações do vídeo' key='step1'>
              <Divider borderColor='#333' mt={5} />
              <Flex w='100%' mt={10} flexDir='column' align='center'>
                {/* <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.platform}>
              <FormLabel>Plataforma</FormLabel>
              <Controller
                name='platform'
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
                    value={`${value}`}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder=' '
                    sx={{
                      option: {
                        color: 'black',
                      },
                    }}
                  >
                    {Object.keys(PlatformEnum).map((platform) => (
                      <option key={platform} value='youtube'>
                        {platform}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {!!data.errors.platform && <FormErrorMessage>{data.errors.platform.message}</FormErrorMessage>}
            </FormControl> */}
                <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.platformId}>
                  <FormLabel>Youtube ID</FormLabel>
                  <Controller
                    name='platformId'
                    control={data.control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        border='1px solid'
                        borderColor='gray.700'
                        focusBorderColor='purple.600'
                        bg='gray.900'
                        size='sm'
                        variant='outline'
                        color='white'
                        value={value || ''}
                        onBlur={onBlur}
                        onChange={onChange}
                      />
                    )}
                  />
                  {!!data.errors.platformId && <FormErrorMessage>{data.errors.platformId.message}</FormErrorMessage>}
                </FormControl>
                <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.artistName}>
                  <Flex align='end' w='100%' gap={5}>
                    <Box flex={1}>
                      <FormLabel>Nome do artista do cover</FormLabel>
                      <Controller
                        name='artistName'
                        control={data.control}
                        rules={{ required: true }}
                        render={({ field: { value, onBlur, onChange } }) => (
                          <SearchCoverArtistInput value={value} onBlur={onBlur} onChange={onChange} />
                        )}
                      />
                    </Box>
                    <Button
                      size='sm'
                      type='button'
                      w='120px'
                      colorScheme='purple'
                      onClick={() => methods.searchCoverArtistSongs()}
                    >
                      buscar músicas
                    </Button>
                  </Flex>
                  {!!data.errors.artistName && <FormErrorMessage>{data.errors.artistName.message}</FormErrorMessage>}
                </FormControl>
                <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.songTitle}>
                  <FormLabel>Nome da música do cover</FormLabel>
                  <Controller
                    name='songTitle'
                    control={data.control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <SearchCoverSongsInput
                        artistName={data.artistName}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                  {!!data.errors.songTitle && <FormErrorMessage>{data.errors.songTitle.message}</FormErrorMessage>}
                </FormControl>
              </Flex>
            </Step>
            <Step label='Passo 2 - Informações do cover' key='step2'>
              <Divider borderColor='#333' mt={5} />
              <Box mt={10}>
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
                        value={`${value || 'vocal'}`}
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
            </Step>
          </Steps>
        </ModalBody>
        <ModalFooter justifyContent='space-between'>
          <Box>
            {data.videoId && (
              <Button
                size='sm'
                w='100px'
                colorScheme='red'
                disabled={data.isDeleting}
                onClick={() => methods.deleteVideo()}
                isLoading={data.isDeleting}
              >
                deletar
              </Button>
            )}
          </Box>
          <Box>
            <Button
              variant='ghost'
              disabled={data.isDeleting}
              size='sm'
              w='100px'
              colorScheme='purple'
              mr={3}
              onClick={methods.closeModal}
            >
              Cancelar
            </Button>
            {data.activeStep === 0 && data.enableStep2 && (
              <Button onClick={methods.nextStep} size='sm' type='button' w='100px' colorScheme='blue' variant='outline'>
                Próximo
              </Button>
            )}
            {data.activeStep === 1 && (
              <>
                <Button
                  mr={4}
                  onClick={methods.prevStep}
                  size='sm'
                  disabled={data.isDeleting}
                  type='button'
                  w='100px'
                  colorScheme='purple'
                  variant='outline'
                >
                  Voltar
                </Button>
                <Button size='sm' disabled={data.isDeleting} type='submit' w='100px' colorScheme='purple'>
                  SALVAR
                </Button>
              </>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default UpsertVideo;
