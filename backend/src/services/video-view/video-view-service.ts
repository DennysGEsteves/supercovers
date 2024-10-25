/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { Artist } from 'entities/artist';
import { Video, VideoView } from 'entities/video';
import { IArtistsRepository } from 'repository/artist';
import { IVideoRepository } from 'repository/video';
import {
  formatCreateVideoViewDBData,
  IVideoViewRepository,
} from 'repository/video-view';
import { IVideoViewService } from './interfaces/i-video-view-service';

@Injectable()
export class VideoViewService implements IVideoViewService {
  constructor(
    private artistsRepository: IArtistsRepository,
    private videoRepository: IVideoRepository,
    private videoViewRepository: IVideoViewRepository,
  ) {}

  async getTopArtists(limit: number): Promise<Artist[]> {
    const artistViewsData = await this.videoViewRepository.findByArtistCount(
      limit,
    );

    const promise = artistViewsData.map(({ artistId }) => {
      return this.artistsRepository.findById(artistId);
    });

    return Promise.all(promise).then((artists) => {
      return artists.map((artist) => {
        const artistViews = artistViewsData.find(
          (view) => view.artistId === artist.id,
        );
        artist.views = artistViews.views;
        return artist;
      });
    });
  }

  async getTopVideos(limit: number): Promise<Video[]> {
    const videoviews = await this.videoViewRepository.findByVideoCount(limit);

    const promise = videoviews.map(({ videoId }) => {
      return this.videoRepository.findByIdIncludeArtistAndUser(videoId);
    });

    return Promise.all(promise);
  }

  async getTopVideosBySongStyle(
    style: string,
    limit: number,
  ): Promise<Video[]> {
    const videoviews = await this.videoViewRepository.findBySongStyle(
      style,
      limit,
    );

    const promise = videoviews.map(({ videoId }) => {
      return this.videoRepository.findByIdIncludeArtistAndUser(videoId);
    });

    return Promise.all(promise);
  }

  async getTopVideosByCoverArtist(
    name: string,
    limit: number,
  ): Promise<Video[]> {
    const videoviews = await this.videoViewRepository.findByCoverArtist(
      name,
      limit,
    );

    const promise = videoviews.map(({ videoId }) => {
      return this.videoRepository.findByIdIncludeArtistAndUser(videoId);
    });

    return Promise.all(promise);
  }

  addVideoView(videoView: VideoView): Promise<void> {
    const params = formatCreateVideoViewDBData(videoView);
    return this.videoViewRepository.create(params);
  }

  async getArtistTotalViews(artistId: string): Promise<number> {
    return this.videoViewRepository.countByArtistId(artistId);
  }

  deleteAllByVideoId(videoId: string): Promise<void> {
    return this.videoViewRepository.deleteAllByVideoId(videoId);
  }
}
