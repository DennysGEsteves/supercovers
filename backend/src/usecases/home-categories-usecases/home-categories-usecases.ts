import { Injectable } from '@nestjs/common';
import { Artist } from 'entities/artist';
import { Video } from 'entities/video';
import { IFeaturedVideoService } from 'services/featured-video/interfaces';
import { IVideoViewService } from 'services/video-view/interfaces/i-video-view-service';
import { IHomeCategoriesUseCases } from './interfaces';

@Injectable()
export class HomeCategoriesUseCases implements IHomeCategoriesUseCases {
  constructor(
    private featuredVideoService: IFeaturedVideoService,
    private videoviewService: IVideoViewService,
  ) {}

  async getFeaturedVideos(): Promise<Video[]> {
    return this.featuredVideoService.findAll();
  }

  async getTopVideos(): Promise<Video[]> {
    const videos = await this.videoviewService.getTopVideos(10);
    return videos;
  }

  async getTopVideosBySongStyle(style: string): Promise<Video[]> {
    const videos = await this.videoviewService.getTopVideosBySongStyle(
      style,
      10,
    );
    return videos;
  }

  async getTopVideosByCoverArtist(name: string): Promise<Video[]> {
    const videos = await this.videoviewService.getTopVideosByCoverArtist(
      name,
      10,
    );
    return videos;
  }

  async getTopArtists(): Promise<Artist[]> {
    const artists = await this.videoviewService.getTopArtists(10);
    return artists;
  }
}
