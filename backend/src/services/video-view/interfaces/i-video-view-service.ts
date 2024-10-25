import { Artist } from 'entities/artist';
import { Video, VideoView } from 'entities/video';

export abstract class IVideoViewService {
  abstract getTopArtists(limit: number): Promise<Artist[]>;

  abstract getArtistTotalViews(artistId: string): Promise<number>;

  abstract getTopVideos(limit: number): Promise<Video[]>;

  abstract getTopVideosBySongStyle(
    style: string,
    limit: number,
  ): Promise<Video[]>;

  abstract getTopVideosByCoverArtist(
    name: string,
    limit: number,
  ): Promise<Video[]>;

  abstract addVideoView(videoView: VideoView): Promise<void>;

  abstract deleteAllByVideoId(videoId: string): Promise<void>;
}
