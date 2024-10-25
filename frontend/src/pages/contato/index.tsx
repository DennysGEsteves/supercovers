import React from 'react';

import ContactUsView from 'views/ContactUs/ContactUs.view';

export default function Contact() {
  return <ContactUsView />;
}

export const getStaticProps = async () => ({
  props: {},
});
