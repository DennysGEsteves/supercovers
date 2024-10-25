import { Injectable } from '@nestjs/common';
import { Cover } from 'entities/cover';
import { PrismaService } from 'shared/prisma.service';
import { ICoverRepository } from './interfaces/i-cover-repository';

@Injectable()
export class CoverRepository implements ICoverRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.cover;
  }

  findOrCreate(coverArtistId: string, coverSongId: string): Promise<Cover> {
    return this.db.upsert({
      where: {
        coverArtistId_coverSongId: {
          coverArtistId,
          coverSongId,
        },
      },
      update: {},
      create: {
        coverArtistId,
        coverSongId,
      },
    });
  }

  find(coverArtistId: string, coverSongId: string): Promise<Cover> {
    return this.db.findFirst({
      where: {
        coverArtistId,
        coverSongId,
      },
      include: {
        videos: {
          include: {
            artist: {
              include: {
                user: true,
              },
            },
            cover: {
              include: {
                coverSong: true,
                coverArtist: true,
              },
            },
          },
        },
      },
    });
  }

  create(data: Cover): Promise<Cover> {
    return this.db.create({
      data,
    });
  }

  delete(id: string): Promise<void> {
    return this.db.delete({
      where: {
        id,
      },
    });
  }
}
