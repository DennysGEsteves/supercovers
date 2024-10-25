import { UpsertVideoFromAdminDTO } from 'apis/admin/dto';
import { Artist } from 'entities/artist';
import { UpsertMeVideoDTO } from 'apis/video/dto';
import { Cover } from 'entities/cover';
import { VideoTag } from '@prisma/client';
import { Platform } from './types';
import { VideoView } from './video-view';

interface IConstructorParams {
  readonly id?: string;
  readonly artistId?: string;
  readonly platformId: string;
  readonly platform: Platform;
  readonly coverId?: string;
  readonly videoTagId?: string;
  readonly cover?: Cover;
  readonly views?: number;
  readonly createdAt?: Date;
  readonly deletedAt?: Date;
  readonly artist?: Artist;
  readonly tags?: VideoTag;
}

export class Video {
  public readonly id?: string;

  public readonly artistId?: string;

  public readonly platformId: string;

  public readonly platform: Platform;

  public readonly coverId?: string;

  public readonly videoTagId?: string;

  public readonly cover?: Cover;

  public readonly views?: number;

  public readonly createdAt?: Date;

  public readonly deletedAt?: Date;

  public readonly artist?: Artist;

  public readonly tags?: VideoTag;

  constructor({
    id,
    artistId,
    platform,
    platformId,
    coverId,
    videoTagId,
    views,
    createdAt,
    deletedAt,
    artist,
    cover,
    tags,
  }: IConstructorParams) {
    this.id = id;
    this.artistId = artistId;
    this.platform = platform;
    this.platformId = platformId;
    this.videoTagId = videoTagId;
    this.coverId = coverId;
    this.cover = cover;
    this.views = views;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
    this.artist = artist;
    this.tags = tags;
  }

  public static fromUpsertMeVideoDTO(
    dto: UpsertMeVideoDTO,
    artistId: string,
    coverId: string,
    videoTagId?: string,
    videoId?: string,
  ) {
    return new Video({
      artistId,
      id: dto.id,
      platform: dto.platform,
      platformId: dto.platformId,
      coverId,
      videoTagId,
      ...(videoId ? { id: videoId } : {}),
    });
  }

  public static fromUpsertVideoFromAdminDTO(
    dto: UpsertVideoFromAdminDTO,
    artist?: Artist,
    coverId?: string,
    videoTagId?: string,
    videoId?: string,
  ) {
    return new Video({
      artistId: artist?.id,
      coverId,
      videoTagId,
      platform: dto.platform,
      platformId: dto.platformId,
      ...(videoId ? { id: videoId } : {}),
    });
  }

  public static fromUpdateVideoFromAdminDTO(
    newData: UpsertVideoFromAdminDTO,
    oldData: Video,
    coverId?: string,
    videoTagId?: string,
  ) {
    return new Video({
      id: oldData.id,
      artistId: oldData.artistId,
      coverId,
      videoTagId,
      platform: newData.platform,
      platformId: newData.platformId,
    });
  }

  public static fromVideosViewsList(videosViews: VideoView[]) {
    return videosViews.map((videosView) => {
      return new Video({
        artistId: videosView.video.artist.id,
        cover: videosView.video.cover as Cover,
        coverId: videosView.video.cover.id,
        platform: videosView.video.platform,
        platformId: videosView.video.platformId,
      });
    });
  }
}
