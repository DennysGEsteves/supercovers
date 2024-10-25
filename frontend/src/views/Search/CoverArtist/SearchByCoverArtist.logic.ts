import { useState } from 'react';

import { useRepository } from 'hooks';

import { SearchCover } from './SearchByCoverArtist.props';

const logic = () => {
  const [coverArtist, setCoverArtist] = useState('');
  const [result, setResult] = useState<SearchCover[] | undefined>(undefined);

  const { searchRepository } = useRepository();

  const submit = () => {
    searchRepository.searchRegisterArtists(coverArtist).then(({ data }) => {
      setResult(data);
    });

    setResult([]);
  };

  return {
    data: {
      coverArtist,
      result,
    },
    methods: {
      setCoverArtist,
      submit,
    },
  };
};

export default logic;
