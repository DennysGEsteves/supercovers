/* eslint-disable import/no-cycle */
import { UpsertPlaylistDTO } from 'apis/playlist/dto';
import { User } from 'entities/user';
import { PlaylistVideo } from './playlist-video';

interface IConstructorParams {
  readonly id?: string;
  readonly name: string;
  readonly description: string;
  readonly userId: string;
  readonly user?: User;
  readonly videos?: PlaylistVideo[];
}

export class Playlist {
  public readonly id?: string;

  public readonly name: string;

  public readonly description: string;

  public readonly userId: string;

  public readonly user?: User;

  public readonly videos?: PlaylistVideo[];

  constructor({
    id,
    name,
    description,
    userId,
    user,
    videos,
  }: IConstructorParams) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.user = user;
    this.videos = videos;
  }

  public static fromUpsertPlaylistDTO(
    dto: UpsertPlaylistDTO,
    userId: string,
    playlistId?: string,
  ) {
    return new Playlist({
      name: dto.name,
      description: dto.description,
      userId,
      id: playlistId,
    });
  }
}
