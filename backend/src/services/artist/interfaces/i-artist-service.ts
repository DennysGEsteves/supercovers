import { Artist } from 'entities/artist';

export abstract class IArtistService {
  abstract findById(artistId: string): Promise<Artist>;

  abstract findAll(): Promise<Artist[]>;

  abstract create(artist: Artist): Promise<Artist>;

  abstract upsert(data: Artist): Promise<Artist>;

  abstract findBySlug(slug: string): Promise<Artist>;

  abstract genSlugByUserEmail(email: string): Promise<string>;
}
