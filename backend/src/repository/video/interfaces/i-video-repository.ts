import { Video } from 'entities/video';
import { IFormatUpsertVideoDBData } from './request-data';

export abstract class IVideoRepository {
  abstract findAll(artistId: string): Promise<Video[]>;
  abstract findById(videoId: string): Promise<Video>;
  abstract findByIdIncludeArtistAndUser(videoId: string): Promise<Video>;
  abstract findByTotalViews(limit: number): Promise<Video[]>;
  abstract upsert(params: IFormatUpsertVideoDBData): Promise<Video>;
  abstract delete(videoId: string): Promise<void>;
}
