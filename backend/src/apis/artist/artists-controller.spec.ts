import { Test } from '@nestjs/testing';
import { IUsersRepository } from 'repository/user/interfaces';
import { IUserService, UserService } from 'services/user';
import { IUsersUseCases, UsersUseCases } from 'usecases/user';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { ConfigService } from '@nestjs/config';
import { getMockRes } from '@jest-mock/express';
import { UsersRepository } from 'repository/user/users-repository';
import { PrismaService } from 'shared/prisma.service';
import { artistMock, userWithArtistMock, reqMock } from 'test';
import { IArtistsRepository } from '../repository/interfaces';
import { ArtistsService, IArtistsService } from '../services';
import { ArtistsUseCases, IArtistsUseCases } from '../use-cases';
import { ArtistsRoute } from './artist-controller';
import { ArtistsRepository } from '../repository';
import { UpsertMeArtistDTO } from './dto';

describe('ArtistsController', () => {
  let controller: ArtistsRoute;
  let useCase: IArtistsUseCases;

  beforeAll(async () => {
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

    controller = module.get<ArtistsRoute>(ArtistsRoute);
    useCase = module.get<IArtistsUseCases>(IArtistsUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return artist data by artistId', () => {
    // when
    const res = controller.getMeArtist(reqMock);

    // then
    expect(res).toEqual(userWithArtistMock.artist);
  });

  it('should create artist data', async () => {
    // given

    jest
      .spyOn(useCase, 'createMeArtist')
      .mockImplementation(async () => artistMock);

    // when
    await controller.createMeArtist(reqMock);

    // then
    expect(useCase.createMeArtist).toBeCalledWith(userWithArtistMock.user);
  });

  it('should update artist data', async () => {
    // given
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

    // when
    await controller.updateMeArtist(reqMock, dtoMock);

    // then
    expect(useCase.updateMeArtist).toBeCalledWith(
      dtoMock,
      userWithArtistMock.artist,
    );
  });

  it('should return artist data by artist slug', async () => {
    // given
    const useCaseMOck = jest
      .spyOn(useCase, 'findBySlug')
      .mockImplementation(async () => artistMock);

    // when
    await controller.findArtistBySlug(artistMock.slug);

    // then
    expect(useCase.findBySlug).toBeCalledWith(artistMock.slug);
    expect(useCaseMOck).toBeCalledWith(artistMock.slug);
  });

  it('should return artist data by artist slug', async () => {
    // given
    const useCaseMOck = jest
      .spyOn(useCase, 'findBySlug')
      .mockImplementation(async () => artistMock);

    // when
    await controller.findArtistBySlug(artistMock.slug);

    // then
    expect(useCase.findBySlug).toBeCalledWith(artistMock.slug);
    expect(useCaseMOck).toBeCalledWith(artistMock.slug);
  });

  it('should return artist top img binary', async () => {
    // given
    const content = 'binaryastring';
    const useCaseMOck = jest
      .spyOn(useCase, 'getArtistTopImg')
      .mockImplementation(async () => content);

    const { res } = getMockRes();

    // when
    await controller.getArtistTopImg(res, artistMock.slug);

    // then
    expect(res.end).toBeCalledWith(content, 'binary');
    expect(useCaseMOck).toBeCalledWith(artistMock.slug);
  });

  it('should return artist top img binary', async () => {
    // given
    const content = 'binaryastring';
    const useCaseMOck = jest
      .spyOn(useCase, 'getArtistTopImg')
      .mockImplementation(async () => content);

    const { res } = getMockRes();

    // when
    await controller.getArtistTopImg(res, artistMock.slug);

    // then
    expect(res.end).toBeCalledWith(content, 'binary');
    expect(useCaseMOck).toBeCalledWith(artistMock.slug);
  });
});
