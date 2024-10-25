import { Box, Heading, Flex, IconButton, Menu, MenuButton, Portal, MenuList, MenuItem } from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/legacy/image';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import usePlayer from 'hooks/usePlayer';

import { PlaylistTopProps } from './Playlist.props';

const PlaylistTop: NextPage<PlaylistTopProps> = ({ isFavorite, playlist, openModal }) => {
  const { playlist: playerPlaylist } = usePlayer();

  if (!playlist) return null;

  return (
    <Box w='100%' h='450px' position='relative'>
      <Box px='310px' position='absolute' bottom='30px' zIndex={2} color='white'>
        <Flex align='center' gap={10}>
          <Box w={260} h={260} border='1px solid #222' bg='#111'>
            <Image width={260} height={260} src='/img/playlist-favorite.png' alt='playlist-favorite' />
          </Box>
          <Box>
            <Heading as='h1' fontSize='3rem'>
              {playlist.name}
            </Heading>
            <Box color='#BBB'>
              <Box pt={5}>{playlist.description}</Box>
              <Box fontWeight={600}>{playlist.videos.length} musicas</Box>
              {/* {!isFavorite && <Box>XX seguindo</Box>} */}
              <Box mt={5}>
                <Menu>
                  <MenuButton>
                    <IconButton
                      variant='outline'
                      colorScheme='white'
                      aria-label=''
                      fontSize='20px'
                      icon={<BsThreeDotsVertical />}
                      isRound
                      as='div'
                    />
                  </MenuButton>
                  <Portal>
                    <MenuList>
                      {!isFavorite && <MenuItem onClick={openModal}>Editar</MenuItem>}
                      <MenuItem
                        onClick={() => {
                          playlist.videos.forEach((video) => playerPlaylist.addVideoToPlaylist(video));
                        }}
                      >
                        Adicionar todas as músicas à fila
                      </MenuItem>
                      {/* <MenuItem>Compartilhar</MenuItem> */}
                    </MenuList>
                  </Portal>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default PlaylistTop;
