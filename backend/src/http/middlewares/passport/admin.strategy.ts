import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAdminUseCases } from 'usecases/admin';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private adminUseCases: IAdminUseCases) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.adminUseCases.validateLoginCredentials(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
