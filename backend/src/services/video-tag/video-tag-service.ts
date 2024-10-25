/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { VideoTag } from 'entities/video';
import { IVideoTagRepository } from 'repository/video-tag';
import { IVideoTagService } from './interfaces';

@Injectable()
export class VideoTagService implements IVideoTagService {
  constructor(private videoTagRepository: IVideoTagRepository) {}

  upsertTags(tags: VideoTag): Promise<VideoTag> {
    return this.videoTagRepository.create(tags);
  }

  deleteByVideoId(videoId: string): Promise<void> {
    return this.videoTagRepository.deleteByVideoId(videoId);
  }

  findByTags(videoTags: VideoTag): Promise<VideoTag[]> {
    return this.videoTagRepository.findManyByTags(videoTags);
  }
}
