import { GetStaticProps, NextPage } from 'next';
import React from 'react';

import ArtistsListView from 'views/ArtistsList/ArtistsList.view';
import logic from 'views/ArtistsList/ArtistsList.logic';

const ArtistsList: NextPage = (props: any) => <ArtistsListView {...props} />;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await logic();

  return {
    props: {
      data,
      revalidate: 60 * 60, // 1h
    },
  };
};
export default ArtistsList;
