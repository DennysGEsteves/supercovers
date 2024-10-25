import { IFormatCreatePlaylistVideoDBData } from './request-data';

export abstract class IPlaylistVideoRepository {
  abstract create(
    playlistVideo: IFormatCreatePlaylistVideoDBData,
    userId: string,
  ): Promise<void>;
  abstract countByPlaylistId(playlistId): Promise<number>;
}
