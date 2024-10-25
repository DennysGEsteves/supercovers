import { Artist } from 'entities/artist';
import { ArtistUser } from 'entities/artist/types/artist-user';
import {
  IFormatCreateArtistDbData,
  IFormatUpsertArtistDbData,
} from './request-data';

export abstract class IArtistsRepository {
  abstract create(artist: IFormatCreateArtistDbData): Promise<Artist>;
  abstract findByUserId(userId: string): Promise<Artist>;
  abstract findById(artistId: string): Promise<Artist>;
  abstract findByIdIncludeUser(artistId: string): Promise<ArtistUser>;
  abstract findBySlug(slug: string): Promise<ArtistUser>;
  abstract findAllBySlug(slug: string): Promise<Artist[]>;
  abstract findAll(): Promise<Artist[]>;
  abstract upsert(data: IFormatUpsertArtistDbData): Promise<Artist>;
}
