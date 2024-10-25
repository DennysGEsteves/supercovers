/* eslint-disable max-classes-per-file */
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsValidEnum } from 'utils/validators/is-valid-enum';
import { Platform } from 'entities/video';
import { Type } from 'class-transformer';
import {
  VideoTagFormation,
  VideoTagInstrumentalOrVocal,
  VideoTagSongStyles,
  VideoTagTypeInstruments,
} from 'entities/video/types/tags';

export class UpsertMeVideoExtrasDTO {
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

export class UpsertMeVideoDTO {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsNotEmpty()
  @IsString()
  readonly platformId: string;

  @IsNotEmpty()
  @IsValidEnum(Platform)
  readonly platform?: Platform;

  @IsNotEmpty()
  @IsString()
  readonly artistName: string;

  @IsNotEmpty()
  @IsString()
  readonly songTitle: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpsertMeVideoExtrasDTO)
  readonly extras: UpsertMeVideoExtrasDTO;
}
