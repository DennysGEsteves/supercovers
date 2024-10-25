/* eslint-disable import/no-cycle */
import { CoverSong } from '.';
import { Cover } from './cover';

interface IConstructorParams {
  readonly id?: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly coverSongs?: CoverSong[];
  readonly covers?: Cover[];
}

export class CoverArtist {
  public readonly id?: string;

  public readonly name: string;

  public readonly imageUrl?: string;

  public readonly coverSongs?: CoverSong[];

  public readonly covers?: Cover[];

  constructor({ id, name, imageUrl, coverSongs, covers }: IConstructorParams) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.coverSongs = coverSongs;
    this.covers = covers;
  }

  public static toCoverArtist(name: string) {
    return new CoverArtist({
      name,
    });
  }
}
