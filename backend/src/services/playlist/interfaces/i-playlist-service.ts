import { Playlist } from 'entities/playlist';
import { PlaylistVideo } from 'entities/playlist/playlist-video';

export abstract class IPlaylistService {
  abstract createPlaylist(playlist: Playlist): Promise<void>;
  abstract updatePlaylist(playlist: Playlist): Promise<void>;
  abstract getAllPlaylists(userId: string): Promise<Playlist[]>;
  abstract getPlaylistVideosCount(playlistId: string): Promise<number>;
  abstract getPlaylistAndVideos(playlistId: string): Promise<Playlist>;
  abstract createPlaylistVideo(
    playlistVideo: PlaylistVideo,
    userId: string,
  ): Promise<void>;
}
