import React from 'react';
import { Box, Flex, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { NextPage } from 'next';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsFullscreen, BsMusicNoteList } from 'react-icons/bs';
import { TbArrowsMaximize } from 'react-icons/tb';

import FavoriteBtn from 'components/FavoriteBtn/FavoriteBtn';

import logic from './RightControls.logic';

const PlayerRightControls: NextPage<any> = () => {
  const { player, methods, controls } = logic();

  if (!player.videoPlaying) return null;

  return (
    <Flex align='center' gap={6} w='33%' justifyContent='flex-end'>
      <Box fontSize='13px'>
        {player.time.current} / {player.time.total}
      </Box>
      <Icon
        cursor='pointer'
        h='18px'
        w='18px'
        color='white'
        as={player.isMuted ? BsFillVolumeMuteFill : BsFillVolumeUpFill}
        onClick={() => methods.onChangeMuted()}
      />
      <Slider
        aria-label='slider-ex-1'
        value={player.isMuted ? 0 : player.volume}
        w='70px'
        onChange={(val) => {
          methods.onChangeVolume(val);
        }}
      >
        <SliderTrack bg='gray.500' h='2px'>
          <SliderFilledTrack bg='white' />
        </SliderTrack>
        <SliderThumb h='8px' w='7px' boxShadow='none !important' />
      </Slider>
      <FavoriteBtn videoId={player.videoPlaying.id} size='15px' />
      {player.isMinimized ? (
        <Icon
          aria-label=''
          h='15px'
          w='15px'
          color='white'
          as={TbArrowsMaximize}
          cursor='pointer'
          onClick={controls.toggleVideoSize}
        />
      ) : (
        <Icon
          aria-label=''
          h='15px'
          w='15px'
          color='white'
          as={BsFullscreen}
          cursor='pointer'
          onClick={controls.fullScreen}
        />
      )}
      <Icon
        aria-label=''
        h='15px'
        w='15px'
        color='white'
        as={BsMusicNoteList}
        cursor='pointer'
        onClick={() => controls.setPlaylistOpen(!player.playlistOpen)}
      />
    </Flex>
  );
};

export default PlayerRightControls;
