import { Box, Flex, Heading, Icon, Link, Text, Divider, Avatar } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { RiGlobalLine } from 'react-icons/ri';
import { IoIosMusicalNotes } from 'react-icons/io';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

import envs from 'config/environment';

import { ArtistTopProps } from './Artist.props';

const ArtistTop: NextPage<ArtistTopProps> = ({ artist }) => {
  const [topImgUrl, setTopImgUrl] = useState(`${envs.apiBaseUrl}/artists/top-img/${artist.slug}`);
  console.log(topImgUrl);
  return (
    <>
      <Box
        w='100%'
        h='450px'
        position='relative'
        overflow='hidden'
        sx={{
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background:
              '-webkit-linear-gradient(top, rgba(22,22,24,0) 0%,rgba(22,22,24,0.8) 50%,rgba(22,22,24,1) 100%)',
            height: 300,
          },
        }}
      >
        <Box
          sx={{
            '& img': {
              filter: 'brightness(0.5)',
            },
          }}
        >
          <Image
            className='artist-img-top'
            objectFit='fill'
            layout='fill'
            onError={() => setTopImgUrl('/img/artist-top.png')}
            src={topImgUrl}
            alt={artist.user.name}
          />
        </Box>
        <Box px='310px' pt='2rem' position='absolute' bottom='30px' zIndex={2} color='white'>
          <Flex alignItems='center'>
            <Avatar size='2xl' src={`${envs.apiBaseUrl}/users/avatar/${artist.user.id}`} marginRight='30px' />
            <Box>
              <Heading as='h1' fontSize='3rem' pt='60px'>
                {artist.user.name}
              </Heading>
              <Box color='rgba(255,255,255,.5)' mb='30px'>
                {artist.about}
              </Box>
              <Flex align='center'>
                <Flex align='center'>
                  <Icon as={IoIosMusicalNotes} fontSize='30px' mr={1} />
                  <Text fontSize='14px'>{artist.views || '0'}</Text>
                </Flex>
                <Flex align='center' ml={10}>
                  {artist.website && (
                    <Link href={artist.website} title={artist.website} target='_blank' rel='noreferrer' h='20px'>
                      <Icon as={RiGlobalLine} fontSize='20px' mr={4} />
                    </Link>
                  )}
                  {artist.facebook && (
                    <Link
                      href={`https://www.facebook.com/${artist.facebook}`}
                      title={`https://www.facebook.com/${artist.facebook}`}
                      target='_blank'
                      rel='noreferrer'
                      h='20px'
                    >
                      <Icon as={FiFacebook} fontSize='20px' mr={4} />
                    </Link>
                  )}
                  {artist.twitter && (
                    <Link
                      href={`https://twitter.com/${artist.twitter}`}
                      title={`https://twitter.com/${artist.twitter}`}
                      target='_blank'
                      rel='noreferrer'
                      h='20px'
                    >
                      <Icon as={FiTwitter} fontSize='20px' mr={4} />
                    </Link>
                  )}
                  {/* <Link href={artist.youtube} title={artist.youtube} target='_blank' rel='noreferrer' h='20px'>
            <Icon as={FiYoutube} fontSize='20px' mr={4} />
          </Link> */}
                  {artist.instagram && (
                    <Link
                      href={`https://www.instagram.com/${artist.instagram}`}
                      title={`https://www.instagram.com/${artist.instagram}`}
                      target='_blank'
                      rel='noreferrer'
                      h='20px'
                    >
                      <Icon as={FiInstagram} fontSize='20px' mr={4} />
                    </Link>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Divider orientation='horizontal' borderColor='gray.700' />
    </>
  );
};

export default ArtistTop;
