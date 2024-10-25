/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from '@chakra-ui/react';

import { AddPlaylistVideoBtnProps } from './AddPlaylistVideoBtn.props';
import { AddPlaylistVideoModalProps } from './AddPlaylistVideoModal/AddPlaylistVideoModal.props';

const logic = (props: AddPlaylistVideoBtnProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { video } = props;

  return {
    modal: {
      isModalOpen: isOpen,
      closeModal: onClose,
      video,
    } as AddPlaylistVideoModalProps,
    methods: {
      openModal: onOpen,
    },
  };
};

export default logic;
