import { Cover, CoverArtist, CoverSong } from 'entities/cover';

export abstract class ICoverService {
  abstract find(coverArtistId: string, coverSongId: string): Promise<Cover>;
  abstract create(cover: Cover): Promise<Cover>;
  abstract delete(coverId: string): Promise<void>;
  abstract findOrCreateCoverArtistByName(name: string): Promise<CoverArtist>;
  abstract findOrCreateCoverSongByName(
    coverArtistId: string,
    songName: string,
  ): Promise<CoverSong>;
  abstract findOrCreateCover(
    coverArtistId: string,
    coverSongId: string,
  ): Promise<Cover>;
  abstract findCoverArtistsByName(artistName: string): Promise<CoverArtist>;
  abstract findCoverSongByName(
    coverArtistId: string,
    songName: string,
  ): Promise<CoverSong>;
}
