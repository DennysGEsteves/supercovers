import React from 'react';
import { NextPage } from 'next';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import logic from './AddPlaylistVideoModal.logic';
import { AddPlaylistVideoModalProps } from './AddPlaylistVideoModal.props';

const AddPlaylistVideoModal: NextPage<AddPlaylistVideoModalProps> = (props) => {
  const { data, methods } = logic(props);

  return (
    <Modal isOpen={data.isModalOpen} onClose={methods.closeModal} isCentered size='3xl'>
      <ModalOverlay />
      <ModalContent bg='gray.800' as='form' onSubmit={methods.handleSubmit(methods.submit)}>
        <ModalHeader color='white'>Adicione este vídeo à uma playlist</ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody color='white'>
          <Flex w='100%' mt={10} flexDir='column' align='center'>
            <FormControl maxWidth='700px' mb='40px' isInvalid={!!data.errors?.playlistId}>
              <FormLabel>Selecione a playlist</FormLabel>
              <Controller
                name='playlistId'
                control={data.control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    size='lg'
                    value={`${value}`}
                    onChange={onChange}
                    onBlur={onBlur}
                    bg='#111'
                    color='white'
                    placeholder=' '
                  >
                    {data.playlists.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {!!data.errors.playlistId && <FormErrorMessage>{data.errors.playlistId.message}</FormErrorMessage>}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent='space-between'>
          <Box>
            <Button variant='ghost' size='sm' w='100px' colorScheme='purple' mr={3} onClick={methods.closeModal}>
              Cancelar
            </Button>
            <Button size='sm' type='submit' w='100px' colorScheme='purple'>
              ADICIONAR
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddPlaylistVideoModal;
