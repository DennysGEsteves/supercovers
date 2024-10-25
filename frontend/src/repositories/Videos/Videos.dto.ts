import { Artist, Cover, PlatformEnum } from 'types';

export type VideoReadDTO = {
  id: string;
  artistId: string;
  platformId: string;
  platform: keyof typeof PlatformEnum;
  cover: Cover;
  artist: Artist;
  createdAt: string;
  views: number;
  // deletedAt: Date;
};
