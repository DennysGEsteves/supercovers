/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { VideoView } from 'entities/video';
import { IFormatCreateVideoViewDBData } from 'repository/video-view';
import { PrismaService } from 'shared/prisma.service';
import { subMinutes } from 'date-fns';
import { IVideoViewRepository } from './interfaces';

@Injectable()
export class VideoViewRepository implements IVideoViewRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.videoView;
  }

  async create(data: IFormatCreateVideoViewDBData): Promise<void> {
    const last5min = subMinutes(new Date(), 5).toISOString();

    const view = await this.db.findFirst({
      where: {
        ip: data.ip,
        videoId: data.videoId,
        createdAt: {
          gte: last5min,
        },
      },
    });

    if (!view) {
      await this.db.create({ data });
    }
  }

  async findByVideoCount(limit: number): Promise<VideoView[]> {
    const views = await this.db.groupBy({
      by: ['videoId'],
      take: limit,
      orderBy: {
        _count: {
          videoId: 'desc',
        },
      },
      _count: {
        videoId: true,
      },
    });

    return views;
  }

  async findBySongStyle(style: string, limit: number): Promise<VideoView[]> {
    const views = await this.db.groupBy({
      by: ['videoId'],
      take: limit,
      orderBy: {
        _count: {
          videoId: 'desc',
        },
      },
      _count: {
        videoId: true,
      },
      where: {
        songStyle: style,
      },
    });

    return views;
  }

  async findByCoverArtist(name: string, limit: number): Promise<VideoView[]> {
    const views = await this.db.groupBy({
      by: ['videoId'],
      take: limit,
      orderBy: {
        _count: {
          videoId: 'desc',
        },
      },
      _count: {
        videoId: true,
      },
      where: {
        coverArtistName: name,
      },
    });

    return views;
  }

  async findByArtistCount(limit: number): Promise<VideoView[]> {
    const views = await this.db.groupBy({
      by: ['artistId'],
      take: limit,
      orderBy: {
        _count: {
          artistId: 'desc',
        },
      },
      _count: {
        artistId: true,
      },
    });

    return views.map((item) => {
      item.views = item._count.artistId;
      delete item._count;
      return item;
    });
  }

  async countByArtistId(artistId: string): Promise<number> {
    return this.db.count({
      where: {
        artistId,
      },
    });
  }

  deleteAllByVideoId(videoId: string): Promise<void> {
    return this.db.deleteMany({
      where: { videoId },
    });
  }
}
