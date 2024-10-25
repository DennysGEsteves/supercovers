/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { IHomeCategoriesUseCases } from 'usecases/home-categories-usecases';
import { GetTopVideosBySongStyleDTO, GetTopVideosByCoverArtistDTO } from './dto';
import { HomeCategoriesPresenters } from './presenters';

@Controller('home-categories')
export class HomeCategoriesRoute {
  constructor(
    private readonly homeCategoriesUseCases: IHomeCategoriesUseCases,
  ) {}

  @Get('featured-videos')
  async getFeaturedVideos() {
    const videos = await this.homeCategoriesUseCases.getFeaturedVideos();
    return HomeCategoriesPresenters.toFeaturedVideosPresenter(videos);
  }

  @Get('top-videos')
  async getTopVideos() {
    const videos = await this.homeCategoriesUseCases.getTopVideos();
    return HomeCategoriesPresenters.toTopVideosPresenter(videos);
  }

  @Get('top-artists')
  async getTopArtist() {
    const artists = await this.homeCategoriesUseCases.getTopArtists();
    return artists.map((artist) => HomeCategoriesPresenters.toGetTopArtistsPresenter(artist));
  }

  @Post('top-by-style')
  async getTopVideosBySongStyle(@Body() dto: GetTopVideosBySongStyleDTO) {
    const videos = await this.homeCategoriesUseCases.getTopVideosBySongStyle(dto.style);
    return HomeCategoriesPresenters.toTopVideosPresenter(videos);
  }

  @Post('top-by-cover-artist')
  async getTopVideosByCoverArtist(@Body() dto: GetTopVideosByCoverArtistDTO) {
    const videos = await this.homeCategoriesUseCases.getTopVideosByCoverArtist(dto.name);
    return HomeCategoriesPresenters.toTopVideosPresenter(videos);
  }
}
