import { Test } from '@nestjs/testing';
import {
  MusicBrainzProvider,
  IValidationMusicProvider,
  ValidateArtistSongPresenter,
} from 'providers/music-validator';
import { PrismaService } from 'shared/prisma.service';
import { artistMock, artistVideoMock } from 'test';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { ArtistVideo } from '../model';
import { IArtistVideosRepository } from '../repository/interfaces';
import { ArtistVideosService, IArtistVideosService } from '../services';
import { IVideoUseCases } from './interfaces';
import ArtistVideosUseCases from './video-usecases';
import { ArtistVideosRepository } from '../repository';
import { UpsertMeArtistVideoDTO } from '../controller/dto';

describe('ArtistVideosUseCase', () => {
  let useCase: IVideoUseCases;
  let service: IArtistVideosService;
  let validationMusicProvider: IValidationMusicProvider;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          useClass: ArtistVideosUseCases,
          provide: IVideoUseCases,
        },
        {
          useClass: ArtistVideosService,
          provide: IArtistVideosService,
        },
        {
          useClass: MusicBrainzProvider,
          provide: IValidationMusicProvider,
        },
        {
          useClass: ArtistVideosRepository,
          provide: IArtistVideosRepository,
        },
        ExternalRequestHandler,
      ],
    }).compile();

    useCase = module.get<IVideoUseCases>(IVideoUseCases);
    service = module.get<IArtistVideosService>(IArtistVideosService);
    validationMusicProvider = module.get<IValidationMusicProvider>(
      IValidationMusicProvider,
    );
  });

  it('should return all artist videos', async () => {
    // given

    jest
      .spyOn(service, 'findAll')
      .mockImplementationOnce(async () => [artistVideoMock]);

    // when
    const res = await useCase.findAll(artistMock.id);

    // then
    expect(res).toEqual([artistVideoMock]);
    expect(service.findAll).toBeCalledWith(artistMock.id);
  });

  it('should upsert an artist video', async () => {
    // given
    const dto = {
      artist: 'some artist',
      song: 'some song',
      youtubeId: 'some youtubeId',
      id: 'some Id',
    } as UpsertMeArtistVideoDTO;

    jest
      .spyOn(service, 'upsert')
      .mockImplementationOnce(async () => artistVideoMock);

    jest
      .spyOn(ArtistVideo, 'fromUpsertMeArtistVideoDTO')
      .mockImplementationOnce(() => artistVideoMock);

    // when
    const res = await useCase.upsertMeVideo(artistMock.id, dto);

    // then
    expect(res).toEqual(artistVideoMock);
    expect(service.upsert).toBeCalledWith(artistMock.id, artistVideoMock);
  });

  it('should delete an artist video', async () => {
    // given

    jest.spyOn(service, 'delete').mockImplementationOnce(() => undefined);

    // when
    await useCase.delete(artistVideoMock.id);

    // then
    expect(service.delete).toBeCalledWith(artistVideoMock.id);
  });

  it('should validate if artist and song exists', async () => {
    // given
    const useCaseResponse = {
      hasArtist: true,
      hasSong: true,
    } as ValidateArtistSongPresenter;

    jest
      .spyOn(validationMusicProvider, 'getByArtistName')
      .mockImplementationOnce(async () => true);

    jest
      .spyOn(validationMusicProvider, 'getByArtistSongName')
      .mockImplementationOnce(async () => true);

    // when
    const res = await useCase.validateArtistSong({
      artist: artistVideoMock.artist,
      song: artistVideoMock.song,
    });

    // then
    expect(res).toEqual(useCaseResponse);
    expect(validationMusicProvider.getByArtistName).toBeCalledWith(
      artistVideoMock.artist,
    );
    expect(validationMusicProvider.getByArtistSongName).toBeCalledWith(
      artistVideoMock.artist,
      artistVideoMock.song,
    );
  });
});
