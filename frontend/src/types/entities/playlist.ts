/* eslint-disable import/no-cycle */
import { Video } from './video';

export type Playlist = {
  id?: string;
  name: string;
  description: string;
  videos?: Video[];
};
