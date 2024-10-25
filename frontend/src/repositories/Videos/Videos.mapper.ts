import { VideoReadDTO } from './Videos.dto';

export const mapVideosRead = (data: any[]): VideoReadDTO[] =>
  data.map((item) => ({
    id: item.id,
    artistId: item.artistId,
    platform: item.platform,
    platformId: item.platformId,
    cover: item.cover,
    artist: item.artist,
    createdAt: item.createdAt,
    views: item.views,
    // deletedAt: item.deletedAt,
  }));
