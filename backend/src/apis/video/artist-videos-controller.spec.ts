/* eslint-disable max-nested-callbacks */
import { Test } from '@nestjs/testing';
import {
  IValidationMusicProvider,
  MusicBrainzProvider,
  ValidateArtistSongPresenter,
} from 'providers/music-validator';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/prisma.service';
import { artistMock, artistVideoMock, userWithArtistMock, reqMock } from 'test';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { IArtistVideosRepository } from '../repository/interfaces';
import { ArtistVideosService, IArtistVideosService } from '../services';
import { ArtistVideosUseCases, IArtistVideosUseCases } from '../use-cases';
import { VideosRoute } from './video-controller';
import { ArtistVideosRepository } from '../repository';
import { UpsertMeVideoDTO, ValidateArtistSongDTO } from './dto';

describe('ArtistVideosController', () => {
  let controller: VideosRoute;
  let useCase: IArtistVideosUseCases;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [VideosRoute],
      providers: [
        ConfigService,
        PrismaService,
        {
          useClass: ArtistVideosRepository,
          provide: IArtistVideosRepository,
        },
        {
          useClass: ArtistVideosUseCases,
          provide: IArtistVideosUseCases,
        },
        {
          useClass: ArtistVideosService,
          provide: IArtistVideosService,
        },
        {
          useClass: MusicBrainzProvider,
          provide: IValidationMusicProvider,
        },
        ExternalRequestHandler,
      ],
    }).compile();

    controller = module.get<VideosRoute>(VideosRoute);
    useCase = module.get<IArtistVideosUseCases>(IArtistVideosUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all artist videos', async () => {
    // given
    jest.spyOn(useCase, 'findAll').mockImplementation(async () => []);

    // when
    await controller.getMeArtistVideos(reqMock);

    // then
    expect(useCase.findAll).toBeCalledWith(userWithArtistMock.artist.id);
  });

  it('should upsert an artist video', async () => {
    // given
    const dto = {
      artist: 'some artist',
      song: 'some song',
      youtubeId: 'some youtubeId',
      id: 'some Id',
    } as UpsertMeVideoDTO;

    jest
      .spyOn(useCase, 'upsertMeArtistVideo')
      .mockImplementation(async () => artistVideoMock);

    // when
    await controller.upsertMeArtistVideo(reqMock, dto);

    // then
    expect(useCase.upsertMeArtistVideo).toBeCalledWith(
      reqMock.user.artist.id,
      dto,
    );
  });

  it('should delete an artist video', async () => {
    // given
    jest.spyOn(useCase, 'delete').mockImplementation(async () => null);

    // when
    await controller.deleteMeArtistVideo(artistVideoMock.id);

    // then
    expect(useCase.delete).toBeCalledWith(artistVideoMock.id);
  });

  it('should validate if artist and song exists', async () => {
    // given

    const validateDTOMock = {
      artist: 'Artistttt',
      song: 'Soonngg',
    } as ValidateArtistSongDTO;

    const useCaseResponse = {
      hasArtist: true,
      hasSong: true,
    } as ValidateArtistSongPresenter;

    jest
      .spyOn(useCase, 'validateArtistSong')
      .mockImplementation(async () => useCaseResponse);

    // when
    await controller.validateArtistSong(validateDTOMock);

    // then
    expect(useCase.validateArtistSong).toBeCalledWith(validateDTOMock);
  });

  it('should return an artist videos by artistId', async () => {
    // given
    jest.spyOn(useCase, 'findAll').mockImplementation(async () => []);

    // when
    await controller.getVideosByArtistId(artistMock.id);

    // then
    expect(useCase.findAll).toBeCalledWith(artistMock.id);
  });
});
