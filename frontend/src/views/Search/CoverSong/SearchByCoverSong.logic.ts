import { useState } from 'react';

import { useRepository } from 'hooks';
import { Video } from 'types';

const logic = () => {
  const [coverArtist, setCoverArtist] = useState('');
  const [searchArtistSongs, setSearchArtistSongs] = useState('');
  const [coverSong, setCoverSong] = useState('');
  const [result, setResult] = useState<Video[] | undefined>(undefined);

  const { searchRepository } = useRepository();

  const searchCoverArtistSongs = () => {
    setCoverSong('');
    setSearchArtistSongs(coverArtist);
  };

  const submit = () => {
    searchRepository.searchRegisterSongs(coverArtist, coverSong).then(({ data }) => {
      setResult(data);
    });

    setResult([]);
  };

  return {
    data: {
      coverArtist,
      coverSong,
      searchArtistSongs,
      result,
    },
    methods: {
      setCoverArtist,
      setCoverSong,
      searchCoverArtistSongs,
      submit,
    },
  };
};

export default logic;
