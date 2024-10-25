/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { DuplicatedRecordException } from 'http/exceptions';
import { PrismaService } from 'shared/prisma.service';
import {
  IFormatCreatePlaylistVideoDBData,
  IPlaylistVideoRepository,
} from './interfaces';

@Injectable()
export class PlaylistVideoRepository implements IPlaylistVideoRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.playlistVideo;
  }

  countByPlaylistId(playlistId: any): Promise<number> {
    return this.db.count({
      where: {
        playlistId,
      },
    });
  }

  async create(data: IFormatCreatePlaylistVideoDBData): Promise<void> {
    await this.db
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

    return null;
  }
}
