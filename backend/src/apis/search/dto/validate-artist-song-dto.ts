import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateArtistSongDTO {
  @IsNotEmpty()
  @IsString()
  readonly artistName: string;

  @IsNotEmpty()
  @IsString()
  readonly songTitle: string;

  @IsNotEmpty()
  @IsString()
  readonly platformId: string;
}
