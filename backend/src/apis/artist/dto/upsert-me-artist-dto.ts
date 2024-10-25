import { ArtistLevel } from 'entities/artist';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidEnum } from 'utils/validators/is-valid-enum';

export class UpsertMeArtistDTO {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly slug?: string;

  @IsOptional()
  @IsString()
  readonly about?: string;

  @IsOptional()
  @IsString()
  readonly introVideo?: string;

  @IsOptional()
  @IsString()
  readonly facebook?: string;

  @IsOptional()
  @IsString()
  readonly instagram?: string;

  @IsOptional()
  @IsString()
  readonly twitter?: string;

  @IsOptional()
  @IsString()
  readonly website?: string;

  @IsOptional()
  @IsString()
  readonly topImg?: string;

  @IsOptional()
  @IsValidEnum(ArtistLevel)
  readonly level?: ArtistLevel;
}
