/* eslint-disable max-depth */
import { Injectable } from '@nestjs/common';
import { User } from 'entities/user';
import { PrismaService } from 'shared/prisma.service';
import { ExistingUserOnCreateException } from 'http/exceptions';
import { IFormatCreateUserDbData, IUsersRepository } from './interfaces';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.user;
  }

  create(data: IFormatCreateUserDbData): Promise<User> {
    try {
      return this.db.create({
        data,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ExistingUserOnCreateException('');
      }
    }

    return undefined;
  }

  findAll(): Promise<User[]> {
    return this.db.findMany();
  }

  findByEmail(email: string): Promise<User> {
    return this.db.findFirst({
      where: { email },
    });
  }

  async findByEmailWithIncludes(email: string): Promise<User> {
    try {
      const res = await this.db.findFirst({
        where: { email },
        include: {
          artist: true,
          favorites: true,
        },
      });

      return User.fromFindByEmailIncludeArtistDBResponse(res);
    } catch (e) {
      console.log(e);
      throw new Error('UNKNOWN_ERROR');
    }
  }

  findManyByMatchName(name: string): Promise<User[]> {
    return this.db.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        artist: true,
      },
    });
  }

  update(data: { userId: string; data: User }): Promise<User> {
    try {
      return this.db.update({
        where: { id: data.userId },
        data: data.data,
      });
    } catch (e) {
      throw new Error('UNKNOWN_ERROR');
    }
  }
}
