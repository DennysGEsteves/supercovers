import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';

import logic from './Player.logic';
import CenterControls from './CenterControls/CenterControls';
import Video from './Video/Video';
import Queue from './Queue/Queue';
import ProgressBar from './ProgressBar/ProgressBar';
import VideoTitle from './Title/Title';
import RightControls from './RightControls/RightControls';

const Player: NextPage = () => {
  const { player } = logic();

  if (!player.visible) return null;

  return (
    <Box
      display={player.visible ? 'block' : 'none'}
      position='fixed'
      borderTop='1px solid'
      bottom={0}
      zIndex={99999}
      h='55px'
      w='100%'
      padding='10px 20px 3px 10px'
      bg='gray.900'
      borderColor='gray.500'
      color='gray'
    >
      <ProgressBar />
      <Flex justify='space-between'>
        <VideoTitle />
        <CenterControls />
        <RightControls />
      </Flex>
      <Flex justify='end' gap={7} position='absolute' bottom='70px' alignItems='end' right='20px' h={0}>
        <Queue />
        <Video />
      </Flex>
    </Box>
  );
};

export default Player;
