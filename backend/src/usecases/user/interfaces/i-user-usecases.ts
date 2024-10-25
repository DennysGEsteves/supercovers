import { RegisterUserDto, UpdateUserDto } from 'apis/user/dto';
import { User } from 'entities/user';

export abstract class IUsersUseCases {
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User>;
  abstract register(dto: RegisterUserDto): Promise<User>;
  abstract update(params: { user: User; dto: UpdateUserDto }): Promise<void>;
  abstract getUserAvatar(userId: string): string;
  abstract updateUserAvatar(userId: string, data: string): void;
}
