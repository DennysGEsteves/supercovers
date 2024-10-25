import { UpdateFeaturedVideosDTO } from 'apis/admin/dto';
import { Video } from 'entities/video';

interface IConstructorParams {
  readonly id?: string;
  readonly videoId: string;
  readonly video?: Video;
  readonly position?: number;
}

export class FeaturedVideo {
  public readonly id?: string;

  public readonly videoId: string;

  public readonly video?: Video;

  public readonly position?: number;

  constructor({ id, videoId, video, position }: IConstructorParams) {
    this.id = id;
    this.videoId = videoId;
    this.video = video;
    this.position = position;
  }

  public static fromUpdateFeaturedVideosDTO(
    dto: UpdateFeaturedVideosDTO,
  ): FeaturedVideo[] {
    return dto.videoIds.map((videoId, position) => {
      return new FeaturedVideo({
        videoId,
        position,
      });
    });
  }
}
