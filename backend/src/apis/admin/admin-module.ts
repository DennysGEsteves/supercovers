import { Module } from '@nestjs/common';
import { IUsersUseCases, UsersUseCases } from 'usecases/user';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'shared/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { IUserService, UserService } from 'services/user';
import {
  IStoreImagesProvider,
  LocalStoreImagesProvider,
} from 'providers/store-images';
import { IUsersRepository, UsersRepository } from 'repository/user';
import { ArtistsRepository, IArtistsRepository } from 'repository/artist';
import { VideoUseCases, IVideoUseCases } from 'usecases/video';
import { VideoService, IVideoService } from 'services/video';
import {
  IValidationMusicProvider,
  AudioscrobblerProvider,
} from 'providers/music-validator';
import { VideoRepository, IVideoRepository } from 'repository/video';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { ArtistsUseCases, IArtistsUseCases } from 'usecases/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { AdminRoute } from 'apis/admin/admin-controller';
import { AdminUseCases, IAdminUseCases } from 'usecases/admin';
import {
  FeaturedVideoRepository,
  IFeaturedVideoRepository,
} from 'repository/featured-video';
import {
  IVideoViewRepository,
  VideoViewRepository,
} from 'repository/video-view';
import { IVideoViewService, VideoViewService } from 'services/video-view';
import { IFavoriteRepository, FavoriteRepository } from 'repository/favorite';
import { IYoutubeApiProvider, YoutubeApiProvider } from 'providers/youtube-api';
import { CoverService, ICoverService } from 'services/cover';
import { CoverRepository, ICoverRepository } from 'repository/cover';
import {
  CoverArtistRepository,
  ICoverArtistRepository,
} from 'repository/cover-artist';
import {
  CoverSongRepository,
  ICoverSongRepository,
} from 'repository/cover-song';
import {
  FeaturedVideoService,
  IFeaturedVideoService,
} from 'services/featured-video';
import {
  FeaturedVideoUseCases,
  IFeaturedVideoUseCases,
} from 'usecases/featured-video';
import { IVideoTagRepository, VideoTagRepository } from 'repository/video-tag';
import { IVideoTagService, VideoTagService } from 'services/video-tag';
import { FavoriteService, IFavoriteService } from 'services/favorite';
import {
  AdminAuthGuard,
  AdminStrategy,
  JwtAuthGuard,
  JwtStrategy,
} from '../../http/middlewares/passport';

@Module({
  controllers: [AdminRoute],
  providers: [
    AdminAuthGuard,
    AdminStrategy,
    JwtAuthGuard,
    JwtStrategy,
    PrismaService,
    ExternalRequestHandler,
    // Use Cases
    { useClass: AdminUseCases, provide: IAdminUseCases },
    { useClass: UsersUseCases, provide: IUsersUseCases },
    { useClass: VideoUseCases, provide: IVideoUseCases },
    { useClass: ArtistsUseCases, provide: IArtistsUseCases },
    { useClass: FeaturedVideoUseCases, provide: IFeaturedVideoUseCases },
    // Services
    { useClass: UserService, provide: IUserService },
    { useClass: VideoService, provide: IVideoService },
    { useClass: ArtistService, provide: IArtistService },
    { useClass: FeaturedVideoService, provide: IFeaturedVideoService },
    { useClass: VideoViewService, provide: IVideoViewService },
    { useClass: CoverService, provide: ICoverService },
    { useClass: VideoTagService, provide: IVideoTagService },
    { useClass: FavoriteService, provide: IFavoriteService },
    // Repositories
    { useClass: UsersRepository, provide: IUsersRepository },
    { useClass: ArtistsRepository, provide: IArtistsRepository },
    { useClass: VideoRepository, provide: IVideoRepository },
    { useClass: FeaturedVideoRepository, provide: IFeaturedVideoRepository },
    { useClass: VideoViewRepository, provide: IVideoViewRepository },
    { useClass: FavoriteRepository, provide: IFavoriteRepository },
    { useClass: CoverRepository, provide: ICoverRepository },
    { useClass: CoverArtistRepository, provide: ICoverArtistRepository },
    { useClass: CoverSongRepository, provide: ICoverSongRepository },
    { useClass: VideoTagRepository, provide: IVideoTagRepository },
    // Providers
    { useClass: LocalStoreImagesProvider, provide: IStoreImagesProvider },
    { useClass: AudioscrobblerProvider, provide: IValidationMusicProvider },
    { useClass: YoutubeApiProvider, provide: IYoutubeApiProvider },
  ],
  imports: [PassportModule, ConfigModule],
  exports: [],
})
export class AdminModule {}
