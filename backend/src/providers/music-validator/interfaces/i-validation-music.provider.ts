export abstract class IValidationMusicProvider {
  abstract getByArtistName(name: string): Promise<boolean>;
  abstract searchArtists(name: string): Promise<string[]>;
  abstract getSongsByArtistName(name: string): Promise<string[]>;
}
