/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { Playlist } from 'entities/playlist';
import { PlaylistVideo } from 'entities/playlist/playlist-video';
import { formatUpsertPlaylistDBData } from 'repository/playlist';
import { formatCreatePlaylistVideoDBData } from 'repository/playlist-video';
import { IPlaylistVideoRepository } from 'repository/playlist-video/interfaces/i-playlist-video-repository';
import { IPlaylistRepository } from 'repository/playlist/interfaces/i-playlist-repository';
import { IPlaylistService } from './interfaces';

@Injectable()
export class PlaylistService implements IPlaylistService {
  constructor(
    private playlistRepository: IPlaylistRepository,
    private playlistVideoRepository: IPlaylistVideoRepository,
  ) {}

  createPlaylist(playlist: Playlist): Promise<void> {
    return this.playlistRepository.create(formatUpsertPlaylistDBData(playlist));
  }

  updatePlaylist(playlist: Playlist): Promise<void> {
    return this.playlistRepository.update(
      formatUpsertPlaylistDBData(playlist),
      playlist.id,
    );
  }

  getAllPlaylists(userId: string): Promise<Playlist[]> {
    return this.playlistRepository.findAllByUserId(userId);
  }

  getPlaylistAndVideos(playlistId: string): Promise<Playlist> {
    return this.playlistRepository.findById(playlistId);
  }

  getPlaylistVideosCount(playlistId: string): Promise<number> {
    return this.playlistVideoRepository.countByPlaylistId(playlistId);
  }

  async createPlaylistVideo(
    playlistVideo: PlaylistVideo,
    userId: string,
  ): Promise<void> {
    const [pĺaylist] =
      await this.playlistRepository.findAllByUserIdAndPlaylistId(
        playlistVideo.playlistId,
        userId,
      );

    if (pĺaylist) {
      return this.playlistVideoRepository.create(
        formatCreatePlaylistVideoDBData(playlistVideo),
        userId,
      );
    }

    return null;
  }
}
