import { Playlist } from 'entities/playlist';
import { IFormatUpsertPlaylistDBData } from './request-data';

export abstract class IPlaylistRepository {
  abstract create(data: IFormatUpsertPlaylistDBData): Promise<void>;
  abstract update(
    data: IFormatUpsertPlaylistDBData,
    playlistId: string,
  ): Promise<void>;
  abstract remove(videoId: string, userId: string): Promise<void>;
  abstract findAllByUserId(userId: string): Promise<Playlist[]>;
  abstract findById(playlistId: string): Promise<Playlist>;
  abstract findAllByUserIdAndPlaylistId(
    id: string,
    userId: string,
  ): Promise<Playlist[]>;
}
