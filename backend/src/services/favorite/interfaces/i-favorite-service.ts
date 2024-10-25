import { Favorite } from 'entities/playlist';

export abstract class IFavoriteService {
  abstract getCount(userId: string): Promise<number>;
  abstract addFavorite(videoView: Favorite): Promise<void>;
  abstract removeFavorite(videoId: string, userId: string): Promise<void>;
  abstract getAllFavorites(userId: string): Promise<Favorite[]>;
  abstract deleteAllByVideoId(videoId: string): Promise<void>;
}
