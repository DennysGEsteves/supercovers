import { Module } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { ConfigModule } from '@nestjs/config';
import {
  HomeCategoriesUseCases,
  IHomeCategoriesUseCases,
} from 'usecases/home-categories-usecases';
import {
  FeaturedVideoService,
  IFeaturedVideoService,
} from 'services/featured-video';
import {
  FeaturedVideoRepository,
  IFeaturedVideoRepository,
} from 'repository/featured-video';
import { IVideoService, VideoService } from 'services/video';
import { IVideoRepository, VideoRepository } from 'repository/video';
import {
  IVideoViewRepository,
  VideoViewRepository,
} from 'repository/video-view';
import { ArtistService, IArtistService } from 'services/artist';
import { ArtistsRepository, IArtistsRepository } from 'repository/artist';
import { IVideoViewService, VideoViewService } from 'services/video-view';
import { HomeCategoriesRoute } from './home-categories-controller';

@Module({
  controllers: [HomeCategoriesRoute],
  providers: [
    PrismaService,
    // Use Cases
    { useClass: HomeCategoriesUseCases, provide: IHomeCategoriesUseCases },
    // Services
    { useClass: FeaturedVideoService, provide: IFeaturedVideoService },
    { useClass: VideoService, provide: IVideoService },
    { useClass: ArtistService, provide: IArtistService },
    { useClass: VideoViewService, provide: IVideoViewService },
    // Repositories
    { useClass: FeaturedVideoRepository, provide: IFeaturedVideoRepository },
    { useClass: VideoRepository, provide: IVideoRepository },
    { useClass: VideoViewRepository, provide: IVideoViewRepository },
    { useClass: ArtistsRepository, provide: IArtistsRepository },
    // Providers
  ],
  imports: [ConfigModule],
})
export class HomeCategoriesModule {}
