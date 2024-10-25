import { Injectable } from '@nestjs/common';
import { CoverArtist } from 'entities/cover';
import { PrismaService } from 'shared/prisma.service';
import { ICoverArtistRepository } from './interfaces/i-cover-artist-repository';

@Injectable()
export class CoverArtistRepository implements ICoverArtistRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.coverArtist;
  }

  findOrCreate(name: string): Promise<CoverArtist> {
    return this.db.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  find(data: CoverArtist): Promise<CoverArtist> {
    return this.db.findFirst({
      where: {
        name: data.name,
      },
    });
  }

  findByName(artistName: string): Promise<CoverArtist> {
    return this.db.findFirst({
      where: {
        name: artistName,
      },
      include: {
        coverSongs: {
          include: {
            covers: {
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
            },
          },
        },
      },
    });
  }

  create(data: CoverArtist): Promise<CoverArtist> {
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
