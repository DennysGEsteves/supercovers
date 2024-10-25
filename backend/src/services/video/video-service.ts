import { Injectable } from '@nestjs/common';
import { Video } from 'entities/video';
import { formatUpsertVideoDBData, IVideoRepository } from 'repository/video';
import { IVideoViewRepository } from 'repository/video-view';
import { IVideoService } from './interfaces';

@Injectable()
export class VideoService implements IVideoService {
  constructor(
    private videoRepository: IVideoRepository,
    private videoViewRepository: IVideoViewRepository,
  ) {}

  findAll(artistId: string): Promise<Video[]> {
    return this.videoRepository.findAll(artistId);
  }

  findById(videoId: string): Promise<Video> {
    return this.videoRepository.findById(videoId);
  }

  upsert(video: Video) {
    const params = formatUpsertVideoDBData(video);
    return this.videoRepository.upsert(params);
  }

  async delete(videoId: string) {
    await this.videoRepository.delete(videoId);
  }

  async getTopVideos(limit: number): Promise<Video[]> {
    const videoviews = await this.videoViewRepository.findByVideoCount(limit);

    const promise = videoviews.map(({ videoId }) => {
      return this.videoRepository.findByIdIncludeArtistAndUser(videoId);
    });

    return Promise.all(promise);
  }
}
