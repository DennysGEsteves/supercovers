import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { NextPage } from 'next';
import { BsFillPlayFill, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs';

import logic from './CenterControls.logic';

const PlayerCenterControls: NextPage<any> = () => {
  const { player, controls } = logic();

  if (!player.videoPlaying) return null;

  return (
    <Flex align='center' gap={4} w='33%' justifyContent='center'>
      <Icon
        aria-label=''
        h='15px'
        w='15px'
        color='white'
        as={BsFillSkipStartFill}
        cursor='pointer'
        onClick={() => controls.prevTrack()}
      />
      <Flex
        cursor='pointer'
        borderRadius='50%'
        h='35px'
        w='35px'
        bg='purple.500'
        align='center'
        justify='center'
        onClick={() => {
          if (player.isPlaying) {
            controls.pause();
          } else {
            controls.resume();
          }
        }}
      >
        {player.isPlaying ? (
          <Icon aria-label='' ml='0px' h='25px' w='25px' p={0} bg='transparent' color='white' as={BsFillPauseFill} />
        ) : (
          <Icon aria-label='' ml='2px' h='22px' w='22px' p={0} bg='transparent' color='white' as={BsFillPlayFill} />
        )}
      </Flex>
      <Icon
        aria-label=''
        h='15px'
        w='15px'
        color='white'
        as={BsFillSkipEndFill}
        cursor='pointer'
        onClick={() => controls.nextTrack()}
      />
      {/* <Icon aria-label='' h='15px' w='15px' color='white' as={BsShuffle} cursor="pointer" /> */}
    </Flex>
  );
};

export default PlayerCenterControls;
