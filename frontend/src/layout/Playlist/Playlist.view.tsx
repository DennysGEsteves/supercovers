import { Box, Button, Divider, Flex, Icon } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { BsPlayCircleFill, BsPlusLg } from 'react-icons/bs';
import NextLink from 'next/link';

import { CreatePlaylistModal } from './CreateModal';
import logic from './Playlist.logic';

export const Playlist: NextPage = () => {
  const { data, modal, methods } = logic();

  if (!data.isLogged) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '250px',
        left: '0',
        height: '100%',
        top: '80px',
        borderRight: '1px solid #222',
        zIndex: 10,
        padding: '30px 20px',
        backgroundColor: 'rgba(0,0,0,0.9)',
        textAlign: 'center',
      }}
    >
      <Button
        colorScheme='purple'
        sx={{
          // backgroundColor: '#222',
          // color: '#FFF',
          borderRadius: '30px',
          width: '100%',
          fontSize: '14px',
          // _hover: {
          // backgroundColor: '#333',
          // },
        }}
        onClick={methods.openModal}
      >
        <Icon h='25px' w='25px' color='white' as={BsPlusLg} mr={3} /> Nova Playlist
      </Button>
      <Divider borderColor='#555' m='30px auto 30px' />
      <Box textAlign='left'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          mb={3}
          cursor='pointer'
          _hover={{
            fontWeight: 'bold',
            '& svg': {
              visibility: 'visible',
            },
          }}
        >
          <NextLink href='/playlist'>
            <Box>
              <Box color='#FFF' fontSize={14}>
                {`Música marcada como "Gostei"`}
              </Box>
            </Box>
          </NextLink>
          <Icon visibility='hidden' h='20px' w='20px' color='white' as={BsPlayCircleFill} />
        </Flex>
        {data.playlists.map((playlist) => (
          <Flex
            key={playlist.id}
            justifyContent='space-between'
            alignItems='center'
            mb={3}
            cursor='pointer'
            _hover={{
              fontWeight: 'bold',
              '& svg': {
                visibility: 'visible',
              },
            }}
          >
            <NextLink href={`/playlist/${playlist.id}`}>
              <Box>
                <Box color='#FFF' fontSize={14}>
                  {playlist.name}
                </Box>
              </Box>
            </NextLink>
            <Icon visibility='hidden' h='20px' w='20px' color='white' as={BsPlayCircleFill} />
          </Flex>
        ))}
      </Box>
      <CreatePlaylistModal {...modal} />
    </Box>
  );
};

export default Playlist;
