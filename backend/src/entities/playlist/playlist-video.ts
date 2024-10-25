/* eslint-disable import/no-cycle */
import { Video } from 'entities/video';
import { Playlist } from './playlist';

interface IConstructorParams {
  readonly id?: string;
  readonly videoId: string;
  readonly playlistId: string;
  readonly position: number;
  readonly playlist?: Playlist;
  readonly video?: Video;
}

export class PlaylistVideo {
  public readonly id?: string;

  public readonly videoId: string;

  public readonly playlistId: string;

  public readonly position: number;

  public readonly playlist?: Playlist;

  public readonly video?: Video;

  constructor({
    id,
    videoId,
    playlistId,
    position,
    playlist,
    video,
  }: IConstructorParams) {
    this.id = id;
    this.videoId = videoId;
    this.playlistId = playlistId;
    this.position = position;
    this.playlist = playlist;
    this.video = video;
  }

  public static fromAddPlaylistVideoParams(
    playlistId: string,
    videoId: string,
    position: number,
  ) {
    return new PlaylistVideo({
      videoId,
      playlistId,
      position,
    });
  }
}
