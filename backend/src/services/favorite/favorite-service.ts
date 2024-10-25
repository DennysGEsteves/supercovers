/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { IFavoriteRepository } from 'repository/favorite/interfaces/i-favorite-repository';
import { formatCreateFavoriteDBData } from 'repository/favorite';
import { Favorite } from 'entities/playlist';
import { IFavoriteService } from './interfaces';

@Injectable()
export class FavoriteService implements IFavoriteService {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  addFavorite(favorite: Favorite): Promise<void> {
    return this.favoriteRepository.create(formatCreateFavoriteDBData(favorite));
  }

  removeFavorite(videoId: string, userId: string): Promise<void> {
    return this.favoriteRepository.remove(videoId, userId);
  }

  async getCount(userId: string): Promise<number> {
    return this.favoriteRepository.countByUserId(userId);
  }

  async getAllFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.findAllByUserId(userId);
  }

  deleteAllByVideoId(videoId: string): Promise<void> {
    return this.favoriteRepository.deleteAllByVideoId(videoId);
  }
}
