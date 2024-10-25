/* eslint-disable max-params */
import { Injectable } from '@nestjs/common';
import { UpsertVideoFromAdminDTO } from 'apis/admin/dto';
import { IArtistService } from 'services/artist';
import { UpsertMeVideoDTO } from 'apis/video/dto';
import { Video, VideoTag, VideoView } from 'entities/video';
import { IVideoService } from 'services/video';
import { IVideoUseCases } from 'usecases/video';
import { IVideoViewService } from 'services/video-view/interfaces/i-video-view-service';
import { IYoutubeApiProvider } from 'providers/youtube-api';
import { ICoverService } from 'services/cover';
import { IVideoTagService } from 'services/video-tag';
import { IFavoriteService } from 'services/favorite';
import { IFeaturedVideoService } from 'services/featured-video';

@Injectable()
export default class VideosUseCases implements IVideoUseCases {
  constructor(
    private videoService: IVideoService,
    private videoViewService: IVideoViewService,
    private videoTagService: IVideoTagService,
    private favoriteService: IFavoriteService,
    private featuredVideoService: IFeaturedVideoService,
    private artistService: IArtistService,
    private coverService: ICoverService,
    private youtubeApiProvider: IYoutubeApiProvider,
  ) {}

  findAll(artistId: string): Promise<Video[]> {
    return this.videoService.findAll(artistId);
  }

  async delete(videoId: string): Promise<void> {
    await this.favoriteService.deleteAllByVideoId(videoId);
    await this.featuredVideoService.deleteAllByVideoId(videoId);
    await this.videoTagService.deleteByVideoId(videoId);
    await this.videoViewService.deleteAllByVideoId(videoId);
    return this.videoService.delete(videoId);
  }

  async upsertMeVideo(artistId: string, dto: UpsertMeVideoDTO): Promise<Video> {
    if (!this.checkIsValidPlatformId(dto.platformId)) {
      throw new Error('Vídeo da plataforma não encontrado');
    }

    const cover = await this.upsertCover(dto.artistName, dto.songTitle);
    const video = Video.fromUpsertMeVideoDTO(dto, artistId, cover.id);
    const videoDB = await this.videoService.upsert(video);
    const tags = VideoTag.fromUpsertMeVideoDTO(dto, videoDB.id);
    const videoTag = await this.videoTagService.upsertTags(tags);

    const videoUpdated = Video.fromUpsertMeVideoDTO(
      dto,
      artistId,
      cover.id,
      videoTag.id,
      videoDB.id,
    );
    await this.videoService.upsert(videoUpdated);

    return videoDB;
  }

  async createVideoFromAdmin(dto: UpsertVideoFromAdminDTO): Promise<Video> {
    if (!this.checkIsValidPlatformId(dto.platformId)) {
      throw new Error('Vídeo da plataforma não encontrado');
    }

    const artist = await this.artistService.findBySlug(dto.slug);

    const cover = await this.upsertCover(dto.artistName, dto.songTitle);

    const video = Video.fromUpsertVideoFromAdminDTO(dto, artist, cover.id);
    const videoDB = await this.videoService.upsert(video);

    const tags = VideoTag.fromUpsertVideoFromAdminDTO(dto, videoDB.id);
    const videoTag = await this.videoTagService.upsertTags(tags);

    const videoUpdated = Video.fromUpsertVideoFromAdminDTO(
      dto,
      artist,
      cover.id,
      videoTag.id,
      videoDB.id,
    );

    await this.videoService.upsert(videoUpdated);

    return videoDB;
  }

  async updateVideoFromAdmin(
    dto: UpsertVideoFromAdminDTO,
    videoId: string,
  ): Promise<Video> {
    const oldVideo = await this.videoService.findById(videoId);

    const tags = VideoTag.fromUpsertVideoFromAdminDTO(dto, videoId);
    await this.videoTagService.deleteByVideoId(videoId);
    const videoTag = await this.videoTagService.upsertTags(tags);

    const cover = await this.upsertCover(dto.artistName, dto.songTitle);

    const video = Video.fromUpdateVideoFromAdminDTO(
      dto,
      oldVideo,
      cover.id,
      videoTag.id,
    );
    await this.videoService.upsert(video);

    return video;
  }

  async addVideoView(ip: string, videoId: string): Promise<void> {
    const { artist, cover, tags } = await this.videoService.findById(videoId);
    const videoView = VideoView.fromCreateVideoViewParams(
      ip,
      videoId,
      artist,
      cover,
      tags,
    );

    return this.videoViewService.addVideoView(videoView);
  }

  private async checkIsValidPlatformId(platformId: string) {
    return this.youtubeApiProvider.getByPlatformId(platformId);
  }

  private async upsertCover(artistName: string, songTitle: string) {
    const coverArtist = await this.coverService.findOrCreateCoverArtistByName(
      artistName,
    );
    const coverSong = await this.coverService.findOrCreateCoverSongByName(
      coverArtist.id,
      songTitle,
    );

    return this.coverService.findOrCreateCover(coverArtist.id, coverSong.id);
  }
}
