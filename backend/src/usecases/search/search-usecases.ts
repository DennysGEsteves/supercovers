/* eslint-disable max-params */
import { Injectable } from '@nestjs/common';
import { IValidationMusicProvider } from 'providers/music-validator';
import { ArtistNameParamDTO } from 'apis/video/dto';
import { CoverArtist } from 'entities/cover';
import { ArtistSongParamDTO } from 'apis/search/dto';
import { Video, VideoTag } from 'entities/video';
import { ICoverService } from 'services/cover';
import { IUserService } from 'services/user';
import { User } from 'entities/user';
import { SearchByTagsDTO } from 'apis/search/dto/search-by-tag-dto';
import { IVideoTagService } from 'services/video-tag';
import { ISearchUseCases } from './interfaces';

@Injectable()
export default class SearchUseCases implements ISearchUseCases {
  constructor(
    private validationMusicProvider: IValidationMusicProvider,
    private coverService: ICoverService,
    private usersService: IUserService,
    private videoTagService: IVideoTagService,
  ) {}

  async searchProviderCoverSongs(dto: ArtistNameParamDTO): Promise<string[]> {
    const isValidArtist = await this.validationMusicProvider.getByArtistName(
      dto.artistName,
    );

    if (!isValidArtist) {
      throw new Error('Artista não encontrado');
    }

    const songs = await this.validationMusicProvider.getSongsByArtistName(
      dto.artistName,
    );

    if (!songs.length) {
      throw new Error('Músicas não encontradas com esse nome de artista');
    }

    return songs;
  }

  searchProviderCoverArtists(artistName: string): Promise<string[]> {
    return this.validationMusicProvider.searchArtists(artistName);
  }

  async searchCoverArtistsByName(name: string): Promise<CoverArtist> {
    return this.coverService.findCoverArtistsByName(name);
  }

  async searchCoverSongsByName(dto: ArtistSongParamDTO): Promise<Video[]> {
    const coverArtist = await this.coverService.findCoverArtistsByName(
      dto.artistName,
    );

    if (coverArtist) {
      const coverSong = await this.coverService.findCoverSongByName(
        coverArtist.id,
        dto.songName,
      );

      const cover = await this.coverService.find(coverArtist.id, coverSong.id);

      return cover.videos;
    }

    return [];
  }

  searchSuperArtistsByMatchName(artistName: string): Promise<User[]> {
    return this.usersService.findByMatchName(artistName);
  }

  async searchVideosByTags(dto: SearchByTagsDTO): Promise<Video[]> {
    const videoTag = VideoTag.fromSearchByTagsDTO(dto);
    const list = await this.videoTagService.findByTags(videoTag);

    return list.map((item) => item.video[0]);
  }
}
