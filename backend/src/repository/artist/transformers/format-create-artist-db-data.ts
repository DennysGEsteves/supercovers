import { Artist } from 'entities/artist';
import { IFormatCreateArtistDbData } from '../interfaces';

export const formatCreateArtistDBData = (
  artist: Artist,
): IFormatCreateArtistDbData => {
  return {
    slug: artist.slug,
    level: artist.level,
    userId: artist.userId,
    ...(artist.about ? { about: artist.about } : {}),
    ...(artist.facebook ? { facebook: artist.facebook } : {}),
    ...(artist.instagram ? { instagram: artist.instagram } : {}),
    ...(artist.introVideo ? { introVideo: artist.introVideo } : {}),
    ...(artist.twitter ? { twitter: artist.twitter } : {}),
    ...(artist.website ? { website: artist.website } : {}),
  };
};
