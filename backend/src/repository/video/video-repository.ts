/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Video } from 'entities/video';
import { PrismaService } from 'shared/prisma.service';
import { IFormatUpsertVideoDBData, IVideoRepository } from './interfaces';

@Injectable()
export class VideoRepository implements IVideoRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.video;
  }

  async findAll(artistId: string): Promise<Video[]> {
    const videos = await this.db.findMany({
      where: {
        artistId,
      },
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
        tags: true,
        _count: {
          select: {
            views: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return videos.map((item) => {
      item.views = item._count.views;
      delete item._count;
      return item;
    });
  }

  async findById(id: string): Promise<Video> {
    const res = await this.db.findFirst({
      where: {
        id,
      },
      include: {
        cover: {
          include: {
            coverArtist: true,
            coverSong: true,
          },
        },
        artist: true,
        tags: true,
      },
    });

    return res;
  }

  async findByIdIncludeArtistAndUser(id: string): Promise<Video> {
    const video = await this.db.findFirst({
      where: {
        id,
      },
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
    });

    video.views = video._count.views;
    delete video._count;

    return video;
  }

  findByTotalViews(limit: number): Promise<Video[]> {
    return this.db.findMany({
      include: {
        artist: {
          include: {
            user: true,
          },
        },
      },
      take: limit,
      skip: 1,
      orderBy: {
        views: 'asc',
      },
    });
  }

  async upsert(data: IFormatUpsertVideoDBData): Promise<Video> {
    const res = await this.db
      .upsert({
        where: {
          id: data.id,
        },
        update: data.data,
        create: data.data,
        include: {
          cover: true,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new Error('UNKNOWN_ERROR');
      });

    return res;
  }

  delete(videoId: string): Promise<void> {
    return this.db.delete({
      where: {
        id: videoId,
      },
    });
  }
}
