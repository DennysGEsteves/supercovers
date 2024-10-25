import { CreateArtistFromAdminDTO } from 'apis/admin/dto';
import { LoginWithSocialDTO } from 'apis/auth/dto';
import { RegisterUserDto, UpdateUserDto } from 'apis/user/dto';
import { Artist } from 'entities/artist';
import { Favorite } from 'entities/playlist';

interface IConstructorParams {
  readonly id?: string;
  readonly name: string;
  readonly email?: string;
  readonly password?: string;
  readonly artist?: Artist;
  readonly favorites?: string[];
}

export class User {
  public readonly id?: string;

  public readonly name: string;

  public readonly email?: string;

  public readonly password?: string;

  public readonly artist?: Artist;

  public readonly favorites?: string[] | Favorite[];

  constructor({
    id,
    name,
    email,
    password,
    artist,
    favorites,
  }: IConstructorParams) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.artist = artist;
    this.favorites = favorites;
  }

  public static fromRegisterUserDto(data: RegisterUserDto) {
    return new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  public static fromLoginWithSocialDTO(dto: LoginWithSocialDTO) {
    return new User({
      name: dto.name,
      email: dto.email,
    });
  }

  public static fromUpdateUserDto(params: { user: User; dto: UpdateUserDto }) {
    return new User({
      id: params.user.id,
      name: params.dto.name || params.user.name,
      email: params.dto.email || params.user.email,
      password: params.dto.password || params.user.password,
    });
  }

  public static fromCreateArtistFromAdminDTO(dto: CreateArtistFromAdminDTO) {
    return new User({
      name: dto.name,
    });
  }

  public static fromUpdateArtistFromAdminDTO(
    dto: CreateArtistFromAdminDTO,
    user: User,
  ) {
    return new User({
      id: user.id,
      name: dto.name,
    });
  }

  public static fromJwtStrategy(data: User): User {
    return new User({
      email: data.email,
      name: data.name,
      id: data.id,
      artist: new Artist({
        slug: data.artist?.slug,
        id: data.artist?.id,
        about: data.artist?.about,
        facebook: data.artist?.facebook,
        instagram: data.artist?.instagram,
        introVideo: data.artist?.introVideo,
        twitter: data.artist?.twitter,
        website: data.artist?.website,
        userId: data.id,
      }),
      favorites: data.favorites.map((favorite) => favorite.videoId),
    });
  }

  public static fromFindByEmailIncludeArtistDBResponse(res: any): User {
    const { artist, ...user } = res;

    return new User({
      ...user,
      artist: new Artist({ ...artist }),
    });
  }
}
