import { NextPage } from 'next';
import React from 'react';

import TermsView from 'views/Terms/Terms.view';

const Terms: NextPage = () => <TermsView />;

export const getStaticProps = async () => ({
  props: {},
  // revalidate: 15,
});

export default Terms;
