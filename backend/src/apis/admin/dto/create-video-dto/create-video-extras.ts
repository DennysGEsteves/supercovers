import { IsNotEmpty, IsString } from 'class-validator';
import {
  VideoTagFormation,
  VideoTagInstrumentalOrVocal,
  VideoTagSongStyles,
  VideoTagTypeInstruments,
} from 'entities/video/types/tags';
import { IsValidEnum } from 'utils/validators/is-valid-enum';

export class CreateVideoExtras {
  @IsNotEmpty()
  @IsString()
  @IsValidEnum(VideoTagSongStyles)
  readonly songStyle: VideoTagSongStyles;

  @IsNotEmpty()
  @IsString()
  @IsValidEnum(VideoTagFormation)
  readonly formation: VideoTagFormation;

  @IsNotEmpty()
  @IsString()
  @IsValidEnum(VideoTagInstrumentalOrVocal)
  readonly instrumentalOrVocal: VideoTagInstrumentalOrVocal;

  @IsNotEmpty()
  @IsString()
  @IsValidEnum(VideoTagTypeInstruments)
  readonly typeInstruments: VideoTagTypeInstruments;
}
