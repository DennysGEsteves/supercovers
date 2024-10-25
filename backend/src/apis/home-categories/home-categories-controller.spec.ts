import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { IArtistsRepository, ArtistsRepository } from 'repository/artist';
import { ArtistService, IArtistService } from 'services/artist';
import { getMockRes } from '@jest-mock/express';
import { reqMock, userMock } from 'test';
import { IStoreImagesProvider } from 'providers/store-images/interfaces/i-store-images-provider';
import { LocalStoreImagesProvider } from 'providers/store-images/local-images-provider';
import { PrismaService } from 'shared/prisma.service';
import { IUsersRepository } from '../repository/interfaces';
import { IUsersService, UsersService } from '../services';
import { IUsersUseCases, UsersUseCases } from '../use-cases';
import { UsersRoute } from './home-category-controller';
import { UsersRepository } from '../repository/users-repository';
import { RegisterUserDto } from './dto';

describe('UsersController', () => {
  let controller: UsersRoute;
  let useCase: IUsersUseCases;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersRoute],
      providers: [
        PrismaService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<UsersRoute>(UsersRoute);
    useCase = module.get<IUsersUseCases>(IUsersUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    // given
    jest.spyOn(useCase, 'findAll').mockImplementation(async () => [userMock]);

    // when
    await controller.findAll();

    // then
    expect(useCase.findAll).toBeCalled();
  });

  it('should return created user', async () => {
    // given
    const dtoMock = {
      name: 'Fulano de Tal',
      email: 'email@email.com',
      password: 'mudar123',
    } as RegisterUserDto;

    jest.spyOn(useCase, 'register').mockImplementation(async () => userMock);

    // when
    await controller.register(dtoMock);

    // then
    expect(useCase.register).toBeCalledWith(dtoMock);
  });

  it('should return me data', async () => {
    // given

    // when
    const result = await controller.getMeData(reqMock);

    // then
    expect(result).toEqual({
      artist: {
        about: 'about',
        facebook: 'facebook',
        instagram: 'instagram',
        introVideo: 'introVideo',
        name: 'some name',
        slug: 'artist-slug',
        twitter: 'twitter',
        website: 'website',
      },
      user: {
        email: 'artist-slug@email.com',
        name: 'User Name',
      },
    });
  });

  it('should throw error if session user not found', async () => {
    // given

    // when
    const res = () => {
      return controller.getMeData(null);
    };

    // then
    await expect(res()).rejects.toThrowError(UnauthorizedException);
  });

  it('should return session user avatar binary', async () => {
    // given
    const content = 'binaryavatarstring';
    jest.spyOn(useCase, 'getUserAvatar').mockImplementation(() => content);

    const { res } = getMockRes();

    // when
    await controller.getUserAvatar(res, 'userId');

    // then
    expect(res.end).toBeCalledWith(content, 'binary');
  });

  it('should update session user avatar', async () => {
    // given
    const content = 'binaryavatarstring';

    jest
      .spyOn(useCase, 'updateUserAvatar')
      .mockImplementation(async () => undefined);

    // when
    await controller.updateMeAvatar(reqMock, {
      content,
    });

    // then
    expect(useCase.updateUserAvatar).toBeCalledWith(
      reqMock.user.user.id,
      content,
    );
  });
});
