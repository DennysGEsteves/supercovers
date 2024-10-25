import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import Image from 'next/legacy/image';

import logic from './Title.logic';

const PlayerVideoTitle: NextPage = () => {
  const { player } = logic();

  if (!player.videoPlaying) return <Flex align='center' w='33%' />;

  return (
    <Flex align='center' w='33%'>
      <Box mr={3} width='57px' height='32px'>
        <Image
          src={`https://i.ytimg.com/vi/${player.videoPlaying.platformId}/mqdefault.jpg`}
          alt={`${player.videoPlaying.cover.coverArtist.name} - ${player.videoPlaying.cover.coverSong.name}`}
          width={57}
          height={32}
        />
      </Box>
      <Box lineHeight='17px'>
        <Text fontSize='14px' color='white'>
          {player.videoPlaying.cover.coverArtist.name} - {player.videoPlaying.cover.coverSong.name}
        </Text>
        <Text fontSize='11px'>
          <NextLink href={`/sa/${player.videoPlaying.artist.slug}`}>{player.videoPlaying.artist.user.name}</NextLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default PlayerVideoTitle;
