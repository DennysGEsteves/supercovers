import { CoverArtist } from 'entities/cover';

export abstract class ICoverArtistRepository {
  abstract find(cover: CoverArtist): Promise<CoverArtist>;
  abstract findByName(artistName: string): Promise<CoverArtist>;
  abstract findOrCreate(name: string): Promise<CoverArtist>;
  abstract create(cover: CoverArtist): Promise<CoverArtist>;
  abstract delete(id: string): Promise<void>;
}
