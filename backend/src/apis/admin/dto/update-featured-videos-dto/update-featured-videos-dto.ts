import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class UpdateFeaturedVideosDTO {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  readonly videoIds: string[];
}
