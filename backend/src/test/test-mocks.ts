import { Artist } from 'entities/artist';
import { User } from 'entities/user';
import { JwtService } from '@nestjs/jwt';
import { Video } from 'entities/video';

export const userMock = {
  id: 'userId',
  email: 'artist-slug@email.com',
  name: 'User Name',
  password: 'userpassword',
} as User;

export const artistMock = {
  id: 'artistId',
  name: 'some name',
  userId: userMock.id,
  slug: 'artist-slug',
  level: 'amateur',
  about: 'about',
  facebook: 'facebook',
  instagram: 'instagram',
  introVideo: 'introVideo',
  twitter: 'twitter',
  website: 'website',
} as Artist;

export const userWithArtistMock = {
  ...userMock,
  artist: artistMock,
} as User;

export const reqMock = {
  user: userWithArtistMock,
};

export const artistVideoMock = {
  artistId: artistMock.id,
  id: 'id',
  coverId: 'coverId',
  platformId: 'youtubeId',
  platform: 'youtube',
} as Video;

const jwtService = new JwtService();
export const jwtToken = jwtService.sign(
  {
    email: userMock.email,
  },
  {
    secret: 'some-secret',
  },
);
