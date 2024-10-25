import { Test } from '@nestjs/testing';
import { IUsersRepository } from 'repository/user/interfaces';
import { IUserService, UserService } from 'services/user';
import { userMock } from 'test';
import { ConfigService } from '@nestjs/config';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { AuthUseCase } from './admin-usecases';
import { IAuthUseCases } from './interfaces';

describe('UsersUseCase', () => {
  let authUseCase: IAuthUseCases;
  let repository: IUsersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          useClass: UsersRepository,
          provide: IUsersRepository,
        },
        {
          useClass: AuthUseCase,
          provide: IAuthUseCases,
        },
        {
          useClass: UserService,
          provide: IUserService,
        },
        {
          useClass: LocalStoreImagesProvider,
          provide: IStoreImagesProvider,
        },
        ConfigService,
      ],
    }).compile();

    authUseCase = module.get<IAuthUseCases>(IAuthUseCases);
    repository = module.get<IUsersRepository>(IUsersRepository);
  });

  it('should validate user credentials return the user data', async () => {
    // given

    const userRepositorySpy = jest
      .spyOn(repository, 'findByEmail')
      .mockImplementationOnce(async () => userMock);

    // when
    const user = await authUseCase.validateLoginCredentials(
      userMock.email,
      userMock.password,
    );

    // then
    expect(userRepositorySpy).toBeCalledWith(userMock.email);
    expect(user).toEqual({
      email: userMock.email,
      name: userMock.name,
    });
  });

  it('should validate user credentials return null', async () => {
    // given

    const userRepositorySpy = jest
      .spyOn(repository, 'findByEmail')
      .mockImplementationOnce(() => null);

    // when
    const user = await authUseCase.validateLoginCredentials(
      userMock.email,
      userMock.password,
    );

    // then
    expect(userRepositorySpy).toBeCalledWith(userMock.email);
    expect(user).toEqual(null);
  });
});
