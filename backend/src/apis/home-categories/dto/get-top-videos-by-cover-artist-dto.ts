import { IsNotEmpty, IsString } from 'class-validator';

export class GetTopVideosByCoverArtistDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
