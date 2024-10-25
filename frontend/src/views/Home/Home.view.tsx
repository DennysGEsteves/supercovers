import React from 'react';
import { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';

import { VideosListWithCat } from 'components/VideosListWithCat';
import { Padding } from 'layout/Padding';
import { ArtistListWithCat } from 'components/ArtistListWithCat';
import { AdBanner } from 'components/Google/AdSense';

import HomeTop from './Home.top';
import { HomeProps } from './Home.props';

const HomeView: NextPage<HomeProps> = ({ data }) => (
  <>
    <HomeTop />
    <Padding>
      <AdBanner />
      <Flex direction='column' gap={10}>
        <VideosListWithCat videos={data.categories.featuredVideos} title='Covers em destaque' />
        <ArtistListWithCat artists={data.categories.topArtists} title='Super Artistas mais visualizados' />
        <VideosListWithCat videos={data.categories.topVideos} title='Covers mais visualizados' />
        <VideosListWithCat videos={data.categories.topPop} title='Top covers estilo Pop' />
        <VideosListWithCat videos={data.categories.topParamore} title='Top covers de Paramore' />
      </Flex>
    </Padding>
  </>
);

export default HomeView;
