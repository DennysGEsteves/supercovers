import { UpsertVideoFromAdminDTO } from 'apis/admin/dto';
import { UpsertMeVideoDTO } from 'apis/video/dto';
import { Video } from 'entities/video';

export abstract class IVideoUseCases {
  abstract findAll(artistId: string): Promise<Video[]>;

  abstract delete(videoId: string): Promise<void>;

  abstract upsertMeVideo(
    artistId: string,
    data: UpsertMeVideoDTO,
  ): Promise<Video>;

  abstract createVideoFromAdmin(dto: UpsertVideoFromAdminDTO): Promise<Video>;
  abstract updateVideoFromAdmin(
    dto: UpsertVideoFromAdminDTO,
    videoId: string,
  ): Promise<Video>;

  abstract addVideoView(ip: string, videoId: string): Promise<void>;
}
