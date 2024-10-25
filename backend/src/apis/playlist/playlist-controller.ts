import {
  Controller,
  UseGuards,
  Request,
  Post,
  Delete,
  Param,
  Get,
  Body,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'http/middlewares/passport';
import { IPlaylistUseCases } from 'usecases/playlist';
import { UpsertPlaylistDTO } from './dto';

@Controller('playlist')
export class PlaylistRoute {
  constructor(private readonly playlistUseCases: IPlaylistUseCases) {}

  @Post('favorites/:videoId')
  @UseGuards(JwtAuthGuard)
  addFavorite(@Param('videoId') videoId: string, @Request() req) {
    const { id: userId } = req.user;
    return this.playlistUseCases.addFavorite(videoId, userId);
  }

  @Delete('favorites/:videoId')
  @UseGuards(JwtAuthGuard)
  removeFavorite(@Param('videoId') videoId: string, @Request() req) {
    const { id: userId } = req.user;
    return this.playlistUseCases.removeFavorite(videoId, userId);
  }

  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  getFavorites(@Request() req) {
    const { id: userId } = req.user;
    return this.playlistUseCases.getAllFavorites(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getPlaylists(@Request() req) {
    const { id: userId } = req.user;
    return this.playlistUseCases.getAllPlaylists(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPlaylist(@Request() req, @Body() dto: UpsertPlaylistDTO) {
    const { id: userId } = req.user;
    return this.playlistUseCases.createPlaylist(dto, userId);
  }

  @Put('/:playlistId')
  @UseGuards(JwtAuthGuard)
  updatePlaylist(
    @Request() req,
    @Body() dto: UpsertPlaylistDTO,
    @Param('playlistId') playlistId: string,
  ) {
    const { id: userId } = req.user;
    return this.playlistUseCases.updatePlaylist(dto, playlistId, userId);
  }

  @Post('/:playlistId/:videoId')
  @UseGuards(JwtAuthGuard)
  addPlaylistVideo(
    @Request() req,
    @Param('videoId') videoId: string,
    @Param('playlistId') playlistId: string,
  ) {
    const { id: userId } = req.user;
    return this.playlistUseCases.addPlaylistVideo(playlistId, videoId, userId);
  }

  @Get('/:playlistId')
  @UseGuards(JwtAuthGuard)
  getPlaylistAndVideos(
    @Request() req,
    @Param('playlistId') playlistId: string,
  ) {
    return this.playlistUseCases.getPlaylistAndVideos(playlistId);
  }
}
