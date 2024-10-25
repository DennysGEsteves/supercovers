import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import ReactPlayer from 'react-player';
import { LiaWindowMinimize } from 'react-icons/lia';

import logic from './Video.logic';

const PlayerVideo: NextPage<any> = () => {
  const { player, methods, controls } = logic();

  if (!player.ref || !player.videoPlaying) return null;

  return (
    <Flex
      sx={{
        zIndex: 99999999999,
        flexDirection: 'column',
        alignItems: 'end',
        gap: 3,
      }}
    >
      <Box
        onClick={controls.toggleVideoSize}
        sx={{
          cursor: 'pointer',
          padding: 0,
          _hover: {
            color: '#999',
          },
        }}
      >
        {!player.isMinimized && <LiaWindowMinimize size={25} />}
      </Box>

      <ReactPlayer
        ref={player.ref}
        url={`https://www.youtube.com/watch?v=${player.videoPlaying.platformId}`}
        height={player.isMinimized ? '0' : '200px'}
        width='356px'
        playing={player.isPlaying}
        volume={player.isMuted ? 0 : player.volume / 100}
        onDuration={methods.onChangeDuration}
        onProgress={methods.onChangeProgress}
        onEnded={methods.onEnded}
        onPlay={methods.onResume}
        onPause={methods.onPause}
      />
    </Flex>
  );
};

export default PlayerVideo;
