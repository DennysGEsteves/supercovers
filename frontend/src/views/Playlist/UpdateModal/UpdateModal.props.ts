import { UpsertPlaylistDTO } from 'repositories';
import { Playlist } from 'types';

export type UpdatePlaylistModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  playlist: Playlist;
  onUpdatePlaylist: (data: UpsertPlaylistDTO) => void;
};
