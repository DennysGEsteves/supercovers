/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { NextPage } from 'next';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/legacy/image';
import NextLink from 'next/link';

import { Padding } from 'layout/Padding';
import { PlayBtn, VideoMenu } from 'components';
import usePlayer from 'hooks/usePlayer';

import { PlaylistVideosProps } from './Playlist.props';

const PlaylistVideos: NextPage<PlaylistVideosProps> = ({ playlist }) => {
  const { player, controls } = usePlayer();

  if (!playlist) return null;

  return (
    <Padding>
      <Box w='100%'>
        {playlist.videos.map((video) => (
          <Flex key={video.id} justify='space-between' borderBottom='1px solid #222' py={2} alignItems='center'>
            <Box flex={0.3}>
              <Box width='45px' height='25px'>
                <Image
                  src={`https://i.ytimg.com/vi/${video.platformId}/mqdefault.jpg`}
                  alt={`${video.cover.coverArtist.name} - ${video.cover.coverSong.name}`}
                  width={57}
                  height={32}
                />
              </Box>
            </Box>
            <Box flex={3} color='#FFF' fontWeight={500}>
              {video.cover.coverArtist.name} - {video.cover.coverSong.name}
            </Box>
            <Box flex={2} color='#FFF' fontWeight={200}>
              <NextLink href={`/sa/${video.artist.slug}`}>{video.artist.user.name}</NextLink>
            </Box>
            <Box
              flex={1}
              textAlign='right'
              sx={{
                '& button': {
                  width: '20px',
                },
              }}
            >
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
                iconSettings={{
                  color: 'white',
                  h: '30px',
                  w: '30px',
                  bg: 'transparent',
                }}
              />
            </Box>
            <Box flex={1} textAlign='right'>
              <VideoMenu video={video} verticalIcon inPlaylist />
            </Box>
          </Flex>
        ))}
      </Box>
    </Padding>
  );
};

export default PlaylistVideos;
