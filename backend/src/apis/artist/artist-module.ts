import { Module } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import {
  LocalStoreImagesProvider,
  IStoreImagesProvider,
} from 'providers/store-images';
import { ConfigService } from '@nestjs/config';
import { IUserService, UserService } from 'services/user';
import { IUsersRepository, UsersRepository } from 'repository/user';
import { ArtistsRoute } from 'apis/artist/artist-controller';
import { ArtistsRepository, IArtistsRepository } from 'repository/artist';
import { ArtistsUseCases, IArtistsUseCases } from 'usecases/artist';
import { IArtistService, ArtistService } from 'services/artist';
import {
  IVideoViewRepository,
  VideoViewRepository,
} from 'repository/video-view';
import { IVideoViewService, VideoViewService } from 'services/video-view';
import { IVideoRepository, VideoRepository } from 'repository/video';

@Module({
  controllers: [ArtistsRoute],
  providers: [
    PrismaService,
    ConfigService,
    // Use Cases
    { useClass: ArtistsUseCases, provide: IArtistsUseCases },
    // Services
    { useClass: ArtistService, provide: IArtistService },
    { useClass: UserService, provide: IUserService },
    { useClass: VideoViewService, provide: IVideoViewService },
    // Repositories
    { useClass: ArtistsRepository, provide: IArtistsRepository },
    { useClass: UsersRepository, provide: IUsersRepository },
    { useClass: VideoViewRepository, provide: IVideoViewRepository },
    { useClass: VideoRepository, provide: IVideoRepository },
    // Providers
    { useClass: LocalStoreImagesProvider, provide: IStoreImagesProvider },
  ],
})
export class ArtistsModule {}
