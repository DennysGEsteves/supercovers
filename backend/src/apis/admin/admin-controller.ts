import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IVideoUseCases } from 'usecases/video';
import { IArtistsUseCases } from 'usecases/artist';
import { IFeaturedVideoUseCases } from 'usecases/featured-video/interfaces/i-featured-video-usecases';
import { IUsersUseCases } from 'usecases/user';
import type { Response } from 'express';
import { AdminAuthGuard, JwtAuthGuard } from '../../http/middlewares/passport';
import {
  CreateArtistFromAdminDTO,
  UpsertVideoFromAdminDTO,
  UpdateArtistFromAdminDTO,
  UpdateFeaturedVideosDTO,
} from './dto';

@Controller('admin')
export class AdminRoute {
  constructor(
    private artistVideosUseCases: IVideoUseCases,
    private artistsUseCases: IArtistsUseCases,
    private usersUseCases: IUsersUseCases,
    private featuredVideoUseCases: IFeaturedVideoUseCases,
  ) {}

  @UseGuards(AdminAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('artist/slug/:slug')
  getArtistBySlug(@Param() params) {
    return this.artistsUseCases.findBySlug(params.slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist')
  upsertArtist(@Body() dto: CreateArtistFromAdminDTO) {
    return this.artistsUseCases.createArtistFromAdmin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('artist')
  updateArtist(@Body() dto: UpdateArtistFromAdminDTO) {
    return this.artistsUseCases.updateArtistFromAdmin(dto);
  }

  @Put('user/:userId/avatar')
  @UseGuards(JwtAuthGuard)
  updateUserAvatar(@Param() params, @Body() body: { content: string }) {
    return this.usersUseCases.updateUserAvatar(params.userId, body.content);
  }

  @Get('users/avatar/:userId')
  getUserAvatar(@Res() res: Response, @Param('userId') userId: string) {
    const content = this.usersUseCases.getUserAvatar(userId);
    res.end(content, 'binary');
  }

  @UseGuards(JwtAuthGuard)
  @Get('artist-videos/:artistId')
  getArtistVideos(@Param() params) {
    return this.artistVideosUseCases.findAll(params.artistId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist-videos')
  createArtistVideo(@Body() dto: UpsertVideoFromAdminDTO) {
    return this.artistVideosUseCases.createVideoFromAdmin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist-videos/:videoId')
  updateArtistVideo(@Body() dto: UpsertVideoFromAdminDTO, @Param() params) {
    return this.artistVideosUseCases.updateVideoFromAdmin(dto, params.videoId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('featured-videos')
  getFeaturedVideos() {
    return this.featuredVideoUseCases.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('featured-videos')
  updateFeaturedVideos(@Body() dto: UpdateFeaturedVideosDTO) {
    return this.featuredVideoUseCases.update(dto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('covers/pending')
  // getPendingCovers() {
  //   return this.coverUseCases.findAllPending();
  // }
}
