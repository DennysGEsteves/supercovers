import { UpdateFeaturedVideosDTO } from 'apis/admin/dto';
import { Video } from 'entities/video';

export abstract class IFeaturedVideoUseCases {
  abstract findAll(): Promise<Video[]>;
  abstract update(dto: UpdateFeaturedVideosDTO): Promise<void>;
}
