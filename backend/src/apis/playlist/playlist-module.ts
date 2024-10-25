import { Module } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { FavoriteService, IFavoriteService } from 'services/favorite';
import { IFavoriteRepository, FavoriteRepository } from 'repository/favorite';
import PlaylistUseCases from 'usecases/playlist/playlist-usecases';
import { IPlaylistUseCases } from 'usecases/playlist';
import { IPlaylistService, PlaylistService } from 'services/playlist';
import { IPlaylistRepository, PlaylistRepository } from 'repository/playlist';
import { PlaylistVideoRepository } from 'repository/playlist-video';
import { IPlaylistVideoRepository } from 'repository/playlist-video/interfaces/i-playlist-video-repository';
import { PlaylistRoute } from './playlist-controller';

@Module({
  controllers: [PlaylistRoute],
  providers: [
    ExternalRequestHandler,
    PrismaService,
    // Use Cases
    { useClass: PlaylistUseCases, provide: IPlaylistUseCases },
    // Services
    { useClass: FavoriteService, provide: IFavoriteService },
    { useClass: PlaylistService, provide: IPlaylistService },
    // Repositories
    { useClass: FavoriteRepository, provide: IFavoriteRepository },
    { useClass: PlaylistRepository, provide: IPlaylistRepository },
    { useClass: PlaylistVideoRepository, provide: IPlaylistVideoRepository },
  ],
})
export class PlaylistModule {}
