import React from 'react';
import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import { Player } from 'layout/Player';

import { Footer, Head, Topbar, Playlist } from '.';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Layout: NextPage = ({ children }) => (
  <>
    <Head />
    <Topbar />
    <Playlist />
    <Box width='100%' minHeight='calc(100vh - 158px)'>
      {children}
    </Box>
    <Player />
    <Footer />
  </>
);

export default Layout;
