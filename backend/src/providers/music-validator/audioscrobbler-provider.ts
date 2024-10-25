import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExternalRequestHandler } from 'http/middlewares/request/external-request-handler';
import { IValidationMusicProvider } from './interfaces';

@Injectable()
export class AudioscrobblerProvider implements IValidationMusicProvider {
  private AUDIOSCROBBLER_API_KEY: string;

  constructor(
    private readonly externalHandlerRequest: ExternalRequestHandler,
    envs: ConfigService,
  ) {
    this.AUDIOSCROBBLER_API_KEY = envs.get<string>('AUDIOSCROBBLER_API_KEY');
  }

  async searchArtists(name: string): Promise<string[]> {
    const { data } = await this.externalHandlerRequest.executeRequest<any>({
      method: 'GET',
      url: `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(
        name,
      )}&api_key=${
        this.AUDIOSCROBBLER_API_KEY
      }&format=json&autocorrect=1&limit=5`,
    });

    return data.results.artistmatches.artist
      .filter((artist) => artist.listeners > 1000)
      .map((artist) => artist.name);
  }

  async getByArtistName(name: string): Promise<boolean> {
    const { data } = await this.externalHandlerRequest.executeRequest<any>({
      method: 'GET',
      url: `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${encodeURIComponent(
        name,
      )}&api_key=${this.AUDIOSCROBBLER_API_KEY}&format=json&autocorrect=0`,
    });

    return data && data.artist?.stats?.listeners > 1000;
  }

  async getSongsByArtistName(name: string): Promise<string[]> {
    const { data } = await this.externalHandlerRequest.executeRequest<{
      toptracks: { track: any[] };
    }>({
      method: 'GET',
      url: `http://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=${encodeURIComponent(
        name,
      )}&api_key=${this.AUDIOSCROBBLER_API_KEY}&format=json`,
    });

    return data.toptracks
      ? data.toptracks.track.map((item: any) => item.name)
      : [];
  }
}
