/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useNotify, useRepository } from 'hooks';

const logic = (artistName: string) => {
  const [coverSongs, setCoverSongs] = useState<string[]>([]);

  const { searchRepository } = useRepository();

  const notify = useNotify();

  const searchCoverArtistSongs = () => {
    setCoverSongs([]);

    searchRepository
      .searchCoverArtistSongs(artistName)
      .then(({ data }) => {
        setCoverSongs([...data]);
      })
      .catch((e) => {
        notify.error(e.response?.data?.message || 'Erro ao buscar dados');
      });
  };

  useEffect(() => {
    if (artistName) searchCoverArtistSongs();
  }, [artistName]);

  return {
    data: {
      coverSongs,
    },
    methods: {
      searchCoverArtistSongs,
      setCoverSongs,
    },
  };
};

export default logic;
