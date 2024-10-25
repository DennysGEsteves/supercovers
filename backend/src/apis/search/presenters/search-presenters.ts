import { CoverArtist, SearchCover } from 'entities/cover';
import { User } from 'entities/user';

export class SearchPresenters {
  public static toSearchCoverArtistRegisterPresenter(data: CoverArtist) {
    const result = [] as SearchCover[];

    data?.coverSongs.forEach((coverSong) => {
      result.push({
        songTitle: coverSong.name,
        videos: coverSong.covers[0].videos,
      } as SearchCover);
    });

    return result;
  }

  public static toSearchSuperArtistsPresenter(user: User) {
    return {
      user: {
        name: user.name,
      },
      slug: user.artist.slug,
      userId: user.id,
    };
  }
}
