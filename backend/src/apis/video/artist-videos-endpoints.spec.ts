/* eslint-disable max-lines */
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IUsersRepository } from 'repository/user/interfaces';
import { JwtStrategy } from 'http/middlewares/passport';
import {
  IValidationMusicProvider,
  MusicBrainzProvider,
  ValidateArtistSongPresenter,
} from 'providers/music-validator';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { artistVideoMock, jwtToken, reqMock } from 'test';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/prisma.service';
import { UsersRepository } from 'repository/user/users-repository';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { VideosRoute } from './video-controller';
import { IArtistVideosRepository } from '../repository/interfaces';
import { ArtistVideosUseCases, IArtistVideosUseCases } from '../use-cases';
import { ArtistVideosService, IArtistVideosService } from '../services';
import { ArtistVideosRepository } from '../repository';
import { UpsertMeVideoDTO, ValidateArtistSongDTO } from './dto';

describe('ArtistVideosEndpoints', () => {
  let app: INestApplication;
  let jwtStrategy: JwtStrategy;
  let useCase: IArtistVideosUseCases;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'some-secret';

    const module = await Test.createTestingModule({
      controllers: [VideosRoute],
      providers: [
        ConfigService,
        ExternalRequestHandler,
        JwtStrategy,
        PrismaService,
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
        {
          useClass: ArtistVideosRepository,
          provide: IArtistVideosRepository,
        },
        {
          useClass: ArtistsRepository,
          provide: IArtistsRepository,
        },
        {
          useClass: UsersRepository,
          provide: IUsersRepository,
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    useCase = module.get<IArtistVideosUseCases>(IArtistVideosUseCases);

    jest
      .spyOn(jwtStrategy, 'validate')
      .mockImplementation(async () => reqMock.user);

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /artist-videos/me', () => {
    it('should return all session user videos', async () => {
      jest.spyOn(useCase, 'findAll').mockImplementation(async () => []);

      const res = await request(app.getHttpServer())
        .get('/artist-videos/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .expect(200);

      return res;
    });
  });

  describe('POST /artist-videos/me', () => {
    it('should upsert an artist video', () => {
      const dto = {
        artist: 'some artist',
        song: 'some song',
        youtubeId: 'some youtubeId',
        id: 'some Id',
      } as UpsertMeVideoDTO;

      jest
        .spyOn(useCase, 'upsertMeArtistVideo')
        .mockImplementation(async () => artistVideoMock);

      return request(app.getHttpServer())
        .post('/artist-videos/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send(dto)
        .expect(201);
    });
  });

  describe('DELETE /artist-videos/me/:videoId', () => {
    it('should update an artist video', () => {
      jest.spyOn(useCase, 'delete').mockImplementation(async () => null);

      return request(app.getHttpServer())
        .delete('/artist-videos/me/123456789')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .expect(200);
    });
  });

  describe('POST /artist-videos/me/validate', () => {
    it('should validate if artist and song exists', () => {
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

      return request(app.getHttpServer())
        .post('/artist-videos/me/validate')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send(validateDTOMock)
        .expect(201);
    });
  });

  describe('GET /artist-videos/get-by-artistid/:artistId', () => {
    it('should return an artist videos by artistId', async () => {
      jest.spyOn(useCase, 'findAll').mockImplementation(async () => []);

      return request(app.getHttpServer())
        .get('/artist-videos/get-by-artistid/someArtistId')
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
