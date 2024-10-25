import { Playlist } from 'types';

export type PlaylistTopProps = {
  openModal: () => void;
  isFavorite?: boolean;
  playlist?: Playlist;
};

export type PlaylistViewProps = {
  isFavorite?: boolean;
};

export type PlaylistVideosProps = {
  playlist?: Playlist;
};
