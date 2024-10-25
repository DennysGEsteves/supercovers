import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { IArtistsRepository } from 'repository/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { userMock, userWithArtistMock } from 'test';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { ArtistsRepository } from 'repository/artist';
import { PrismaService } from 'shared/prisma.service';
import { UsersRoute } from '../controller/users-controller';
import { IUsersRepository } from '../repository/interfaces';
import { UsersUseCases, IUsersUseCases } from '../use-cases';
import { IUserService } from './interfaces';
import { UserService } from './user-service';
import { UsersRepository } from '../repository/users-repository';

describe('UsersService', () => {
  let service: IUserService;
  let repository: IUsersRepository;

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
          useClass: LocalStoreImagesProvider,
          provide: IStoreImagesProvider,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<IUserService>(IUserService);
    repository = module.get<IUsersRepository>(IUsersRepository);
  });

  afterEach(jest.clearAllMocks);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    // given
    jest.spyOn(repository, 'create').mockImplementationOnce(() => undefined);

    // when
    await service.create(userMock);

    // then
    expect(repository.create).toHaveBeenCalledWith({
      email: userMock.email,
      name: userMock.name,
      password: userMock.password,
    });
  });

  it('should update a user', async () => {
    // given
    jest.spyOn(repository, 'update').mockImplementationOnce(() => undefined);

    // when
    await service.update(userMock);

    // then
    expect(repository.update).toHaveBeenCalledWith({
      data: {
        email: userMock.email,
        name: userMock.name,
        password: userMock.password,
      },
      userId: userMock.id,
    });
  });

  it('should return all users', async () => {
    // given
    jest
      .spyOn(repository, 'findAll')
      .mockImplementationOnce(async () => [userMock]);

    // when
    await service.findAll();

    // then
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should return an user data searching by its email', async () => {
    // given
    jest
      .spyOn(repository, 'findByEmail')
      .mockImplementationOnce(async () => userMock);

    // when
    await service.findByEmail(userMock.email);

    // then
    expect(repository.findByEmail).toHaveBeenCalledWith(userMock.email);
  });

  it('should return an user and artist data searching by its email', async () => {
    // given
    jest
      .spyOn(repository, 'findByEmailIncludeArtist')
      .mockImplementationOnce(async () => userWithArtistMock);

    // when
    await service.findByEmailIncludeArtist(userMock.email);

    // then
    expect(repository.findByEmailIncludeArtist).toHaveBeenCalledWith(
      userMock.email,
    );
  });
});
