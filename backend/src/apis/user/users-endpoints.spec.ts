import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { JwtStrategy } from 'http/middlewares/passport';
import * as request from 'supertest';
import { jwtToken, reqMock } from 'test';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/prisma.service';
import { IUsersRepository } from '../repository/interfaces';
import { UsersService, IUsersService } from '../services';
import { UsersUseCases, IUsersUseCases } from '../use-cases';
import { UsersRoute } from './user-controller';
import { UsersRepository } from '../repository/users-repository';
import { RegisterUserDto } from './dto';

describe('UsersEndpoints', () => {
  let app: INestApplication;
  let jwtStrategy: JwtStrategy;
  let useCase: IUsersUseCases;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'some-secret';

    const module = await Test.createTestingModule({
      controllers: [UsersRoute],
      providers: [
        JwtStrategy,
        PrismaService,
        {
          useClass: UsersRepository,
          provide: IUsersRepository,
        },
        {
          useClass: UsersUseCases,
          provide: IUsersUseCases,
        },
        {
          useClass: UsersService,
          provide: IUsersService,
        },
        {
          useClass: ArtistService,
          provide: IArtistService,
        },
        {
          useClass: ArtistsRepository,
          provide: IArtistsRepository,
        },
        {
          useClass: LocalStoreImagesProvider,
          provide: IStoreImagesProvider,
        },
        ConfigService,
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    useCase = module.get<IUsersUseCases>(IUsersUseCases);

    jest
      .spyOn(jwtStrategy, 'validate')
      .mockImplementation(async () => reqMock.user);

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /users/me', () => {
    it('should return session user data', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .expect(200);

      return res;
    });
  });

  describe('PUT /users/me', () => {
    it('should update an user', () => {
      const dtoMock = {
        name: 'Fulano de Tal',
        email: 'email@email.com',
        password: 'mudar123',
      } as RegisterUserDto;

      jest.spyOn(useCase, 'update').mockImplementation(async () => undefined);

      return request(app.getHttpServer())
        .put('/users/me')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .send(dtoMock)
        .expect(200);
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      jest.spyOn(useCase, 'findAll').mockImplementation(async () => []);

      const res = await request(app.getHttpServer()).get('/users').expect(200);

      return res;
    });
  });

  describe('GET /users/avatar/:userId', () => {
    it('should return user avatar', async () => {
      jest
        .spyOn(useCase, 'getUserAvatar')
        .mockImplementation(() => 'uservatarbinary');

      const res = await request(app.getHttpServer())
        .get('/users/avatar/someId')
        .expect(200);

      return res;
    });
  });

  describe('PUT /users/me/avar', () => {
    it('should update me avatar', async () => {
      jest
        .spyOn(useCase, 'updateUserAvatar')
        .mockImplementation(() => undefined);

      const res = await request(app.getHttpServer())
        .put('/users/me/avatar')
        .set('Cookie', [`next-auth.session-token=${jwtToken}`])
        .expect(200);

      return res;
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
