/* eslint-disable import/no-cycle */
import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Flex, Icon } from '@chakra-ui/react';
import Image from 'next/legacy/image';
import { IoIosMusicalNotes } from 'react-icons/io';

import { PlayBtn } from 'components/PlayBtn';
import usePlayer from 'hooks/usePlayer';
import FavoriteBtn from 'components/FavoriteBtn/FavoriteBtn';
import { VideoMenu } from 'components/VideoMenu';

import { VideoProps } from './Video.props';

const Video: NextPage<VideoProps> = ({ video, hideBtns, onVideoClick, hideArtist, hideCoverArtist }) => {
  const { controls, player } = usePlayer();

  return (
    <Box role='group' position='relative' onClick={() => onVideoClick && onVideoClick(video)}>
      <Box
        borderRadius='10px'
        width={255}
        height={138}
        position='relative'
        _groupHover={{
          filter: 'brightness(0.5)',
          transition: 'filter 200ms ease',
        }}
      >
        <Image
          src={`https://i.ytimg.com/vi/${video.platformId}/mqdefault.jpg`}
          alt={`${video.cover.coverArtist.name} - ${video.cover.coverSong.name}`}
          layout='fill'
        />
      </Box>
      {!hideBtns && (
        <Flex
          align='center'
          role='group'
          position='absolute'
          top='0px'
          left='0px'
          w={255}
          height={143}
          textAlign='center'
          color='#FFF'
          justify='space-evenly'
          padding={5}
          opacity='1'
          _groupHover={{
            transition: 'opacity 800ms ease',
            opacity: '1',
          }}
        >
          <FavoriteBtn videoId={video.id} />
          <Box>
            <PlayBtn
              onClick={() => {
                if (player?.videoPlaying?.id === video.id) {
                  if (player?.videoPlaying) {
                    if (player.isPlaying) {
                      controls.pause();
                    } else {
                      controls.resume();
                    }
                  } else {
                    controls.play(video);
                  }
                } else {
                  controls.play(video);
                }
              }}
              playing={player?.videoPlaying?.id === video.id && player.isPlaying}
            />
          </Box>
          <Box>
            <VideoMenu video={video} />
          </Box>
        </Flex>
      )}
      <Flex direction='column' mt={1}>
        <Box
          sx={{
            maxWidth: '265px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontSize: '.9375rem',
            fontWeight: '600',
            letterSpacing: '0',
            color: '#AAA',
            marginBottom: '2px',
          }}
          title={`${hideCoverArtist ? '' : `${video.cover.coverArtist.name} - `} ${video.cover.coverSong.name}`}
        >
          {hideCoverArtist ? '' : `${video.cover.coverArtist.name} - `} {video.cover.coverSong.name}
        </Box>
        {!hideArtist && (
          <Box
            fontSize='.8125rem'
            lineHeight='1.25'
            mb='2px'
            color='gray.400'
            _hover={{
              color: 'purple.500',
              fontWeight: 'bold',
            }}
          >
            <NextLink href={`/sa/${video.artist.slug}`} style={{ textShadow: 'none' }}>
              {video.artist.user.name}
            </NextLink>
          </Box>
        )}
        <Flex
          fontSize='.8rem'
          fontStyle='italic'
          fontWeight='400'
          letterSpacing={0}
          color='gray.400'
          align='center'
          justify='start'
        >
          <Icon as={IoIosMusicalNotes} fontSize='17px' mr={1} />
          {video.views || '0'}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Video;
