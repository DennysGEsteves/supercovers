import { NextPage } from 'next';
import React from 'react';

import PrivacyPolicyView from 'views/PrivacyPolicy/PrivacyPolicy.view';

const PrivacyPolicy: NextPage = () => <PrivacyPolicyView />;

export const getStaticProps = async () => ({
  props: {},
  // revalidate: 15,
});

export default PrivacyPolicy;
