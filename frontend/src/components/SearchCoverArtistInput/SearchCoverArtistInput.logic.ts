import { useState } from 'react';

import { useRepository } from 'hooks';

/* eslint-disable import/no-extraneous-dependencies */
const logic = () => {
  const [coverArtists, setCoverArtists] = useState<string[]>([]);

  const { searchRepository } = useRepository();

  const searchCoverArtists = (name: string) => {
    searchRepository.searchArtists(name).then(({ data }) => {
      setCoverArtists([...data]);
    });
  };

  return {
    data: {
      coverArtists,
    },
    methods: {
      searchCoverArtists,
      setCoverArtists,
    },
  };
};

export default logic;
