import { ArtistLevel } from 'entities/artist';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidEnum } from 'utils/validators/is-valid-enum';

export class UpdateArtistFromAdminDTO {
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsValidEnum(ArtistLevel)
  readonly level?: ArtistLevel;

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
  @IsString()
  readonly id?: string;
}
