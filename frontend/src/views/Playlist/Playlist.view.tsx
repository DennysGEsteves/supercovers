/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { NextPage } from 'next';

import Top from './Playlist.top';
import PlaylistVideos from './Playlist.videos';
import { PlaylistViewProps } from './Playlist.props';
import logic from './Playlist.logic';
import UpdatePlaylistModal from './UpdateModal/UpdateModal.view';

const PlaylistView: NextPage<PlaylistViewProps> = (props) => {
  const { data, methods, modal } = logic(props);

  return (
    <>
      <Top isFavorite={data.isFavorite} playlist={data.playlist} openModal={methods.openModal} />
      <PlaylistVideos playlist={data.playlist} />
      <UpdatePlaylistModal {...modal} />
    </>
  );
};

export default PlaylistView;
