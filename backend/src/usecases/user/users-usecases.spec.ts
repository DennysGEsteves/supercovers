import { Test } from '@nestjs/testing';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { userMock } from 'test';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'shared/prisma.service';
import { IUsersUseCases } from './interfaces';
import { IUsersService, UsersService } from '../services';
import { RegisterUserDto, UpdateUserDto } from '../controller/dto';
import { UsersRoute } from '../controller/users-controller';
import { IUsersRepository, UsersRepository } from '../repository';
import UsersUseCases from './user-usecases';

describe('UsersUseCase', () => {
  let useCase: IUsersUseCases;
  let service: IUsersService;
  let storeImageProvider: IStoreImagesProvider;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersRoute],
      providers: [
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

    useCase = module.get<IUsersUseCases>(IUsersUseCases);
    service = module.get<IUsersService>(IUsersService);
    storeImageProvider = module.get<IStoreImagesProvider>(IStoreImagesProvider);
  });

  it('should register a user', async () => {
    // given
    const dtoMock = {
      name: userMock.name,
      email: userMock.email,
      password: userMock.password,
    } as RegisterUserDto;

    jest.spyOn(service, 'create').mockImplementationOnce(() => undefined);

    // when
    await useCase.register(dtoMock);

    // then
    expect(service.create).toHaveBeenCalledWith({
      name: userMock.name,
      email: userMock.email,
      password: userMock.password,
      id: undefined,
    });
  });

  it('should update a user', async () => {
    // given
    const dto = {
      name: userMock.name,
      email: userMock.email,
    } as UpdateUserDto;

    jest.spyOn(service, 'update').mockImplementationOnce(() => undefined);

    // when
    await useCase.update({ user: userMock, dto });

    // then
    expect(service.update).toHaveBeenCalledWith({
      name: userMock.name,
      email: userMock.email,
      password: userMock.password,
      id: userMock.id,
    });
  });

  it('should return all users', async () => {
    // given
    jest
      .spyOn(service, 'findAll')
      .mockImplementationOnce(async () => [userMock]);

    // when
    await useCase.findAll();

    // then
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return an user data searching by its email', async () => {
    // given
    jest
      .spyOn(service, 'findByEmail')
      .mockImplementationOnce(async () => userMock);

    // when
    await useCase.findByEmail(userMock.email);

    // then
    expect(service.findByEmail).toHaveBeenCalledWith(userMock.email);
  });

  it('should return an user avatar binary', async () => {
    // given
    const content = 'avatarbinary';
    jest
      .spyOn(storeImageProvider, 'getUserAvatarImg')
      .mockImplementationOnce(() => content);

    // when
    await useCase.getUserAvatar(userMock.id);

    // then
    expect(storeImageProvider.getUserAvatarImg).toHaveBeenCalledWith(
      userMock.id,
    );
  });

  it('should update an user avatar', async () => {
    // given
    const content = 'avatarbinary';
    jest
      .spyOn(storeImageProvider, 'storeUserAvatarImg')
      .mockImplementationOnce(() => undefined);

    // when
    await useCase.updateUserAvatar(userMock.id, content);

    // then
    expect(storeImageProvider.storeUserAvatarImg).toHaveBeenCalledWith(
      userMock.id,
      content,
    );
  });
});
