/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { NextPage } from 'next';
import { Icon, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';

import usePlayer from 'hooks/usePlayer';
import { AddPlaylistVideoBtn } from 'components/AddPlaylistVideoBtn';
import { useUser } from 'hooks';

import { VideosMenuProps } from './VideoMenu.props';

const VideoMenu: NextPage<VideosMenuProps> = ({ video, verticalIcon, inPlaylist }) => {
  const { controls, playlist } = usePlayer();
  const { me } = useUser();

  return (
    <Menu>
      <MenuButton>
        <Icon cursor='pointer' h='20px' w='20px' color='white' as={verticalIcon ? BsThreeDotsVertical : BsThreeDots} />
      </MenuButton>
      <Portal>
        <MenuList>
          {!!me?.id && !inPlaylist && (
            <MenuItem>
              <AddPlaylistVideoBtn video={video} />
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              playlist.addVideoToPlaylist(video);
            }}
          >
            Adicionar à fila de músicas
          </MenuItem>
          <MenuItem
            onClick={() => {
              controls.play(video);
            }}
          >
            Tocar
          </MenuItem>
          {/* <MenuItem>Compartilhar</MenuItem> */}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default VideoMenu;
