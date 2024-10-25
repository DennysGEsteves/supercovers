import { Injectable } from '@nestjs/common';
import { FeaturedVideo } from 'entities/featured-video';
import { Video } from 'entities/video';
import { IFeaturedVideoRepository } from 'repository/featured-video/interfaces/i-featured-video-repository';
import { IFeaturedVideoService } from './interfaces';

@Injectable()
export class FeaturedVideoService implements IFeaturedVideoService {
  constructor(private featuredVideosRepository: IFeaturedVideoRepository) {}

  findAll(): Promise<Video[]> {
    return this.featuredVideosRepository.findAll();
  }

  update(featuredVideos: FeaturedVideo[]) {
    return this.featuredVideosRepository.update(featuredVideos);
  }

  deleteAllByVideoId(videoId: string): Promise<void> {
    return this.featuredVideosRepository.deleteAllByVideoId(videoId);
  }
}
