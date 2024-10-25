import envs from 'config/environment';
import { Fetch } from 'services';
import { Artist, Video } from 'types';

export const HomeCategoriesRepository = () => {
  const url = `${envs.apiBaseUrl}/home-categories`;

  async function getFeaturedVideos() {
    return Fetch.get({
      url: `${url}/featured-videos`,
    }).then(({ data }) => data as Video[]);
  }

  async function getTopVideos() {
    return Fetch.get({
      url: `${url}/top-videos`,
    }).then(({ data }) => data as Video[]);
  }

  async function getTopArtists() {
    return Fetch.get({
      url: `${url}/top-artists`,
    }).then(({ data }) => data as Artist[]);
  }

  async function getTopByStyle(style: string) {
    return Fetch.post({
      url: `${url}/top-by-style`,
      data: { style },
    }).then(({ data }) => data as Video[]);
  }

  async function getTopByCoverArtist(name: string) {
    return Fetch.post({
      url: `${url}/top-by-cover-artist`,
      data: { name },
    }).then(({ data }) => data as Video[]);
  }

  return {
    getFeaturedVideos,
    getTopVideos,
    getTopArtists,
    getTopByStyle,
    getTopByCoverArtist,
  };
};

export default HomeCategoriesRepository;
