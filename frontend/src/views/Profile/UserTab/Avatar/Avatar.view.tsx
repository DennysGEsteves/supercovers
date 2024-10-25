import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Avatar as UserAvatar,
} from '@chakra-ui/react';
import { NextPage } from 'next';

import envs from 'config/environment';

import logic from './Avatar.logic';
import { AvatarCropView } from './Crop';

const UserAvatarView: NextPage = () => {
  const { data, methods } = logic();

  if (!data.me) return null;

  return (
    <>
      <input accept='image/*' type='file' onChange={methods.setPic} style={{ display: 'none' }} ref={data.picRef} />
      <UserAvatar
        size='2xl'
        onClick={() => data?.picRef?.current?.click()}
        src={data.imgBin || `${envs.apiBaseUrl}/users/avatar/${data.me.id}`}
        marginRight='30px'
        border='2px solid'
        borderColor='gray.900'
        cursor='pointer'
        _hover={{
          border: '2px solid',
          borderColor: 'purple.600',
        }}
      />

      <Modal isOpen={data.isOpen} onClose={methods.onClose}>
        <ModalOverlay />
        <ModalContent mt='100px'>
          <ModalHeader>Escolha seu avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign='center'>
            <AvatarCropView upImg={data.cropBase64} onCompleteCrop={(blob: Blob) => methods.onCompleteCrop(blob)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserAvatarView;
