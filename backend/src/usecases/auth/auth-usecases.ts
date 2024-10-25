import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'entities/user';
import { IUserService } from 'services/user';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginWithSocialDTO } from 'apis/auth/dto';
import { IAuthUseCases } from './interfaces';

@Injectable()
export class AuthUseCase implements IAuthUseCases {
  constructor(
    private usersService: IUserService,
    private configService: ConfigService,
  ) {}

  async validateLoginCredentials(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jsonwebtoken.sign(
        { email },
        this.configService.get<string>('JWT_SECRET'),
      );

      return {
        user,
        token,
      };
    }

    return {
      user: null,
      token: null,
    };
  }

  async loginWithSocial(
    dto: LoginWithSocialDTO,
  ): Promise<{ user: User; token: string }> {
    let user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      user = User.fromLoginWithSocialDTO(dto);
      await this.usersService.create(user);
    }

    const token = jsonwebtoken.sign(
      { email: dto.email },
      this.configService.get<string>('JWT_SECRET'),
    );

    return {
      user,
      token,
    };
  }
}
