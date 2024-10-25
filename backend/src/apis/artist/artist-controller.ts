import {
  Controller,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Res,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'http/middlewares/passport';
import type { Response } from 'express';
import { IArtistsUseCases } from 'usecases/artist';
import { UpsertMeArtistDTO } from './dto';
import { ArtistPresenters } from './presenters';

@Controller('artists')
export class ArtistsRoute {
  constructor(private readonly artistsUseCases: IArtistsUseCases) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMeArtist(@Request() req) {
    const { artist } = req.user;
    return artist;
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  upsertMeArtist(@Request() req, @Body() dto: UpsertMeArtistDTO) {
    const { artist, ...user } = req.user;
    return this.artistsUseCases.upsertMeArtist({
      dto,
      artist,
      user,
    });
  }

  @Get('get-by-slug/:slug')
  async findArtistBySlug(@Param('slug') slug: string) {
    return this.artistsUseCases.findBySlug(slug);
  }

  @Get('top-img/:artistSlug')
  async getArtistTopImg(
    @Res() res: Response,
    @Param('artistSlug') artistSlug: string,
  ) {
    const content = await this.artistsUseCases.getArtistTopImg(artistSlug);
    res.end(content, 'binary');
  }

  @Get('slugs')
  async getAllArtistsSlugs() {
    const artists = await this.artistsUseCases.findAll();
    return ArtistPresenters.toArtistsSlugsPresenter(artists);
  }
}
