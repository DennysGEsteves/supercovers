/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { NextPage } from 'next';
import { Avatar, Box, Flex, Heading, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoIosMusicalNotes } from 'react-icons/io';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import envs from 'config/environment';

import { ListStyle } from './Artist.styles';
import { ArtistListProps } from './ArtistListWithCat.props';

const ArtistListWithCat: NextPage<ArtistListProps> = ({ artists, title }) => {
  const scrollContainer = useScrollContainer();

  return (
    <Box w='75vw' sx={ListStyle} mb={5}>
      <Heading as='h3' color='white' fontSize='18px' mb={5}>
        {title}
      </Heading>
      <Flex flexDirection='row' width='100%' overflowX='auto' ref={scrollContainer.ref} pb={5}>
        {artists.map((artist) => {
          const { user, slug, views } = artist;

          return (
            <Box key={slug} mr={10}>
              <NextLink href={`/sa/${slug}`} style={{ textShadow: 'none' }}>
                <Box role='group' position='relative' cursor='pointer'>
                  <Box
                    _groupHover={{
                      filter: 'brightness(0.5)',
                      transition: 'filter 200ms ease',
                    }}
                  >
                    <Avatar boxSize='150px' src={`${envs.apiBaseUrl}/users/avatar/${artist.userId}`} />
                  </Box>
                  <Box textAlign='center'>
                    <Flex direction='column'>
                      <Box
                        fontSize='.8125rem'
                        lineHeight='1.25'
                        mt={5}
                        mb={1}
                        color='gray.100'
                        _groupHover={{
                          color: 'purple.500',
                          fontWeight: 'bold',
                        }}
                      >
                        {user.name}
                      </Box>
                      <Flex
                        fontSize='.8rem'
                        fontStyle='italic'
                        fontWeight='400'
                        letterSpacing={0}
                        color='gray.400'
                        align='center'
                        justify='center'
                      >
                        {views ? (
                          <>
                            <Icon as={IoIosMusicalNotes} fontSize='17px' mr={1} />
                            {views || '0'}
                          </>
                        ) : null}
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </NextLink>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ArtistListWithCat;
