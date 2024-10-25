import { Artist } from 'entities/artist';
import { User } from 'entities/user';

export class UserPresenters {
  public static toGetMeDataPresenter(data: User): User {
    return new User({
      email: data.email,
      name: data.name,
      id: data.id,
      artist: new Artist({
        slug: data.artist?.slug,
        about: data.artist?.about,
        facebook: data.artist?.facebook,
        instagram: data.artist?.instagram,
        introVideo: data.artist?.introVideo,
        twitter: data.artist?.twitter,
        website: data.artist?.website,
        userId: data.id,
      }),
      favorites: data.favorites as string[],
    });
  }
}
