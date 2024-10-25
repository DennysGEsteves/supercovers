import { NextPage } from 'next';
import React from 'react';

import AboutView from 'views/About/About.view';

const About: NextPage = () => <AboutView />;

export const getStaticProps = async () => ({
  props: {},
  // revalidate: 15,
});

export default About;
