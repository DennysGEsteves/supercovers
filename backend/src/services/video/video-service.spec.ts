import { Test } from '@nestjs/testing';
import {
  IValidationMusicProvider,
  MusicBrainzProvider,
} from 'providers/music-validator';
import { PrismaService } from 'shared/prisma.service';
import { artistMock, artistVideoMock } from 'test';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { IArtistVideosRepository } from '../repository/interfaces';
import { ArtistVideosUseCases, IArtistVideosUseCases } from '../use-cases';
import { ArtistVideosService } from './artist-videos-service';
import { IVideoService } from './interfaces';
import { ArtistVideosRepository } from '../repository';

describe('ArtistVideosService', () => {
  let service: IVideoService;
  let repository: IArtistVideosRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          useClass: ArtistVideosUseCases,
          provide: IArtistVideosUseCases,
        },
        {
          useClass: ArtistVideosService,
          provide: IVideoService,
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
    })
      // .overrideProvider(IArtistVideosRepository)
      // .useValue(repository)
      .compile();

    service = module.get<IVideoService>(IVideoService);
    repository = module.get<IArtistVideosRepository>(IArtistVideosRepository);
  });

  afterEach(jest.clearAllMocks);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an artist video', async () => {
    // given

    const { id, ...artistVideo } = artistVideoMock;

    jest
      .spyOn(repository, 'upsert')
      .mockImplementationOnce(async () => artistVideoMock);

    // when
    await service.upsert(artistVideoMock.artistId, artistVideo);

    // then
    expect(repository.upsert).toHaveBeenCalledWith({
      id: 'null',
      data: {
        song: artistVideoMock.song,
        artist: artistVideoMock.artist,
        youtubeId: artistVideoMock.youtubeId,
        artistId: artistVideoMock.artistId,
      },
    });
  });

  it('should update an artist video', async () => {
    // given

    jest
      .spyOn(repository, 'upsert')
      .mockImplementationOnce(async () => artistVideoMock);

    // when
    await service.upsert(artistVideoMock.artistId, artistVideoMock);

    // then
    expect(repository.upsert).toHaveBeenCalledWith({
      id: artistVideoMock.id,
      data: {
        song: artistVideoMock.song,
        artist: artistVideoMock.artist,
        youtubeId: artistVideoMock.youtubeId,
        artistId: artistVideoMock.artistId,
      },
    });
  });

  it('should return all artist videos', async () => {
    // given

    jest
      .spyOn(repository, 'findAll')
      .mockImplementationOnce(async () => [artistVideoMock]);

    // when
    const res = await service.findAll(artistMock.id);

    // then
    expect(res).toEqual([artistVideoMock]);
    expect(repository.findAll).toBeCalledWith(artistMock.id);
  });

  it('should delete an artist video', async () => {
    // given

    jest.spyOn(repository, 'delete').mockImplementationOnce(() => undefined);

    // when
    await service.delete(artistVideoMock.id);

    // then
    expect(repository.delete).toBeCalledWith(artistVideoMock.id);
  });
});
