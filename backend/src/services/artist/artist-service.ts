import { Injectable } from '@nestjs/common';
import { Artist } from 'entities/artist';
import {
  IArtistsRepository,
  formatCreateArtistDBData,
  formatUpsertArtistDBData,
} from 'repository/artist';
import { IArtistService } from './interfaces';

@Injectable()
export class ArtistService implements IArtistService {
  constructor(private artistsRepository: IArtistsRepository) {}

  async create(artist: Artist): Promise<Artist> {
    try {
      return await this.artistsRepository.create(
        formatCreateArtistDBData(artist),
      );
    } catch (e) {
      if (e.meta.target === 'Artist_name_key') {
        throw new Error('Este artista já existe em nosso sistema');
      } else {
        throw new Error('Ocorreu um erro ao tentar criar o artista');
      }
    }
  }

  upsert(artist: Artist): Promise<Artist> {
    return this.artistsRepository.upsert(formatUpsertArtistDBData(artist));
  }

  findById(artistId: string): Promise<Artist> {
    return this.artistsRepository.findById(artistId);
  }

  findAll(): Promise<Artist[]> {
    return this.artistsRepository.findAll();
  }

  async findBySlug(slug: string) {
    const artist = await this.artistsRepository.findBySlug(slug);
    return artist ? Artist.fromDBData(artist) : null;
  }

  public async genSlugByUserEmail(email: string): Promise<string> {
    const username = email.split('@')[0];
    const artists = await this.artistsRepository.findAllBySlug(username);

    if (artists.length) {
      return `${username}_${artists.length + 1}`;
    }

    return username;
  }
}
