import { Injectable } from '@nestjs/common';
import { CoverSong } from 'entities/cover';
import { PrismaService } from 'shared/prisma.service';
import { ICoverSongRepository } from './interfaces/i-cover-song-repository';

@Injectable()
export class CoverSongRepository implements ICoverSongRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.coverSong;
  }

  findOrCreate(coverArtistId: string, songName: string): Promise<CoverSong> {
    return this.db.upsert({
      where: {
        coverArtistId_name: {
          coverArtistId,
          name: songName,
        },
      },
      update: {},
      create: {
        coverArtistId,
        name: songName,
      },
    });
  }

  find(coverArtistId: string, songName: string): Promise<CoverSong> {
    return this.db.findFirst({
      where: {
        coverArtistId,
        name: songName,
      },
    });
  }

  create(data: CoverSong): Promise<CoverSong> {
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
