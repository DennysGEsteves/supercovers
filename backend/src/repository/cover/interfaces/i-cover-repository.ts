import { Cover } from 'entities/cover';

export abstract class ICoverRepository {
  abstract find(coverArtistId: string, coverSongId: string): Promise<Cover>;
  abstract findOrCreate(
    coverArtistId: string,
    coverSongId: string,
  ): Promise<Cover>;
  abstract create(cover: Cover): Promise<Cover>;
  abstract delete(coverId: string): Promise<void>;
}
