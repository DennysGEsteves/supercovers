export abstract class IYoutubeApiProvider {
  abstract getByPlatformId(platformId: string): Promise<boolean>;
}
