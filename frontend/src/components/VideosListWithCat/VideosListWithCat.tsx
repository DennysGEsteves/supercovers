/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import { VideosProps } from './VideosListWithCat.props';
import { Video } from '../Video';

import 'react-indiana-drag-scroll/dist/style.css';

const VideosListWithCat: NextPage<VideosProps> = (props) => {
  const { title, videos, ...rest } = props;
  const scrollContainer = useScrollContainer();

  return (
    <Box w='75vw' mb={5}>
      {title && (
        <Heading as='h3' color='white' fontSize='18px' mb={3}>
          {title}
        </Heading>
      )}
      <Flex flexDirection='row' width='100%' overflowX='auto' ref={scrollContainer.ref} pb={5}>
        {videos.map((video) => (
          <Box mr={7} key={`${video.id}_${title}`}>
            <Video {...rest} video={video} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default VideosListWithCat;
