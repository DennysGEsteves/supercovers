import React from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { NextPage } from 'next';

import logic from './ProgressBar.logic';

const PlayerProgressBar: NextPage = () => {
  const { player, methods } = logic();

  if (!player.videoPlaying) return null;

  return (
    <Box position='absolute' bottom='44px' zIndex={999999999} w='100%'>
      <Slider
        value={player.time.percent}
        w='100%'
        onChange={(val) => {
          methods.onSeek(val);
        }}
      >
        <SliderTrack bg='gray.500' h='2px'>
          <SliderFilledTrack bg='purple.600' />
        </SliderTrack>
        <SliderThumb h='8px' w='7px' boxShadow='none !important' />
      </Slider>
    </Box>
  );
};
export default PlayerProgressBar;
