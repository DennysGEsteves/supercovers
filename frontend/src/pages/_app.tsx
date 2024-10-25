import React from 'react';
import { AppProps } from 'next/app';
import 'global.css';
import { SessionProvider } from 'next-auth/react';
import { Box, ChakraProvider, CSSReset } from '@chakra-ui/react';

import Layout from 'layout/Layout';
import UserProvider from 'context/UserContext';
import { PlayerProvider } from 'context/PlayerContext';
import { AdSense } from 'components/Google/AdSense';
import GoogleAnalytics from 'components/Google/Analytics/Analytics';

import theme from '../theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.isAuth) {
    return (
      <SessionProvider session={pageProps.session}>
        <AdSense pId='4620655458082322' />
        <CSSReset />
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <PlayerProvider>
          <CSSReset />
          <ChakraProvider theme={theme}>
            <Box
              bg='gray.900'
              color='gray.500'
              overflow='auto'
              minHeight='100vh'
              sx={{
                'a:hover': {
                  // color: 'purple.600',
                  textShadow: '0px 0px 2px #FFF',
                },
                '& input': {
                  borderRadius: '5px',
                },
              }}
            >
              <Layout>
                <Component {...pageProps} />
                <GoogleAnalytics />
              </Layout>
            </Box>
          </ChakraProvider>
        </PlayerProvider>
      </UserProvider>
    </SessionProvider>
  );
}
