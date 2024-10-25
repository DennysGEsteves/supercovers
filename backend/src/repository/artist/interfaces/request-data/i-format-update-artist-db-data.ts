import { ArtistLevel } from 'entities/artist';

export type IFormatUpsertArtistDbData = {
  data: {
    slug?: string;
    level?: ArtistLevel;
    about?: string;
    facebook?: string;
    instagram?: string;
    introVideo?: string;
    twitter?: string;
    website?: string;
  };
  id: string;
  userId: string;
};
