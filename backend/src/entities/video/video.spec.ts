describe('ArtistsVideoModel', () => {
  describe('fromUpsertMeArtistVideoDTO', () => {
    it('should return ArtistVideo object from UpsertArtistVideoDTO', () => {
      const dto = {
        artist: 'some artist',
        song: 'some song',
        youtubeId: 'some youtubeId',
        id: 'some id',
      } as UpsertMeArtistVideoDTO;

      const artistId = 'some artistId';

      const result = ArtistVideo.fromUpsertMeArtistVideoDTO(dto, artistId);

      expect(result).toBeInstanceOf(ArtistVideo);
    });
  });
});
