import { FeaturedVideo } from 'entities/featured-video';
import { Video } from 'entities/video';

export abstract class IFeaturedVideoService {
  abstract findAll(): Promise<Video[]>;
  abstract update(featuredVideos: FeaturedVideo[]): Promise<void>;
  abstract deleteAllByVideoId(videoId: string): Promise<void>;
}
