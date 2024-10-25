/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';

import PlaylistView from 'views/Playlist/Playlist.view';

const PlaylistFavorites: NextPage = () => <PlaylistView isFavorite />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default PlaylistFavorites;
