import React from 'react';
import { NextPage } from 'next';
import { Flex, Heading } from '@chakra-ui/react';

import { Video } from 'components/Video';
import { VideosListWithCat } from 'components';

import { ArtistVideosProps } from './Artist.props';

const Videos: NextPage<ArtistVideosProps> = ({ videos }) => {
  if (!videos.allVideos.length) {
    return (
      <Flex direction='column' justify='center' align='center' mt={10} w='full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='64'
          height='64'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-radio'
        >
          <circle cx='12' cy='12' r='2' />
          <path d='M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14' />
        </svg>
        <p>Este artista ainda não possui vídeos cadastrados</p>
        <br />
      </Flex>
    );
  }

  return (
    <Flex direction='column'>
      <VideosListWithCat videos={videos.top10} title='Top 10 mais tocadas' hideArtist />
      <Heading as='h3' color='white' fontSize='18px' mb={3} mt={10}>
        Todos os vídeos
      </Heading>
      <Flex direction='row' gap={7} flexWrap='wrap'>
        {videos.allVideos.map((video) => (
          <Video key={video.id} video={video} hideArtist />
        ))}
      </Flex>
    </Flex>
  );
};
export default Videos;
