import { useState } from 'react';

import { useRepository } from 'hooks';
import { Artist } from 'types';

const logic = () => {
  const [superArtist, setSuperArtist] = useState('');
  const [result, setResult] = useState<Artist[] | undefined>(undefined);

  const { searchRepository } = useRepository();

  const submit = () => {
    searchRepository.searchSuperArtists(superArtist).then(({ data }) => {
      setResult(data);
    });

    setResult([]);
  };

  return {
    data: {
      superArtist,
      result,
    },
    methods: {
      setSuperArtist,
      submit,
    },
  };
};

export default logic;
