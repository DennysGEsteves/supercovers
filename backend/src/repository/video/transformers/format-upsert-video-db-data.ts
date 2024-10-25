import { Video } from 'entities/video';
import { IFormatUpsertVideoDBData } from '../interfaces';

export const formatUpsertVideoDBData = (
  video: Video,
): IFormatUpsertVideoDBData => {
  return {
    id: video.id || 'null',
    data: {
      coverId: video.coverId,
      videoTagId: video.videoTagId,
      platformId: video.platformId,
      platform: video.platform,
      artistId: video.artistId || null,
    },
  };
};
