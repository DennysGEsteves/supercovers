import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistSongParamDTO {
  @IsNotEmpty()
  @IsString()
  readonly artistName: string;

  @IsNotEmpty()
  @IsString()
  readonly songName: string;
}
