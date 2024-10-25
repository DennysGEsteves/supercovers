import {
  CreateArtistFromAdminDTO,
  UpdateArtistFromAdminDTO,
} from 'apis/admin/dto';
import { User } from 'entities/user';
import { UpsertMeArtistDTO } from 'apis/artist/dto';
import { ArtistLevel, ArtistSlug } from './types';

interface IConstructorParams {
  readonly id?: string;
  readonly userId?: string;
  readonly slug: string;
  readonly about?: string;
  readonly introVideo?: string;
  readonly facebook?: string;
  readonly instagram?: string;
  readonly twitter?: string;
  readonly website?: string;
  readonly level?: ArtistLevel;
  readonly user?: User;
  views?: number;
}

export class Artist {
  public readonly id?: string;

  public readonly userId?: string;

  public readonly slug: string;

  public readonly about?: string;

  public readonly introVideo?: string;

  public readonly facebook?: string;

  public readonly instagram?: string;

  public readonly twitter?: string;

  public readonly website?: string;

  public readonly level?: ArtistLevel;

  public readonly user?: User;

  public views?: number;

  constructor({
    id,
    userId,
    slug,
    about,
    introVideo,
    facebook,
    instagram,
    twitter,
    website,
    level,
    user,
    views,
  }: IConstructorParams) {
    this.id = id;
    this.userId = userId;
    this.slug = slug;
    this.about = about;
    this.introVideo = introVideo;
    this.facebook = facebook;
    this.instagram = instagram;
    this.twitter = twitter;
    this.website = website;
    this.level = level;
    this.user = user;
    this.views = views;
  }

  public static toCreateArtist(user: User, slug: string) {
    return new Artist({
      userId: user.id,
      slug,
      level: 'amateur' as ArtistLevel,
    });
  }

  public static fromUpsertMeArtistDTO(
    dto: UpsertMeArtistDTO,
    artist: Artist,
    user: User,
  ) {
    return new Artist({
      id: artist.id,
      slug: dto.slug || artist.slug,
      level: (dto.level || artist.level || 'amateur') as ArtistLevel,
      about: dto.about || artist.about,
      facebook: dto.facebook || artist.facebook,
      instagram: dto.instagram || artist.instagram,
      introVideo: dto.introVideo || artist.introVideo,
      twitter: dto.twitter || artist.twitter,
      website: dto.website || artist.website,
      userId: user.id,
    });
  }

  public static fromCreateArtistFromAdminDTO(
    dto: CreateArtistFromAdminDTO,
    user: User,
  ) {
    return new Artist({
      slug: dto.slug,
      level: (dto.level || 'amateur') as ArtistLevel,
      about: dto.about,
      facebook: dto.facebook,
      instagram: dto.instagram,
      introVideo: dto.introVideo,
      twitter: dto.twitter,
      website: dto.website,
      userId: user.id,
    });
  }

  public static fromUpdateArtistFromAdminDTO(
    dto: UpdateArtistFromAdminDTO,
    artist: Artist,
  ) {
    return new Artist({
      id: dto.id,
      slug: dto.slug,
      level: (dto.level || 'amateur') as ArtistLevel,
      about: dto.about,
      facebook: dto.facebook,
      instagram: dto.instagram,
      introVideo: dto.introVideo,
      twitter: dto.twitter,
      website: dto.website,
      userId: artist.userId,
    });
  }

  public static fromDBData(data: Artist) {
    const { user, ...artist } = data;

    return new Artist({
      id: artist.id,
      slug: artist.slug,
      about: artist.about,
      introVideo: artist.introVideo,
      facebook: artist.facebook,
      instagram: artist.instagram,
      twitter: artist.twitter,
      website: artist.website,
      level: artist.level,
      user,
    });
  }
}
