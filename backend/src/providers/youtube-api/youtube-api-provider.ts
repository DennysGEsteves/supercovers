import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { IYoutubeApiProvider } from './interfaces';

@Injectable()
export class YoutubeApiProvider implements IYoutubeApiProvider {
  private YOUTUBE_API_KEY: string;

  constructor(
    private readonly externalHandlerRequest: ExternalRequestHandler,
    envs: ConfigService,
  ) {
    this.YOUTUBE_API_KEY = envs.get<string>('YOUTUBE_API_KEY');
  }

  async getByPlatformId(platformId: string): Promise<boolean> {
    const { data } = await this.externalHandlerRequest.executeRequest<any>({
      method: 'GET',
      url: `https://www.googleapis.com/youtube/v3/videos?part=id&id=${platformId}&key=${this.YOUTUBE_API_KEY}`,
    });

    return !!data.pageInfo.totalResults;
  }
}
