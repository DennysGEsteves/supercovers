import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertPlaylistDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
