import { Test } from '@nestjs/testing';
import { IUsersRepository } from 'repository/user/interfaces';
import { UserService, IUserService } from 'services/user';
import { UsersUseCases, IUsersUseCases } from 'usecases/user';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { artistMock, userMock } from 'test';
import { ArtistsRoute } from './.apis/artist/artist-controller';
import { IArtistsRepository } from '../repository/interfaces';
import { ArtistsUseCases, IArtistsUseCases } from '../use-cases';
import { ArtistService } from './artist-service';
import { IArtistService } from './interfaces';
import { ArtistsRepository } from '../repository';
import { Artist, ArtistUser } from '../model';

describe('ArtistsService', () => {
  let service: IArtistService;
  let repository: IArtistsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ArtistsRoute],
      providers: [
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
          useClass: ArtistService,
          provide: IArtistService,
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

    service = module.get<IArtistService>(IArtistService);
    repository = module.get<IArtistsRepository>(IArtistsRepository);
  });

  afterEach(jest.clearAllMocks);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an artist with optional params', async () => {
    // given

    jest
      .spyOn(repository, 'create')
      .mockImplementationOnce(async () => artistMock);

    // when
    await service.create(artistMock);

    // then
    expect(repository.create).toHaveBeenCalledWith({
      name: artistMock.name,
      slug: artistMock.slug,
      level: artistMock.level,
      userId: userMock.id,
    });
  });

  it('should create an artist without optional params', async () => {
    // given

    jest
      .spyOn(repository, 'create')
      .mockImplementationOnce(async () => artistMock);

    // when
    await service.create({
      name: artistMock.name,
      slug: artistMock.slug,
      level: artistMock.level,
    });

    // then
    expect(repository.create).toHaveBeenCalledWith({
      name: artistMock.name,
      slug: artistMock.slug,
      level: artistMock.level,
    });
  });

  it('should update an artist with optional params', async () => {
    // given
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => undefined);

    // when
    await service.update(artistMock);

    // then
    expect(repository.update).toHaveBeenCalledWith({
      data: {
        name: artistMock.name,
        slug: artistMock.slug,
        level: artistMock.level,
        about: artistMock.about,
        facebook: artistMock.facebook,
        instagram: artistMock.instagram,
        introVideo: artistMock.introVideo,
        twitter: artistMock.twitter,
        website: artistMock.website,
      },
      id: artistMock.id,
    });
  });

  it('should update an artist without optional params', async () => {
    // given
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => undefined);

    // when
    await service.update({ id: artistMock.id } as Artist);

    // then
    expect(repository.update).toHaveBeenCalledWith({
      data: {},
      id: artistMock.id,
    });
  });

  it('should return an artist', async () => {
    // given

    jest
      .spyOn(repository, 'findById')
      .mockImplementationOnce(async () => artistMock);

    // when
    await service.findById(artistMock.id);

    // then
    expect(repository.findById).toHaveBeenCalledWith(artistMock.id);
  });

  it('should get an artist by slug', async () => {
    // given
    const artistUser = {
      ...artistMock,
      User: userMock,
    } as ArtistUser;

    jest
      .spyOn(repository, 'findBySlug')
      .mockImplementationOnce(async () => artistUser);

    // when
    await service.findBySlug(artistMock.slug);

    // then
    expect(repository.findBySlug).toHaveBeenCalledWith(artistMock.slug);
  });

  it('should generate a slug for a new artist using its email', async () => {
    // given
    const email = 'someslug@email.com';
    const slug = 'someslug';

    jest
      .spyOn(repository, 'findAllBySlug')
      .mockImplementationOnce(async () => []);

    // when
    const result = await service.genSlugByUserEmail(email);

    // then
    expect(result).toEqual(slug);
  });

  it('should generate a incremented slug for a new artist using its email', async () => {
    // given
    const email = 'someslug@email.com';
    const slug = 'someslug_2';

    jest
      .spyOn(repository, 'findAllBySlug')
      .mockImplementationOnce(async () => [artistMock]);

    // when
    const result = await service.genSlugByUserEmail(email);

    // then
    expect(result).toEqual(slug);
  });
});
