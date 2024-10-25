/* eslint-disable import/no-cycle */
import { VideoTag } from 'entities/video';

export abstract class IVideoTagRepository {
  abstract create(tags: VideoTag): Promise<VideoTag>;
  abstract deleteByVideoId(videoId: string): Promise<void>;
  abstract findManyByTags(videoTags: VideoTag): Promise<VideoTag[]>;
}
