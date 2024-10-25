/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { VideoTag } from 'entities/video';
import { PrismaService } from 'shared/prisma.service';
import { IVideoTagRepository } from './interfaces';

@Injectable()
export class VideoTagRepository implements IVideoTagRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.videoTag;
  }

  create(tags: VideoTag): Promise<VideoTag> {
    return this.db.create({
      data: tags,
    });
  }

  async findManyByTags(videoTags: VideoTag): Promise<VideoTag[]> {
    return this.db
      .findMany({
        where: videoTags,
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
            },
          },
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteByVideoId(videoId: string): Promise<void> {
    return this.db.deleteMany({
      where: { videoId },
    });
  }
}
