/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { Cover, CoverArtist, CoverSong } from 'entities/cover';
import { ICoverArtistRepository } from 'repository/cover-artist/interfaces/i-cover-artist-repository';
import { ICoverSongRepository } from 'repository/cover-song/interfaces/i-cover-song-repository';
import { ICoverRepository } from 'repository/cover/interfaces/i-cover-repository';
import { ICoverService } from './interfaces';

@Injectable()
export class CoverService implements ICoverService {
  constructor(
    private coverRepository: ICoverRepository,
    private coverArtistRepository: ICoverArtistRepository,
    private coverSongRepository: ICoverSongRepository,
  ) {}

  findOrCreateCoverArtistByName(name: string): Promise<CoverArtist> {
    return this.coverArtistRepository.findOrCreate(name);
  }

  findOrCreateCoverSongByName(
    coverArtistId: string,
    songName: string,
  ): Promise<CoverSong> {
    return this.coverSongRepository.findOrCreate(coverArtistId, songName);
  }

  findOrCreateCover(
    coverArtistId: string,
    coverSongId: string,
  ): Promise<Cover> {
    return this.coverRepository.findOrCreate(coverArtistId, coverSongId);
  }

  find(coverArtistId: string, coverSongId: string): Promise<Cover> {
    return this.coverRepository.find(coverArtistId, coverSongId);
  }

  create(cover: Cover): Promise<Cover> {
    return this.coverRepository.create(cover);
  }

  delete(coverId: string): Promise<void> {
    return this.coverRepository.delete(coverId);
  }

  findCoverArtistsByName(artistName: string): Promise<CoverArtist> {
    return this.coverArtistRepository.findByName(artistName);
  }

  findCoverSongByName(
    coverArtistId: string,
    songName: string,
  ): Promise<CoverSong> {
    return this.coverSongRepository.find(coverArtistId, songName);
  }
}
