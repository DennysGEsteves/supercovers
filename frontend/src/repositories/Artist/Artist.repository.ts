import envs from 'config/environment';
import { Fetch } from 'services';
import { Artist, ArtistsSlug } from 'types';
import { getJwtTokenFromSession } from 'utils';

import { UpdateArtistDTO } from './Artist.props';

export const ArtistRepository = () => {
  const url = `${envs.apiBaseUrl}/artists`;

  async function getMeArtist() {
    return Fetch.get({
      url: `${url}/me`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function upsertMeArtist(data: UpdateArtistDTO) {
    return Fetch.post({
      url: `${url}/me`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  function getBySlug(slug: string) {
    return Fetch.get({
      url: `${url}/get-by-slug/${slug}`,
    }).then(({ data }) => data as Artist);
  }

  function getAllArtistsSlugs() {
    return Fetch.get({
      url: `${url}/slugs`,
    }).then(({ data }) => data as ArtistsSlug[]);
  }

  return { getMeArtist, upsertMeArtist, getBySlug, getAllArtistsSlugs };
};
