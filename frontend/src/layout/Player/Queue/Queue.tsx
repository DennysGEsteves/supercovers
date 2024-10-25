/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { BsTrash, BsX } from 'react-icons/bs';

import { Video } from 'types';

import logic from './Queue.logic';

const PlayerQueue: NextPage<any> = () => {
  const { player, controls, playlist } = logic();

  if (!player.playlistOpen) return null;

  return (
    <Box
      zIndex={99999999999}
      h='500px'
      w='400px'
      bg='gray.900'
      borderColor='gray.700'
      borderWidth='1px'
      borderRadius='2px'
      opacity={player.playlistOpen ? '1' : '0'}
      transition='opacity 500ms ease'
    >
      <Flex
        color='white'
        justifyContent='space-between'
        alignItems='flex-start'
        borderBottom='1px solid'
        pb={3}
        borderColor='gray.700'
        padding={5}
      >
        <Text as='h4' fontWeight='bold'>
          Fila de músicas
        </Text>
        <Flex w='40px' justifyContent='space-between' alignItems='center'>
          <Icon
            aria-label=''
            ml='0px'
            h='15px'
            w='15px'
            p={0}
            bg='transparent'
            color='white'
            as={BsTrash}
            cursor='pointer'
            title='Limpar lista'
            onClick={() => playlist.cleanPlaylist()}
          />
          <Icon
            aria-label=''
            ml='0px'
            h='15px'
            w='15px'
            p={0}
            bg='transparent'
            color='white'
            as={BsX}
            cursor='pointer'
            onClick={() => controls.setPlaylistOpen(false)}
          />
        </Flex>
      </Flex>
      <Box overflow='auto' h='430px'>
        {player.playlist.map((video: Video, i: number) => (
          <Flex
            align='center'
            w='100%'
            key={`${video.id}_${i}`}
            bg={player.playlistVideoIndex === i ? 'purple.900' : 'gray.900'}
            padding={3}
            onClick={() => {
              playlist.setPlaylistVideoIndex(i);
              controls.play(video);
            }}
            cursor='pointer'
          >
            <Box mr={3} width='57px' height='32px'>
              <Image
                src={`https://i.ytimg.com/vi/${video.platformId}/mqdefault.jpg`}
                alt={`${video.cover.coverArtist.name} - ${video.cover.coverSong.name}`}
                width='57px'
                height='32px'
              />
            </Box>
            <Box lineHeight='17px'>
              <Text fontSize='14px' color='white'>
                {video.cover.coverArtist.name} - {video.cover.coverSong.name}
              </Text>
              <Text fontSize='11px'>{video.artist.user.name}</Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default PlayerQueue;
