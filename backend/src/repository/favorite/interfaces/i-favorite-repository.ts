import { Favorite } from 'entities/playlist';
import { IFormatCreateFavoriteDBData } from './request-data';

export abstract class IFavoriteRepository {
  abstract create(data: IFormatCreateFavoriteDBData): Promise<void>;
  abstract remove(videoId: string, userId: string): Promise<void>;
  abstract countByUserId(userId: string): Promise<number>;
  abstract findAllByUserId(userId: string): Promise<Favorite[]>;
  abstract deleteAllByVideoId(videoId: string): Promise<void>;
}
