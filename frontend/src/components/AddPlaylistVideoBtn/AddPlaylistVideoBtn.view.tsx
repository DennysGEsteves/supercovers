/* eslint-disable import/no-unresolved */
import React from 'react';
import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import { AddPlaylistVideoBtnProps } from './AddPlaylistVideoBtn.props';
import logic from './AddPlaylistVideoBtn.logic';
import AddPlaylistVideoModal from './AddPlaylistVideoModal/AddPlaylistVideoModal.view';

const AddPlaylistVideoBtn: NextPage<AddPlaylistVideoBtnProps> = (props) => {
  const { modal, methods } = logic(props);

  return (
    <>
      <Box
        onClick={() => {
          methods.openModal();
        }}
      >
        Adicionar à uma playlist
      </Box>
      <AddPlaylistVideoModal {...modal} />
    </>
  );
};

export default AddPlaylistVideoBtn;
