import { ArtistLevel } from 'entities/artist';

export type IFormatCreateArtistDbData = {
  slug: string;
  userId: string;
  level: ArtistLevel;
  about?: string;
  facebook?: string;
  instagram?: string;
  introVideo?: string;
  twitter?: string;
  website?: string;
};
