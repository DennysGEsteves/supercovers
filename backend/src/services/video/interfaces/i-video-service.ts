import { Video } from 'entities/video';

export abstract class IVideoService {
  abstract findAll(artistId: string): Promise<Video[]>;

  abstract findById(videoId: string): Promise<Video>;

  abstract upsert(artistVideo: Video): Promise<Video>;

  abstract delete(videoId: string): Promise<void>;
}
