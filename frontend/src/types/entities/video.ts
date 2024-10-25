/* eslint-disable import/no-cycle */
import { Artist } from './artist';

export const PlatformEnum = Object.freeze({
  youtube: 'youtube',
  // vimeo: 'vimeo',
});

export type Platform = keyof typeof PlatformEnum;

export type CoverArtist = {
  name: string;
  imgUrl?: string;
};

export type CoverSong = {
  coverArtist?: CoverArtist;
  name: string;
};

export type Cover = {
  coverArtist: CoverArtist;
  coverSong: CoverSong;
};

export type Video = {
  id?: string;
  cover: Cover;
  platformId: string;
  platform: Platform;
  sealOfApproval?: boolean;
  artist?: Artist;
  views?: number;
  createdAt?: string;
};
