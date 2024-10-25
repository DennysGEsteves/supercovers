import {
  CreateArtistFromAdminDTO,
  UpdateArtistFromAdminDTO,
} from 'apis/admin/dto';
import { UpsertMeArtistDTO } from 'apis/artist/dto';
import { Artist } from 'entities/artist';
import { User } from 'entities/user';

export abstract class IArtistsUseCases {
  abstract findById(artistId: string): Promise<Artist>;

  abstract findAll(): Promise<Artist[]>;

  abstract findBySlug(slug: string): Promise<Artist>;

  abstract createArtistFromAdmin(
    dto: CreateArtistFromAdminDTO,
  ): Promise<Artist>;

  abstract updateArtistFromAdmin(
    dto: UpdateArtistFromAdminDTO,
  ): Promise<Artist>;

  abstract upsertMeArtist(params: {
    dto: UpsertMeArtistDTO;
    artist: Artist;
    user: User;
  }): Promise<Artist>;

  abstract getArtistTopImg(artistId: string): Promise<string>;
}
