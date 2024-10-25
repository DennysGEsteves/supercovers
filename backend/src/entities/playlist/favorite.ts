import { User } from 'entities/user';
import { Video } from 'entities/video';

interface IConstructorParams {
  readonly id?: string;
  readonly videoId: string;
  readonly userId: string;
  readonly position: number;
  readonly video?: Video;
  readonly user?: User;
}

export class Favorite {
  public readonly id?: string;

  public readonly videoId: string;

  public readonly userId: string;

  public position: number;

  public readonly video?: Video;

  public readonly user?: User;

  constructor({
    id,
    videoId,
    userId,
    position,
    video,
    user,
  }: IConstructorParams) {
    this.id = id;
    this.videoId = videoId;
    this.userId = userId;
    this.position = position;
    this.video = video;
    this.user = user;
  }

  public static fromAddFavoriteVideoDTO(
    videoId: string,
    userId: string,
    position: number,
  ) {
    return new Favorite({
      videoId,
      userId,
      position,
    });
  }
}
