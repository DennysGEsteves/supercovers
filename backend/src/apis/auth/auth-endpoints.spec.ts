import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IUsersUseCases, UsersUseCases } from 'usecases/user';
import { IUsersRepository } from 'repository/user/interfaces';
import { PassportModule } from '@nestjs/passport';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { IUserService, UserService } from 'services/user';
import { ArtistService, IArtistService } from 'services/artist';
import { reqMock, userMock } from 'test';
import { ConfigService } from '@nestjs/config';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { LocalStrategy } from '../../../http/middlewares/passport';
import { IAuthUseCases } from '../use-cases/interfaces';
import { AuthUseCase } from '../use-cases';
import { AuthRoute } from './auth-controller';

describe('Auth Endpoints', () => {
  let app: INestApplication;
  let usersUseCase: IUsersUseCases;
  let authUseCase: IAuthUseCases;
  let localStrategy: LocalStrategy;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'some-secret';

    const module = await Test.createTestingModule({
      controllers: [AuthRoute],
      providers: [
        AuthUseCase,
        LocalStrategy,
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
          useClass: UserService,
          provide: IUserService,
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
          useClass: AuthUseCase,
          provide: IAuthUseCases,
        },
        {
          useClass: LocalStoreImagesProvider,
          provide: IStoreImagesProvider,
        },
        ConfigService,
      ],
      imports: [PassportModule],
    }).compile();

    usersUseCase = module.get<IUsersUseCases>(IUsersUseCases);
    authUseCase = module.get<IAuthUseCases>(IAuthUseCases);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);

    jest
      .spyOn(usersUseCase, 'findByEmail')
      .mockImplementation(async () => userMock);

    jest
      .spyOn(authUseCase, 'validateLoginCredentials')
      .mockImplementation(async () => userMock);

    jest
      .spyOn(localStrategy, 'validate')
      .mockImplementation(async () => reqMock.user.user);

    app = module.createNestApplication();
    await app.init();
  });

  describe('POST /auth/login', () => {
    it('should map route properly', () => {
      const credentials = {
        username: userMock.email,
        password: userMock.password,
      };

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(credentials)
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
