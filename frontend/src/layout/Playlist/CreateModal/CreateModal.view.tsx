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
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import logic from './CreateModal.logic';
import { CreatePlaylistModalProps } from './CreateModal.props';

const CreatePlaylistModal: NextPage<CreatePlaylistModalProps> = (props) => {
  const { data, methods } = logic(props);

  return (
    <Modal isOpen={data.isModalOpen} onClose={methods.closeModal} isCentered size='3xl'>
      <ModalOverlay />
      <ModalContent bg='gray.800' as='form' onSubmit={methods.handleSubmit(methods.submit)}>
        <ModalHeader color='white'>Criar Playlist de músicas</ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody color='white'>
          <Flex w='100%' mt={10} flexDir='column' align='center'>
            <FormControl maxWidth='700px' mb='40px' isInvalid={!!data.errors?.name}>
              <FormLabel>Nome da playlist</FormLabel>
              <Controller
                name='name'
                control={data.control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    focusBorderColor='purple.600'
                    size='sm'
                    variant='flushed'
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
            <FormControl maxWidth='700px' mb='20px' isInvalid={!!data.errors?.description}>
              <FormLabel>Descrição</FormLabel>
              <Controller
                name='description'
                control={data.control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    focusBorderColor='purple.600'
                    size='sm'
                    variant='flushed'
                    color='white'
                    bg='gray.900'
                    value={`${value || ''}`}
                    onBlur={onBlur}
                    onChange={onChange}
                    px={2}
                  />
                )}
              />
              {!!data.errors.description && <FormErrorMessage>{data.errors.description.message}</FormErrorMessage>}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent='space-between'>
          <Box>
            <Button variant='ghost' size='sm' w='100px' colorScheme='purple' mr={3} onClick={methods.closeModal}>
              Cancelar
            </Button>
            <Button size='sm' type='submit' w='100px' colorScheme='purple'>
              SALVAR
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreatePlaylistModal;
