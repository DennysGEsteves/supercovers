import { Artist } from 'entities/artist';
import { User } from 'entities/user';

export type ArtistUser = Artist & {
  user?: User;
};
