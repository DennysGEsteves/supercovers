import { UpsertPlaylistDTO } from 'apis/playlist/dto';
import { Favorite, Playlist } from 'entities/playlist';

export abstract class IPlaylistUseCases {
  abstract addFavorite(videoId: string, userId: string): Promise<void>;
  abstract removeFavorite(videoId: string, userId: string): Promise<void>;
  abstract getAllFavorites(userId: string): Promise<Favorite[]>;
  abstract getAllPlaylists(userId: string): Promise<Playlist[]>;
  abstract createPlaylist(
    dto: UpsertPlaylistDTO,
    userId: string,
  ): Promise<void>;
  abstract updatePlaylist(
    dto: UpsertPlaylistDTO,
    playlistId: string,
    userId: string,
  ): Promise<void>;
  abstract addPlaylistVideo(
    playlistId: string,
    videoId: string,
    userId: string,
  ): Promise<void>;
  abstract getPlaylistAndVideos(playlistId: string): Promise<Playlist>;
}
