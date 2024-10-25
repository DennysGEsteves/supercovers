/* eslint-disable import/no-cycle */
import { Playlist } from './playlist';

export type User = {
  id?: string;
  name: string;
  email?: string;
};

export type Me = {
  name: string;
  id: string;
  email?: string;
  artist: {
    slug?: string;
    name?: string;
    about?: string;
    introVideo?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
    id: string;
  };
  favorites: string[];
  playlists: Playlist[];
};
