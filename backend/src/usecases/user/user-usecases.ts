import { Injectable } from '@nestjs/common';
import { IStoreImagesProvider } from 'providers/store-images';
import { User } from 'entities/user';
import { IUserService } from 'services/user';
import { RegisterUserDto, UpdateUserDto } from 'apis/user/dto';
import { IUsersUseCases } from './interfaces';

@Injectable()
export default class UsersUseCases implements IUsersUseCases {
  constructor(
    private usersService: IUserService,
    private storeImagesProvider: IStoreImagesProvider,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  register(dto: RegisterUserDto): Promise<User> {
    const user = User.fromRegisterUserDto(dto);
    return this.usersService.create(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  async update(params: { user: User; dto: UpdateUserDto }): Promise<void> {
    const user = User.fromUpdateUserDto(params);
    await this.usersService.update(user);
  }

  getUserAvatar(userId: string): string {
    return this.storeImagesProvider.getUserAvatarImg(userId);
  }

  updateUserAvatar(userId: string, data: string): void {
    return this.storeImagesProvider.storeUserAvatarImg(userId, data);
  }
}
