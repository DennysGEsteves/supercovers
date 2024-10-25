import React from 'react';

export default function Blog() {
  return <>Blog</>;
}

export const getStaticProps = async () => ({
  props: {},
  // revalidate: 15,
});
