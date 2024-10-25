/* eslint-disable import/no-cycle */
import { User } from './user';

export const ArtistLevelEnum = Object.freeze({
  amateur: 'amateur',
  professional: 'professional',
  superstar: 'superstar',
});

export type ArtistLevel = keyof typeof ArtistLevelEnum;

export type Artist = {
  id?: string;
  userId?: string;
  slug: string;
  about?: string;
  introVideo?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  level?: ArtistLevel;
  user?: User;
  views?: number;
};

export type ArtistsSlug = {
  name: string;
  slug: string;
};
