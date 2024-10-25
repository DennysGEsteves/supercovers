import { ArtistsSlug } from 'types';

export type ArtistsSlugMapped = Record<string, ArtistsSlug[]>;

export type ArtistListProps = {
  data: {
    artists: ArtistsSlugMapped;
  };
};
