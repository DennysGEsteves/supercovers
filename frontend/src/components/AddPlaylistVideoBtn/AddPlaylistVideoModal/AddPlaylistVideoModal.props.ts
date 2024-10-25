import { Video } from 'types';

export type AddPlaylistVideoModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  video: Video;
};
