import { useRepository } from 'hooks';
import { ArtistsSlug } from 'types';

import { ArtistsSlugMapped } from './ArtistsList.props';

const logic = async () => {
  const { artistRepository } = useRepository();
  const artists = await artistRepository.getAllArtistsSlugs();

  const mapArtistsByFirtsLetter = (artistsSlug: ArtistsSlug[]) => {
    const groupedArtists: ArtistsSlugMapped = {};

    artistsSlug.forEach((artist) => {
      const firstLetter = artist.name[0].toUpperCase();

      if (!groupedArtists[firstLetter]) {
        groupedArtists[firstLetter] = [];
      }

      groupedArtists[firstLetter].push(artist);
    });

    return Object.keys(groupedArtists)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = groupedArtists[key];
        return acc;
      }, {});
  };

  const groupedArtists = mapArtistsByFirtsLetter(artists);

  return {
    data: {
      artists: groupedArtists,
    },
  };
};

export default logic;
