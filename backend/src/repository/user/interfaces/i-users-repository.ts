import { User } from 'entities/user';
import { IFormatCreateUserDbData } from './request-data';

export abstract class IUsersRepository {
  abstract create(user: IFormatCreateUserDbData): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findManyByMatchName(name: string): Promise<User[]>;
  abstract findByEmailWithIncludes(email: string): Promise<User>;
  abstract update(params: { userId: string; data: User }): Promise<User>;
}
