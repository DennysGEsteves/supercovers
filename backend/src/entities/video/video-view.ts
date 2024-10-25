import { Artist } from 'entities/artist';
import { Cover } from 'entities/cover';
import { Video } from 'entities/video';
import { VideoTag } from './video-tag';

interface IConstructorParams {
  readonly id?: string;
  readonly videoId: string;
  readonly artistId: string;
  readonly coverArtistName: string;
  readonly coverSongName: string;
  readonly songStyle: string;
  readonly ip: string;
  readonly createdAt: Date;
  readonly video?: Video;
  readonly views?: number;
}

export class VideoView {
  public readonly id?: string;

  public readonly videoId: string;

  public readonly artistId: string;

  public readonly coverArtistName: string;

  public readonly coverSongName: string;

  public readonly songStyle: string;

  public readonly ip: string;

  public readonly createdAt?: Date;

  public readonly video?: Video;

  public readonly views?: number;

  constructor({
    id,
    videoId,
    artistId,
    coverArtistName,
    coverSongName,
    songStyle,
    ip,
    createdAt,
    video,
    views,
  }: IConstructorParams) {
    this.id = id;
    this.videoId = videoId;
    this.artistId = artistId;
    this.coverArtistName = coverArtistName;
    this.coverSongName = coverSongName;
    this.songStyle = songStyle;
    this.ip = ip;
    this.createdAt = createdAt;
    this.video = video;
    this.views = views;
  }

  public static fromCreateVideoViewParams(
    ip: string,
    videoId: string,
    artist: Artist,
    cover: Cover,
    tags: VideoTag,
  ) {
    return new VideoView({
      videoId,
      artistId: artist.id,
      coverArtistName: cover.coverArtist.name,
      coverSongName: cover.coverSong.name,
      songStyle: tags.songStyle,
      ip,
      createdAt: new Date(),
    });
  }
}
