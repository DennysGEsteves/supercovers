import { LoginWithSocialDTO } from 'apis/auth/dto';
import { User } from 'entities/user';

export abstract class IAuthUseCases {
  abstract validateLoginCredentials(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }>;

  abstract loginWithSocial(
    dto: LoginWithSocialDTO,
  ): Promise<{ user: User; token: string }>;
}
