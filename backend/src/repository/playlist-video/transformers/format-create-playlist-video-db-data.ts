import { PlaylistVideo as PlaylistVideoDB } from '@prisma/client';
import { PlaylistVideo } from 'entities/playlist/playlist-video';
import { IFormatCreatePlaylistVideoDBData } from '../interfaces';

export const formatCreatePlaylistVideoDBData = (
  playlistVideo: PlaylistVideo,
): IFormatCreatePlaylistVideoDBData => {
  return {
    playlistId: playlistVideo.playlistId,
    videoId: playlistVideo.videoId,
    position: playlistVideo.position,
  } as PlaylistVideoDB;
};
