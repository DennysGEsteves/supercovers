import { VideoView as VideoViewsDB } from '@prisma/client';
import { VideoView } from 'entities/video';
import { IFormatCreateVideoViewDBData } from '../interfaces';

export const formatCreateVideoViewDBData = (
  videoView: VideoView,
): IFormatCreateVideoViewDBData => {
  return {
    ip: videoView.ip,
    videoId: videoView.videoId,
    artistId: videoView.artistId,
    coverArtistName: videoView.coverArtistName,
    coverSongName: videoView.coverSongName,
    songStyle: videoView.songStyle,
    createdAt: videoView.createdAt,
  } as VideoViewsDB;
};
