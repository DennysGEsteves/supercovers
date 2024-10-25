import { Injectable } from '@nestjs/common';
import { User } from 'entities/user';
import {
  IUsersRepository,
  formatUpdateUserDBData,
  formatCreateUserDBData,
} from 'repository/user';
import { IUserService } from './interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(private usersRepository: IUsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  create(data: User): Promise<User> {
    return this.usersRepository.create(formatCreateUserDBData(data));
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  findByEmailIncludeArtist(email: string): Promise<User> {
    return this.usersRepository.findByEmailWithIncludes(email);
  }

  async findByMatchName(name: string): Promise<User[]> {
    return this.usersRepository.findManyByMatchName(name);
  }

  async update(user: User) {
    await this.usersRepository.update(formatUpdateUserDBData(user));
  }
}
