import { Injectable } from '@nestjs/common';
import { UpsertPlaylistDTO } from 'apis/playlist/dto';
import { Favorite, Playlist } from 'entities/playlist';
import { PlaylistVideo } from 'entities/playlist/playlist-video';
import { IFavoriteService } from 'services/favorite';
import { IPlaylistService } from 'services/playlist';
import { IPlaylistUseCases } from './interfaces';

@Injectable()
export default class PlaylistUseCases implements IPlaylistUseCases {
  constructor(
    private favoriteService: IFavoriteService,
    private playlistService: IPlaylistService,
  ) {}

  async addFavorite(videoId: string, userId: string): Promise<void> {
    const lastPosition = await this.favoriteService.getCount(userId);
    const favoriteVideo = Favorite.fromAddFavoriteVideoDTO(
      videoId,
      userId,
      lastPosition + 1,
    );
    return this.favoriteService.addFavorite(favoriteVideo);
  }

  async removeFavorite(videoId: string, userId: string): Promise<void> {
    return this.favoriteService.removeFavorite(videoId, userId);
  }

  async getAllFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteService.getAllFavorites(userId);
  }

  async getAllPlaylists(userId: string): Promise<Playlist[]> {
    return this.playlistService.getAllPlaylists(userId);
  }

  createPlaylist(dto: UpsertPlaylistDTO, userId: string): Promise<void> {
    const playlist = Playlist.fromUpsertPlaylistDTO(dto, userId);
    return this.playlistService.createPlaylist(playlist);
  }

  updatePlaylist(
    dto: UpsertPlaylistDTO,
    playlistId: string,
    userId: string,
  ): Promise<void> {
    const playlist = Playlist.fromUpsertPlaylistDTO(dto, userId, playlistId);
    return this.playlistService.updatePlaylist(playlist);
  }

  getPlaylistAndVideos(playlistId: string): Promise<Playlist> {
    return this.playlistService.getPlaylistAndVideos(playlistId);
  }

  async addPlaylistVideo(
    playlistId: string,
    videoId: string,
    userId: string,
  ): Promise<void> {
    const lastPosition = await this.playlistService.getPlaylistVideosCount(
      playlistId,
    );
    const playlistVideo = PlaylistVideo.fromAddPlaylistVideoParams(
      playlistId,
      videoId,
      lastPosition + 1,
    );

    return this.playlistService.createPlaylistVideo(playlistVideo, userId);
  }
}
