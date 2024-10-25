/* eslint-disable implicit-arrow-linebreak */
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { IUsersRepository } from 'repository/user/interfaces';
import { IUserService, UserService } from 'services/user';
import { IUsersUseCases, UsersUseCases } from 'usecases/user';
import { userMock } from 'test';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { User } from 'entities/user';
import { LocalStrategy } from '../../../http/middlewares/passport';
import { AuthUseCase } from '../use-cases';
import { IAuthUseCases } from '../use-cases/interfaces';
import { AuthRoute } from './auth-controller';

describe('AuthController', () => {
  let controller: AuthRoute;
  let useCase: IAuthUseCases;

  beforeAll(async () => {
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
    }).compile();

    controller = module.get<AuthRoute>(AuthRoute);
    useCase = module.get<IAuthUseCases>(IAuthUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return valid login', () => {
    // given

    jest
      .spyOn(useCase, 'validateLoginCredentials')
      .mockImplementation(async () =>
        User.toValidateLoginCredentialsPresenter(userMock),
      );

    // when
    const result = controller.login({
      user: User.toValidateLoginCredentialsPresenter(userMock),
    });

    // then
    expect(result).toEqual({
      email: userMock.email,
      name: userMock.name,
    });
  });
});
