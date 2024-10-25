import { Box, Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import NextLink from 'next/link';

import { Padding } from 'layout';

import { ArtistListProps } from './ArtistsList.props';

const AboutView: NextPage<ArtistListProps> = ({ data }) => (
  <Padding>
    <Flex gap={10} flexWrap='wrap'>
      {Object.keys(data.artists).map((letter) => (
        <Box key={letter} w='15%'>
          <Heading as='h5' size='md'>
            {letter}
          </Heading>
          {data.artists[letter].map((artist) => (
            <Box key={artist.slug} role='group'>
              <NextLink href={`/sa/${artist.slug}`} style={{ textShadow: 'none' }}>
                <Box
                  lineHeight='1.25'
                  mt={2}
                  color='gray.100'
                  _groupHover={{
                    color: 'purple.500',
                    fontWeight: 'bold',
                  }}
                >
                  {artist.name}
                </Box>
              </NextLink>
            </Box>
          ))}
        </Box>
      ))}
    </Flex>
  </Padding>
);

export default AboutView;
