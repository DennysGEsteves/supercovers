import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsValidEnum } from 'utils/validators/is-valid-enum';
import { Platform } from 'entities/video';
import { Type } from 'class-transformer';
import { CreateVideoExtras } from './create-video-extras';

export class UpsertVideoFromAdminDTO {
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

  @IsOptional()
  @IsString()
  readonly slug?: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateVideoExtras)
  readonly extras: CreateVideoExtras;
}
