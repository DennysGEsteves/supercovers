/* eslint-disable import/no-cycle */
import { CoverArtist } from '@prisma/client';
import { Video } from 'entities/video';
import { CoverSong } from './cover-song';

interface IConstructorParams {
  readonly id?: string;
  readonly coverArtistId?: string;
  readonly coverSongId?: string;
  readonly coverArtist?: CoverArtist;
  readonly coverSong?: CoverSong;
  readonly videos?: Video[];
}

export class Cover {
  public readonly id?: string;

  public readonly coverArtistId?: string;

  public readonly coverSongId?: string;

  public readonly coverArtist?: CoverArtist;

  public readonly coverSong?: CoverSong;

  public readonly videos?: Video[];

  constructor({
    id,
    coverArtistId,
    coverSongId,
    coverArtist,
    coverSong,
    videos,
  }: IConstructorParams) {
    this.id = id;
    this.coverArtistId = coverArtistId;
    this.coverSongId = coverSongId;
    this.coverArtist = coverArtist;
    this.coverSong = coverSong;
    this.videos = videos;
  }

  // public static toCover(
  //   artistName: string,
  //   songTitle: string,
  //   status?: CoverStatus,
  // ) {
  //   return new Cover({
  //     artistName,
  //     songTitle,
  //     status: status || CoverStatus.APPROVED,
  //   });
  // }
}
