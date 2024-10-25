import React from 'react';
import { NextPage } from 'next';

import { Padding } from 'layout/Padding';

import Top from './Artist.top';
import Videos from './Artist.videos';
import { ArtistProps } from './Artist.props';

const ArtistView: NextPage<ArtistProps> = ({ data }) => {
  if (!data?.artist) return null;

  return (
    <>
      <Top artist={data?.artist} />
      <Padding>
        <Videos videos={data?.videos} />
      </Padding>
    </>
  );
};

export default ArtistView;
