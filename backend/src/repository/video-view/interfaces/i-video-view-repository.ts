import { VideoView } from 'entities/video';
import { IFormatCreateVideoViewDBData } from 'repository/video-view';

export abstract class IVideoViewRepository {
  abstract findByVideoCount(limit: number): Promise<VideoView[]>;
  abstract findBySongStyle(style: string, limit: number): Promise<VideoView[]>;
  abstract findByCoverArtist(name: string, limit: number): Promise<VideoView[]>;
  abstract findByArtistCount(limit: number): Promise<VideoView[]>;
  abstract create(data: IFormatCreateVideoViewDBData): Promise<void>;
  abstract countByArtistId(artistId: string): Promise<number>;
  abstract deleteAllByVideoId(videoId: string): Promise<void>;
}
