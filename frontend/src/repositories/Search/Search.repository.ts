/* eslint-disable import/no-cycle */
import envs from 'config/environment';
import { Fetch } from 'services';

import { SearchByTagsParams } from '.';

export const SearchRepository = () => {
  const url = `${envs.apiBaseUrl}/search`;

  async function searchArtists(artistName: string) {
    return Fetch.post({
      url: `${url}/cover-artists-provider`,
      data: { artistName },
    });
  }

  async function searchRegisterArtists(artistName: string) {
    return Fetch.post({
      url: `${url}/cover-artists-register`,
      data: { artistName },
    });
  }

  async function searchCoverArtistSongs(artistName: string) {
    return Fetch.post({
      url: `${url}/cover-songs-provider`,
      data: { artistName },
    });
  }

  async function searchRegisterSongs(artistName: string, songName: string) {
    return Fetch.post({
      url: `${url}/cover-songs-register`,
      data: { artistName, songName },
    });
  }

  async function searchSuperArtists(artistName: string) {
    return Fetch.post({
      url: `${url}/super-artists`,
      data: { artistName },
    });
  }

  async function searchByTags(data: SearchByTagsParams) {
    return Fetch.post({
      url: `${url}/tags`,
      data,
    });
  }

  return {
    searchCoverArtistSongs,
    searchArtists,
    searchRegisterArtists,
    searchRegisterSongs,
    searchSuperArtists,
    searchByTags,
  };
};

export default SearchRepository;
