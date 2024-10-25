/* eslint-disable import/no-cycle */
import { Cover } from './cover';
import { CoverArtist } from './cover-artist';

interface IConstructorParams {
  readonly id?: string;
  readonly name: string;
  readonly coverArtistId?: string;
  readonly coverArtist?: CoverArtist;
  readonly covers?: Cover[];
}

export class CoverSong {
  public readonly id?: string;

  public readonly name: string;

  public readonly coverArtistId?: string;

  public readonly coverArtist?: CoverArtist;

  public readonly covers?: Cover[];

  constructor({
    id,
    name,
    coverArtistId,
    coverArtist,
    covers,
  }: IConstructorParams) {
    this.id = id;
    this.name = name;
    this.coverArtistId = coverArtistId;
    this.coverArtist = coverArtist;
    this.covers = covers;
  }
}
