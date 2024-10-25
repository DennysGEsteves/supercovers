import { Artist } from 'entities/artist';
import { IFormatUpsertArtistDbData } from '../interfaces/request-data';

export const formatUpsertArtistDBData = (
  artist: Artist,
): IFormatUpsertArtistDbData => {
  return {
    data: {
      ...(artist.slug ? { slug: artist.slug } : {}),
      ...(artist.level ? { level: artist.level } : {}),
      ...(artist.about ? { about: artist.about } : {}),
      ...(artist.facebook ? { facebook: artist.facebook } : {}),
      ...(artist.instagram ? { instagram: artist.instagram } : {}),
      ...(artist.introVideo ? { introVideo: artist.introVideo } : {}),
      ...(artist.twitter ? { twitter: artist.twitter } : {}),
      ...(artist.website ? { website: artist.website } : {}),
    },
    id: artist.id || 'null',
    userId: artist.userId,
  };
};
