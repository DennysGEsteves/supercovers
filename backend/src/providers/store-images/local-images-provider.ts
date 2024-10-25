import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync, writeFileSync } from 'fs';
import { EnvsProps } from 'settings';
import { IStoreImagesProvider } from './interfaces/i-store-images-provider';

@Injectable()
export class LocalStoreImagesProvider implements IStoreImagesProvider {
  private settings: EnvsProps;

  constructor(private sett: ConfigService) {
    this.settings = sett.get<EnvsProps>('settings');
  }

  storeArtistTopImg(artistId: string, content: string): void {
    writeFileSync(
      `${this.settings.ROOT_PATH}/static/artistTop/${artistId}.jpg`,
      content.replace(/^data:image\/(jpe?g|png);base64,/, ''),
      'base64',
    );
  }

  getArtistTopImg(artistId: string): string {
    let img;

    try {
      img = readFileSync(
        `${this.settings.ROOT_PATH}/static/artistTop/${artistId}.jpg`,
      );
    } catch (error) {
      img = null;
    }

    return img;
  }

  storeUserAvatarImg(userId: string, content: string): void {
    writeFileSync(
      `${this.settings.ROOT_PATH}/static/avatar/${userId}.jpg`,
      content.replace(/^data:image\/(jpe?g|png);base64,/, ''),
      'base64',
    );
  }

  getUserAvatarImg(userId: string): string {
    let img;

    try {
      img = readFileSync(
        `${this.settings.ROOT_PATH}/static/avatar/${userId}.jpg`,
      );
    } catch (error) {
      img = readFileSync(`${this.settings.ROOT_PATH}/static/avatar/avatar.png`);
    }

    return img;
  }
}
