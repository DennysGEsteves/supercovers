import { UpsertVideoFromAdminDTO } from 'apis/admin/dto';
import { SearchByTagsDTO } from 'apis/search/dto/search-by-tag-dto';
import { UpsertMeVideoDTO } from 'apis/video/dto';
import { Video } from 'entities/video';

interface IConstructorParams {
  readonly id?: string;
  readonly songStyle?: string;
  readonly instrumentalOrVocal?: string;
  readonly typeInstruments?: string;
  readonly formation?: string;
  readonly videoId?: string;
  readonly createdAt?: Date;
  readonly video?: Video;
}

export class VideoTag {
  public readonly id?: string;

  public readonly songStyle?: string;

  public readonly instrumentalOrVocal?: string;

  public readonly typeInstruments?: string;

  public readonly formation?: string;

  public readonly videoId?: string;

  public readonly createdAt?: Date;

  public readonly video?: Video;

  constructor({
    id,
    videoId,
    songStyle,
    instrumentalOrVocal,
    typeInstruments,
    formation,
    video,
    createdAt,
  }: IConstructorParams) {
    this.id = id;
    this.videoId = videoId;
    this.songStyle = songStyle;
    this.instrumentalOrVocal = instrumentalOrVocal;
    this.typeInstruments = typeInstruments;
    this.formation = formation;
    this.createdAt = createdAt;
    this.video = video;
  }

  public static fromUpsertMeVideoDTO(dto: UpsertMeVideoDTO, videoId: string) {
    return new VideoTag({
      ...dto.extras,
      videoId,
    });
  }

  public static fromUpsertVideoFromAdminDTO(
    dto: UpsertVideoFromAdminDTO,
    videoId: string,
  ) {
    return new VideoTag({
      ...dto.extras,
      videoId,
    });
  }

  public static fromSearchByTagsDTO(dto: SearchByTagsDTO) {
    return new VideoTag({
      ...dto,
    });
  }
}
