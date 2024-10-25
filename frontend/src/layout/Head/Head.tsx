import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

const HeadInfo: NextPage = () => (
  <Head>
    <title>Supercovers</title>
    <link rel='icon' href='/favicon.ico' />
    <meta
      name='description'
      content='Supercovers! Mostre o seu talento na música tocando a música dos seus artistas preferidos!'
    />
    <meta name='google-adsense-account' content='ca-pub-4620655458082322' />
    {/* <meta
				property="og:image"
				content={`https://og-image.vercel.app/${encodeURI(
					siteTitle
				)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
			/> */}
  </Head>
);

export default HeadInfo;
