import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'entities/user';
import { IUsersRepository } from 'repository/user/interfaces';
// import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersRepository: IUsersRepository,
    configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    if (payload.isAdmin) {
      return true;
    }

    const userWithIncludes = await this.usersRepository.findByEmailWithIncludes(
      payload.email,
    );

    return User.fromJwtStrategy(userWithIncludes);
  }

  parseCookie(str) {
    return str
      .split(';')
      .map((v) => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});
  }
}
