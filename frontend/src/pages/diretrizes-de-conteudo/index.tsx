import { NextPage } from 'next';
import React from 'react';

import ContentGuidelinesView from 'views/ContentGuidelines/ContentGuidelines.view';

const ContentGuidelines: NextPage = () => <ContentGuidelinesView />;

export const getStaticProps = async () => ({
  props: {},
  // revalidate: 15,
});

export default ContentGuidelines;
