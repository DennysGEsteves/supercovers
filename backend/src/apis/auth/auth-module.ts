import { Module } from '@nestjs/common';
import { IUsersUseCases, UsersUseCases } from 'usecases/user';
// import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { IUserService, UserService } from 'services/user';
import { ArtistService, IArtistService } from 'services/artist';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { ArtistsUseCases, IArtistsUseCases } from 'usecases/artist';
import { PrismaService } from 'shared/prisma.service';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { ConfigModule } from '@nestjs/config';
import { IUsersRepository } from 'repository/user/interfaces';
import { UsersRepository } from 'repository/user/users-repository';
import { AuthUseCase, IAuthUseCases } from 'usecases/auth';
import { AuthRoute } from 'apis/auth/auth-controller';
import {
  IVideoViewRepository,
  VideoViewRepository,
} from 'repository/video-view';
import { IVideoViewService, VideoViewService } from 'services/video-view';
import { IVideoRepository, VideoRepository } from 'repository/video';
import {
  LocalStrategy,
  LocalAuthGuard,
  JwtStrategy,
} from '../../http/middlewares/passport';

@Module({
  controllers: [AuthRoute],
  providers: [
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    PrismaService,
    // Use Cases
    { useClass: UsersUseCases, provide: IUsersUseCases },
    { useClass: AuthUseCase, provide: IAuthUseCases },
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
  imports: [PassportModule, ConfigModule],
  exports: [],
})
export class AuthModule {}
