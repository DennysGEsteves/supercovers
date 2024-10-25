import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jsonwebtoken from 'jsonwebtoken';
import { IAdminUseCases } from './interfaces';

@Injectable()
export class AdminUseCases implements IAdminUseCases {
  constructor(private configService: ConfigService) {}

  async validateLoginCredentials(
    login: string,
    password: string,
  ): Promise<string> {
    if (login === 'admin@email.com' && password === 'admin') {
      const token = jsonwebtoken.sign(
        { login, isAdmin: true },
        this.configService.get<string>('JWT_SECRET'),
      );

      return token;
    }

    return null;
  }
}
