/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Favorite } from 'entities/playlist';
import { DuplicatedRecordException } from 'http/exceptions';
import { PrismaService } from 'shared/prisma.service';
import { IFormatCreateFavoriteDBData } from './interfaces';
import { IFavoriteRepository } from './interfaces/i-favorite-repository';

@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.favorite;
  }

  create(data: IFormatCreateFavoriteDBData): Promise<void> {
    return this.db
      .create({
        data,
      })
      .catch((e) => {
        if (e.code === 'P2002') {
          throw new DuplicatedRecordException();
        }

        console.log(e);
        throw new Error('UNKNOWN_ERROR');
      });
  }

  async remove(videoId: string, userId: string): Promise<void> {
    await this.db.deleteMany({
      where: {
        userId,
        videoId,
      },
    });

    await this.updatePositionOnRemove(userId);
  }

  findAllByUserId(userId: string): Promise<Favorite[]> {
    return this.db.findMany({
      where: {
        userId,
      },
      include: {
        video: {
          include: {
            cover: {
              include: {
                coverArtist: true,
                coverSong: true,
              },
            },
            artist: {
              include: {
                user: true,
              },
            },
            _count: {
              select: {
                views: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          position: 'asc',
        },
      ],
    });
  }

  countByUserId(userId: string): Promise<number> {
    return this.db.count({
      where: {
        userId,
      },
    });
  }

  updatePosition(id: string, position: number) {
    return this.db.update({
      where: {
        id,
      },
      data: {
        position,
      },
    });
  }

  deleteAllByVideoId(videoId: string): Promise<void> {
    return this.db.deleteMany({
      where: { videoId },
    });
  }

  private async updatePositionOnRemove(userId: string): Promise<void> {
    const favorites = await this.findAllByUserId(userId);
    const promises = favorites.map((favorite, index) => {
      return this.updatePosition(favorite.id, index + 1);
    });
    await Promise.all(promises);
  }
}
