import { User } from 'entities/user';

export abstract class IUserService {
  abstract create(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByMatchName(name: string): Promise<User[]>;
  abstract findByEmailIncludeArtist(email: string): Promise<User>;
  abstract update(user: User): Promise<void>;
}
