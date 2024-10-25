import { IsNotEmpty, IsString } from 'class-validator';
import { VideoTagSongStyles } from 'entities/video/types/tags';
import { IsValidEnum } from 'utils/validators/is-valid-enum';

export class GetTopVideosBySongStyleDTO {
  @IsNotEmpty()
  @IsString()
  @IsValidEnum(VideoTagSongStyles)
  readonly style: VideoTagSongStyles;
}
