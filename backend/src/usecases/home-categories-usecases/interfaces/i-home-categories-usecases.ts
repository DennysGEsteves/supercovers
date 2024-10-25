import { Artist } from 'entities/artist';
import { Video } from 'entities/video';

export abstract class IHomeCategoriesUseCases {
  abstract getFeaturedVideos(): Promise<Video[]>;
  abstract getTopVideos(): Promise<Video[]>;
  abstract getTopVideosBySongStyle(style: string): Promise<Video[]>;
  abstract getTopVideosByCoverArtist(name: string): Promise<Video[]>;
  abstract getTopArtists(): Promise<Artist[]>;
}
