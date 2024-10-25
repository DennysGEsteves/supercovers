import { Artist, ArtistSlug } from 'entities/artist';

export class ArtistPresenters {
  public static toArtistsSlugsPresenter(artists: Artist[]): ArtistSlug[] {
    return artists.map((artist) => {
      return {
        slug: artist.slug,
        name: artist.user.name,
      };
    }) as ArtistSlug[];
  }
}
