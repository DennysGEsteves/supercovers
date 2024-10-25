import { Module } from '@nestjs/common';
import {
  AudioscrobblerProvider,
  IValidationMusicProvider,
} from 'providers/music-validator';
import { PrismaService } from 'shared/prisma.service';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import {
  CoverSongRepository,
  ICoverSongRepository,
} from 'repository/cover-song';
import {
  CoverArtistRepository,
  ICoverArtistRepository,
} from 'repository/cover-artist';
import { IVideoUseCases, VideoUseCases } from 'usecases/video';
import { ConfigService } from '@nestjs/config';
import { YoutubeApiProvider, IYoutubeApiProvider } from 'providers/youtube-api';
import { ArtistsRepository, IArtistsRepository } from 'repository/artist';
import { CoverRepository, ICoverRepository } from 'repository/cover';
import { VideoRepository, IVideoRepository } from 'repository/video';
import {
  VideoViewRepository,
  IVideoViewRepository,
} from 'repository/video-view';
import { ArtistService, IArtistService } from 'services/artist';
import { CoverService, ICoverService } from 'services/cover';
import { VideoService, IVideoService } from 'services/video';
import { VideoViewService, IVideoViewService } from 'services/video-view';
import { IVideoTagService, VideoTagService } from 'services/video-tag';
import { IVideoTagRepository, VideoTagRepository } from 'repository/video-tag';
import { FavoriteService, IFavoriteService } from 'services/favorite';
import {
  FeaturedVideoService,
  IFeaturedVideoService,
} from 'services/featured-video';
import { FavoriteRepository, IFavoriteRepository } from 'repository/favorite';
import {
  FeaturedVideoRepository,
  IFeaturedVideoRepository,
} from 'repository/featured-video';
import { VideosRoute } from './video-controller';

@Module({
  controllers: [VideosRoute],
  providers: [
    ExternalRequestHandler,
    PrismaService,
    ConfigService,
    // Use Cases
    { useClass: VideoUseCases, provide: IVideoUseCases },
    // Services
    { useClass: VideoService, provide: IVideoService },
    { useClass: ArtistService, provide: IArtistService },
    { useClass: VideoViewService, provide: IVideoViewService },
    { useClass: CoverService, provide: ICoverService },
    { useClass: VideoTagService, provide: IVideoTagService },
    { useClass: FavoriteService, provide: IFavoriteService },
    { useClass: FeaturedVideoService, provide: IFeaturedVideoService },
    // Repositories
    { useClass: VideoRepository, provide: IVideoRepository },
    { useClass: ArtistsRepository, provide: IArtistsRepository },
    { useClass: VideoViewRepository, provide: IVideoViewRepository },
    { useClass: CoverRepository, provide: ICoverRepository },
    { useClass: CoverArtistRepository, provide: ICoverArtistRepository },
    { useClass: CoverSongRepository, provide: ICoverSongRepository },
    { useClass: VideoTagRepository, provide: IVideoTagRepository },
    { useClass: FavoriteRepository, provide: IFavoriteRepository },
    { useClass: FeaturedVideoRepository, provide: IFeaturedVideoRepository },
    // Providers
    { useClass: AudioscrobblerProvider, provide: IValidationMusicProvider },
    { useClass: YoutubeApiProvider, provide: IYoutubeApiProvider },
  ],
})
export class VideosModule {}
