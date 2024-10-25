import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtStrategy } from 'http/middlewares/passport';
import { IUsersRepository } from 'repository/user/interfaces';
import { UserService, IUserService } from 'services/user';
import { UsersUseCases, IUsersUseCases } from 'usecases/user';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { reqMock, jwtToken, artistMock } from 'test';
import { ArtistsUseCases, IArtistsUseCases } from '../use-cases';
import { ArtistsService, IArtistsService } from '../services';
import { IArtistsRepository } from '../repository/interfaces';
import { ArtistsRoute } from './artist-controller';
import { ArtistsRepository } from '../repository';
import { UpsertMeArtistDTO } from './dto';

describe('ArtistEndpoints', () => {
  let app: INestApplication;
  let jwtStrategy: JwtStrategy;
  let useCase: IArtistsUseCases;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'some-secret';

    const module = await Test.createTestingModule({
      controllers: [ArtistsRoute],
      providers: [
        JwtStrategy,
        PrismaService,
        {
          useClass: ArtistsRepository,
          provide: IArtistsRepository,
        },
        {
          useClass: ArtistsUseCases,
          provide: IArtistsUseCases,
        },
        {
          useClass: ArtistsService,
          provide: IArtistsService,
        },
        {
          useClass: UsersUseCases,
          provide: IUsersUseCases,
        },
        {
          useClass: UserService,
          provide: IUserService,
        },
        {
          useClass: UsersRepository,
          provide: IUsersRepository,
        },
        {
          useClass: LocalStoreImagesProvider,
          provide: IStoreImagesProvider,
        },
        ConfigService,
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    useCase = module.get<IArtistsUseCases>(IArtistsUseCases);

    jest
      .spyOn(jwtStrategy, 'validate')
      .mockImplementation(async () => reqMock.user);

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /artists/me', () => {
    it('should return session artist data', async () => {
      // then
      return request(app.getHttpServer())
        .get('/artists/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .expect(200);
    });
  });

  describe('POST /artists/me', () => {
    it('should create an artist', async () => {
      jest
        .spyOn(useCase, 'createMeArtist')
        .mockImplementation(async () => artistMock);

      return request(app.getHttpServer())
        .post('/artists/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send({})
        .expect(201);
    });
  });

  describe('PUT /artists/me', () => {
    it('should update an artist', async () => {
      const dtoMock = {
        about: 'about',
        facebook: 'facebook',
        instagram: 'instagram',
        introVideo: 'introVideo',
        twitter: 'twitter',
        website: 'website',
        slug: 'newSlug',
      } as UpsertMeArtistDTO;

      jest
        .spyOn(useCase, 'updateMeArtist')
        .mockImplementation(async () => undefined);

      return request(app.getHttpServer())
        .put('/artists/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send(dtoMock)
        .expect(200);
    });
  });

  describe('GET /artists/get-by-slug/:slug', () => {
    it('should return an artist searching by its slug', async () => {
      const slug = 'some artist slug';
      jest
        .spyOn(useCase, 'findBySlug')
        .mockImplementation(async () => artistMock);

      return request(app.getHttpServer())
        .get('/artists/get-by-slug/slug')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send({ slug })
        .expect(200);
    });
  });

  describe('GET /artists/top-img/:artistSlug', () => {
    it('should return an artist top img binary', async () => {
      const slug = 'some artist slug';
      jest
        .spyOn(useCase, 'getArtistTopImg')
        .mockImplementation(async () => 'sometopimgbonary');

      return request(app.getHttpServer())
        .get('/artists/top-img/artistSlug')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send({ slug })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
