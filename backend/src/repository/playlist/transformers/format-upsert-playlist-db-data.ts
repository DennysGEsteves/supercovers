import { Playlist as PlaylistDB } from '@prisma/client';
import { Playlist } from 'entities/playlist';
import { IFormatUpsertPlaylistDBData } from '../interfaces';

export const formatUpsertPlaylistDBData = (
  playlist: Playlist,
): IFormatUpsertPlaylistDBData => {
  return {
    name: playlist.name,
    description: playlist.description,
    userId: playlist.userId,
  } as PlaylistDB;
};
