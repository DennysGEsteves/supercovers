/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { FeaturedVideo } from 'entities/featured-video';
import { Video } from 'entities/video';
import { PrismaService } from 'shared/prisma.service';
import { IFeaturedVideoRepository } from './interfaces/i-featured-video-repository';

@Injectable()
export class FeaturedVideoRepository implements IFeaturedVideoRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.featuredVideo;
  }

  async findAll(): Promise<Video[]> {
    const featuredVideos = await this.db.findMany({
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
    });

    return featuredVideos.map(({ video }) => {
      video.views = video._count.views;
      return video;
    });
  }

  async update(data: FeaturedVideo[]): Promise<void> {
    await this.db.deleteMany({});

    await this.db.createMany({
      data: data.map((featuredVideo) => {
        return {
          videoId: featuredVideo.videoId,
          position: featuredVideo.position,
        };
      }),
    });
  }

  deleteAllByVideoId(videoId: string): Promise<void> {
    return this.db.deleteMany({
      where: { videoId },
    });
  }
}
