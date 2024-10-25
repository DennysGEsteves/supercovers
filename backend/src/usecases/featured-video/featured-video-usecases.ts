import { Injectable } from '@nestjs/common';
import { UpdateFeaturedVideosDTO } from 'apis/admin/dto';
import { FeaturedVideo } from 'entities/featured-video';
import { Video } from 'entities/video';
import { IFeaturedVideoService } from 'services/featured-video/interfaces';
import { IFeaturedVideoUseCases } from './interfaces/i-featured-video-usecases';

@Injectable()
export class FeaturedVideoUseCases implements IFeaturedVideoUseCases {
  constructor(private featuredVideosService: IFeaturedVideoService) {}

  findAll(): Promise<Video[]> {
    return this.featuredVideosService.findAll();
  }

  update(dto: UpdateFeaturedVideosDTO): Promise<void> {
    const featuredVideos = FeaturedVideo.fromUpdateFeaturedVideosDTO(dto);
    return this.featuredVideosService.update(featuredVideos);
  }
}
