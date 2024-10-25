import { JwtService } from '@nestjs/jwt';
import { Artist } from 'entities/artist';
import { User } from 'entities/user';
// import { Video } from 'entities/video';

export const userMock = {
  id: 'userId',
  email: 'artist-slug@email.com',
  name: 'User Name',
  password: 'userpassword',
  isJudge: false,
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

// export const userWithArtistMock = {
//   user: userMock,
//   artist: artistMock,
// } as UserWithArtist;

// export const reqMock = {
//   user: userWithArtistMock,
// };

// export const artistVideoMock = {
//   artistId: artistMock.id,
//   artist: 'artist',
//   id: 'id',
//   song: 'song',
//   youtubeId: 'youtubeId',
// } as Video;

const jwtService = new JwtService();
export const jwtToken = jwtService.sign(
  {
    email: userMock.email,
  },
  {
    secret: 'some-secret',
  },
);
