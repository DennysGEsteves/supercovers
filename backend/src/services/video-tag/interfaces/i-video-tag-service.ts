import { VideoTag } from 'entities/video';

export abstract class IVideoTagService {
  abstract upsertTags(tags: VideoTag): Promise<VideoTag>;
  abstract deleteByVideoId(videoId: string): Promise<void>;
  abstract findByTags(videoTags: VideoTag): Promise<VideoTag[]>;
}
