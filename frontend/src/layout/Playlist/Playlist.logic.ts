/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useRepository, useUser } from 'hooks';

import { CreatePlaylistModalProps } from './CreateModal/CreateModal.props';

const logic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { playlistRepository } = useRepository();
  const { me, setMe } = useUser();

  useEffect(() => {
    if (me) {
      playlistRepository.getAllUserPlaylists().then(({ data }) => {
        setMe({
          ...me,
          playlists: data,
        });
      });
    }
  }, [me?.id]);

  return {
    data: {
      playlists: me?.playlists || [],
      isLogged: !!me?.id,
    },
    modal: {
      isModalOpen: isOpen,
      closeModal: onClose,
    } as CreatePlaylistModalProps,
    methods: {
      openModal: onOpen,
    },
  };
};

export default logic;
