import { Module } from '@nestjs/common';
import {
  AudioscrobblerProvider,
  IValidationMusicProvider,
} from 'providers/music-validator';
import { PrismaService } from 'shared/prisma.service';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { ConfigService } from '@nestjs/config';
import { YoutubeApiProvider, IYoutubeApiProvider } from 'providers/youtube-api';
import { ISearchUseCases, SearchUseCases } from 'usecases/search';
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
import { ArtistsUseCases, IArtistsUseCases } from 'usecases/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { IUserService, UserService } from 'services/user';
import { IVideoViewService, VideoViewService } from 'services/video-view';
import {
  IStoreImagesProvider,
  LocalStoreImagesProvider,
} from 'providers/store-images';
import { ArtistsRepository, IArtistsRepository } from 'repository/artist';
import { IUsersRepository, UsersRepository } from 'repository/user';
import { IVideoRepository, VideoRepository } from 'repository/video';
import {
  IVideoViewRepository,
  VideoViewRepository,
} from 'repository/video-view';
import { IVideoTagService, VideoTagService } from 'services/video-tag';
import { IVideoTagRepository, VideoTagRepository } from 'repository/video-tag';
import { SearchRoute } from './search-controller';

@Module({
  controllers: [SearchRoute],
  providers: [
    ExternalRequestHandler,
    PrismaService,
    ConfigService,
    // Use Cases
    { useClass: SearchUseCases, provide: ISearchUseCases },
    { useClass: ArtistsUseCases, provide: IArtistsUseCases },
    // Services
    { useClass: CoverService, provide: ICoverService },
    { useClass: ArtistService, provide: IArtistService },
    { useClass: UserService, provide: IUserService },
    { useClass: VideoViewService, provide: IVideoViewService },
    { useClass: VideoTagService, provide: IVideoTagService },
    { useClass: VideoTagService, provide: IVideoTagService },
    // Repositories
    { useClass: CoverRepository, provide: ICoverRepository },
    { useClass: CoverArtistRepository, provide: ICoverArtistRepository },
    { useClass: CoverSongRepository, provide: ICoverSongRepository },
    { useClass: ArtistsRepository, provide: IArtistsRepository },
    { useClass: UsersRepository, provide: IUsersRepository },
    { useClass: VideoRepository, provide: IVideoRepository },
    { useClass: VideoViewRepository, provide: IVideoViewRepository },
    { useClass: VideoTagRepository, provide: IVideoTagRepository },
    // Providers
    { useClass: AudioscrobblerProvider, provide: IValidationMusicProvider },
    { useClass: YoutubeApiProvider, provide: IYoutubeApiProvider },
    { useClass: LocalStoreImagesProvider, provide: IStoreImagesProvider },
  ],
})
export class SearchModule {}
