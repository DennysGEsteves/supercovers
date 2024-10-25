import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistNameParamDTO {
  @IsNotEmpty()
  @IsString()
  readonly artistName: string;
}
