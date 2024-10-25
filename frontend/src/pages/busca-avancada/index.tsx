import { NextPage } from 'next';
import React from 'react';

import SearchView from 'views/Search/Search.view';

const Search: NextPage = () => <SearchView />;

export const getStaticProps = async () => ({
  props: {},
  // revalidate: 15,
});

export default Search;
