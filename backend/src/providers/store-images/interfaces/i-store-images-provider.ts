export abstract class IStoreImagesProvider {
  abstract storeArtistTopImg(artistId: string, content: string): void;
  abstract getArtistTopImg(artistId: string): string;
  abstract storeUserAvatarImg(userId: string, content: string): void;
  abstract getUserAvatarImg(userId: string): string;
}
