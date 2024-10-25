import {
  Controller,
  Body,
  UseGuards,
  Request,
  Get,
  Post,
  Delete,
  Param,
  Req,
  Ip,
} from '@nestjs/common';
import { JwtAuthGuard } from 'http/middlewares/passport';
import { IVideoUseCases } from 'usecases/video';
import { UpsertMeVideoDTO } from './dto';

@Controller('videos')
export class VideosRoute {
  constructor(private readonly videosUseCases: IVideoUseCases) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMeArtistVideos(@Request() req) {
    const { artist } = req.user;
    return this.videosUseCases.findAll(artist.id);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  upsertMeArtistVideo(@Request() req, @Body() dto: UpsertMeVideoDTO) {
    const { artist } = req.user;
    return this.videosUseCases.upsertMeVideo(artist.id, dto);
  }

  @Delete('me/:videoId')
  @UseGuards(JwtAuthGuard)
  deleteMeArtistVideo(@Param('videoId') videoId: string) {
    return this.videosUseCases.delete(videoId);
  }

  @Get('get-by-artistid/:artistId')
  getVideosByArtistId(@Param('artistId') artistId: string) {
    return this.videosUseCases.findAll(artistId);
  }

  @Post('view/:videoId')
  addVideoView(
    @Req() requestToReadIp: Request,
    @Param('videoId') videoId: string,
    @Ip() ip2: string,
  ) {
    const ips = requestToReadIp.headers['x-forwarded-for'] as string;
    const ip = ips?.split(',')[0] || ip2;
    return !!this.videosUseCases.addVideoView(ip, videoId);
  }
}
