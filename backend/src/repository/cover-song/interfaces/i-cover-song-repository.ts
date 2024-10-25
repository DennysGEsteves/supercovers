import { CoverSong } from 'entities/cover';

export abstract class ICoverSongRepository {
  abstract find(coverArtistId: string, songName: string): Promise<CoverSong>;
  abstract findOrCreate(
    coverArtistId: string,
    songName: string,
  ): Promise<CoverSong>;
  abstract create(cover: CoverSong): Promise<CoverSong>;
  abstract delete(id: string): Promise<void>;
}
