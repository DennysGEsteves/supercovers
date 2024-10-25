import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { IUsersRepository } from 'repository/user/interfaces';
import { UserService, IUserService } from 'services/user';
import { UsersUseCases, IUsersUseCases } from 'usecases/user';
import { artistMock, userWithArtistMock } from 'test';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { ArtistsRoute } from './.apis/artist/artist-controller';
import { IArtistsRepository } from '../repository/interfaces';
import { IArtistsService, ArtistsService } from '../services';
import ArtistsUseCases from './artist-usecases';
import { IArtistsUseCases } from './interfaces';
import { ArtistsRepository } from '../repository';
import { UpsertMeArtistDTO } from '../controller/dto';

describe('ArtistsUseCase', () => {
  let useCase: IArtistsUseCases;
  let service: IArtistsService;
  let provider: IStoreImagesProvider;

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

    useCase = module.get<IArtistsUseCases>(IArtistsUseCases);
    service = module.get<IArtistsService>(IArtistsService);
    provider = module.get<IStoreImagesProvider>(IStoreImagesProvider);
  });

  it('should return an artist data by slug', async () => {
    // given
    jest
      .spyOn(service, 'findBySlug')
      .mockImplementationOnce(async () => artistMock);

    // when
    await useCase.findBySlug(artistMock.slug);

    // then
    expect(service.findBySlug).toBeCalledWith(artistMock.slug);
  });

  it('should read an artist by id', async () => {
    // given
    jest
      .spyOn(service, 'findById')
      .mockImplementationOnce(async () => artistMock);

    // when
    await useCase.findById(artistMock.id);

    // then
    expect(service.findById).toBeCalledWith(artistMock.id);
  });

  it('should update an artist', async () => {
    // given
    const dtoMock = {
      about: 'about',
      facebook: 'facebook',
      instagram: 'instagram',
      introVideo: 'introVideo',
      twitter: 'twitter',
      website: 'website',
      slug: 'newSlug',
      topImg: 'somebinaryimg',
    } as UpsertMeArtistDTO;

    jest.spyOn(service, 'update').mockImplementationOnce(() => undefined);

    jest
      .spyOn(provider, 'storeArtistTopImg')
      .mockImplementationOnce(() => undefined);

    // when
    await useCase.updateMeArtist(dtoMock, userWithArtistMock.artist);

    // then
    expect(service.update).toBeCalledWith({
      id: userWithArtistMock.artist.id,
      name: dtoMock.name,
      slug: dtoMock.slug,
      level: 'amateur',
      about: dtoMock.about,
      facebook: dtoMock.facebook,
      instagram: dtoMock.instagram,
      introVideo: dtoMock.introVideo,
      twitter: dtoMock.twitter,
      website: dtoMock.website,
    });
    expect(provider.storeArtistTopImg).toBeCalledWith(
      artistMock.id,
      dtoMock.topImg,
    );
  });

  it('should create an artist', async () => {
    // given
    const slug = 'someslug';

    jest
      .spyOn(service, 'genSlugByUserEmail')
      .mockImplementationOnce(async () => slug);

    jest
      .spyOn(service, 'create')
      .mockImplementationOnce(async () => artistMock);

    // when
    await useCase.createMeArtist(userWithArtistMock.user);

    // then
    expect(service.create).toBeCalledWith({
      userId: userWithArtistMock.user.id,
      name: userWithArtistMock.user.name,
      slug,
      level: 'amateur',
    });
  });

  it('should get an artist top image', async () => {
    // given

    jest
      .spyOn(provider, 'getArtistTopImg')
      .mockImplementationOnce(() => 'binaryimage');

    jest
      .spyOn(service, 'findBySlug')
      .mockImplementationOnce(async () => artistMock);

    // when
    await useCase.getArtistTopImg(artistMock.slug);

    // then
    expect(provider.getArtistTopImg).toBeCalledWith(artistMock.id);
  });
});
