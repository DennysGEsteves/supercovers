import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthUseCases } from 'usecases/auth';
import { User } from 'entities/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authUseCase: IAuthUseCases) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<User & { token: string }> {
    const { user, token } = await this.authUseCase.validateLoginCredentials(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      name: user.name,
      email: user.email,
      token,
    };
  }
}
