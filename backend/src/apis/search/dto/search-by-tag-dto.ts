import { IsOptional, IsString } from 'class-validator';

export class SearchByTagsDTO {
  @IsOptional()
  @IsString()
  readonly formation?: string;

  @IsOptional()
  @IsString()
  readonly instrumentalOrVocal?: string;

  @IsOptional()
  @IsString()
  readonly songStyle?: string;

  @IsOptional()
  @IsString()
  readonly typeInstruments?: string;
}
