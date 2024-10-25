import { Module } from '@nestjs/common';
import { ArtistService, IArtistService } from 'services/artist';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { ArtistsUseCases, IArtistsUseCases } from 'usecases/artist';
import { PrismaService } from 'shared/prisma.service';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { ConfigModule } from '@nestjs/config';
import { IUserService, UserService } from 'services/user';
import { IUsersRepository, UsersRepository } from 'repository/user';
import { IUsersUseCases, UsersUseCases } from 'usecases/user';
import { UsersRoute } from 'apis/user/user-controller';
import {
  IVideoViewRepository,
  VideoViewRepository,
} from 'repository/video-view';
import { IVideoViewService, VideoViewService } from 'services/video-view';
import { IVideoRepository, VideoRepository } from 'repository/video';

@Module({
  controllers: [UsersRoute],
  providers: [
    PrismaService,
    // Use Cases
    { useClass: UsersUseCases, provide: IUsersUseCases },
    { useClass: ArtistsUseCases, provide: IArtistsUseCases },
    // Services
    { useClass: UserService, provide: IUserService },
    { useClass: ArtistService, provide: IArtistService },
    { useClass: VideoViewService, provide: IVideoViewService },
    // Repositories
    { useClass: UsersRepository, provide: IUsersRepository },
    { useClass: ArtistsRepository, provide: IArtistsRepository },
    { useClass: VideoViewRepository, provide: IVideoViewRepository },
    { useClass: VideoRepository, provide: IVideoRepository },
    // Providers
    { useClass: LocalStoreImagesProvider, provide: IStoreImagesProvider },
  ],
  imports: [ConfigModule],
})
export class UsersModule {}
