import { userWithArtistMock } from 'test';
import { UpsertMeArtistDTO } from '../controller/dto';
import { Artist } from './artist';
import { ArtistUser } from './types';

describe('ArtistsModel', () => {
  describe('fromCreateMeArtistDTO', () => {
    it('should return Artist object from CreateArtistDTO', () => {
      const slug = 'someslug';
      const result = Artist.toCreateArtist(userWithArtistMock.user, slug);

      expect(result).toBeInstanceOf(Artist);
    });
  });

  describe('fromUpdateMeArtistDTO', () => {
    it('should return Artist object from CreateArtistDTO', () => {
      const dto = {
        name: 'some name',
        slug: 'some slug',
        about: 'some about',
        facebook: 'some facebook',
        instagram: 'some instagram',
        introVideo: 'some introVideo',
        level: 'amateur',
        twitter: 'some twitter',
        website: 'some website',
      } as UpsertMeArtistDTO;

      const result = Artist.fromUpsertMeArtistDTO(
        dto,
        userWithArtistMock.artist.id,
      );

      expect(result).toBeInstanceOf(Artist);
    });
  });

  describe('fromDBData', () => {
    it('should return Artist object from database data', () => {
      const artistUser = {
        name: 'some name',
        slug: 'some slug',
        about: 'some about',
        facebook: 'some facebook',
        instagram: 'some instagram',
        introVideo: 'some introVideo',
        level: 'amateur',
        twitter: 'some twitter',
        website: 'some website',
        User: {
          email: 'some email',
          name: 'some name',
          id: 'some id',
          password: 'somepassword',
        },
      } as ArtistUser;

      const result = Artist.fromDBData(artistUser);

      expect(result).toBeInstanceOf(Artist);
    });
  });
});
