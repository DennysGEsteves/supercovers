/* eslint-disable prettier/prettier */
import { Controller, Body, Post } from '@nestjs/common';
import { ISearchUseCases } from 'usecases/search';
import { ArtistNameParamDTO, ArtistSongParamDTO } from './dto';
import { SearchByTagsDTO } from './dto/search-by-tag-dto';
import { SearchPresenters } from './presenters';

@Controller('search')
export class SearchRoute {
  constructor(private readonly searchUseCases: ISearchUseCases) {}

  @Post('cover-songs-provider')
  searchProviderCoverSongs(@Body() dto: ArtistNameParamDTO) {
    return this.searchUseCases.searchProviderCoverSongs(dto);
  }

  @Post('cover-artists-provider')
  searchProviderCoverArtist(@Body() dto: ArtistNameParamDTO) {
    return this.searchUseCases.searchProviderCoverArtists(dto.artistName);
  }

  @Post('cover-artists-register')
  async searchCoverArtistsRegister(@Body() dto: ArtistNameParamDTO) {
    const cover = await this.searchUseCases.searchCoverArtistsByName(
      dto.artistName,
    );
    return SearchPresenters.toSearchCoverArtistRegisterPresenter(cover);
  }

  @Post('cover-songs-register')
  searchCoverSongsRegister(@Body() dto: ArtistSongParamDTO) {
    return this.searchUseCases.searchCoverSongsByName(dto);
  }

  @Post('super-artists')
  async searchSuperArtists(@Body() dto: ArtistNameParamDTO) {
    const users = await this.searchUseCases.searchSuperArtistsByMatchName(
      dto.artistName,
    );
    return users.map((user) => SearchPresenters.toSearchSuperArtistsPresenter(user));
  }

  @Post('tags')
  async searchVideosByTags(@Body() dto: SearchByTagsDTO) {
    return this.searchUseCases.searchVideosByTags(dto);
  }
}
