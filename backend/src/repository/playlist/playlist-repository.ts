/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Playlist } from 'entities/playlist';
import { PrismaService } from 'shared/prisma.service';
import { IFormatUpsertPlaylistDBData } from './interfaces';
import { IPlaylistRepository } from './interfaces/i-playlist-repository';

@Injectable()
export class PlaylistRepository implements IPlaylistRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.playlist;
  }

  findById(playlistId: string): Promise<Playlist> {
    return this.db
      .findFirst({
        where: {
          id: playlistId,
        },
        include: {
          videos: {
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
          },
        },
      })
      .catch((e) => {
        console.log(e);
        throw new Error('UNKNOWN_ERROR');
      });
  }

  create(data: IFormatUpsertPlaylistDBData): Promise<void> {
    return this.db
      .create({
        data,
      })
      .catch((e) => {
        console.log(e);
        throw new Error('UNKNOWN_ERROR');
      });
  }

  update(data: IFormatUpsertPlaylistDBData, playlistId: string): Promise<void> {
    return this.db.update({
      where: { id: playlistId },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.db.delete({
      where: {
        id,
      },
    });
  }

  findAllByUserId(userId: string): Promise<Playlist[]> {
    return this.db.findMany({
      where: {
        userId,
      },
    });
  }

  findAllByUserIdAndPlaylistId(
    id: string,
    userId: string,
  ): Promise<Playlist[]> {
    return this.db.findMany({
      where: {
        userId,
        id,
      },
    });
  }
}
