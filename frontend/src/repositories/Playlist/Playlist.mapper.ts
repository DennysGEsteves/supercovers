/* eslint-disable import/no-cycle */
import { VideoReadDTO } from 'repositories';

export const mapVideosRead = (data: any[]): VideoReadDTO[] =>
  data.map((item) => ({
    id: item.video.id,
    artistId: item.video.artistId,
    artist: item.video.artist,
    platform: item.video.platform,
    platformId: item.video.platformId,
    cover: item.video.cover,
    createdAt: item.video.createdAt,
    views: item.video._count.views,
    // deletedAt: item.deletedAt,
  }));
