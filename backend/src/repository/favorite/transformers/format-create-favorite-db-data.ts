import { Favorite as FavoritesDB } from '@prisma/client';
import { Favorite } from 'entities/playlist';
import { IFormatCreateFavoriteDBData } from '../interfaces';

export const formatCreateFavoriteDBData = (
  favorite: Favorite,
): IFormatCreateFavoriteDBData => {
  return {
    videoId: favorite.videoId,
    userId: favorite.userId,
    position: favorite.position,
  } as FavoritesDB;
};
