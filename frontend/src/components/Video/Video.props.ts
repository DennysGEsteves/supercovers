import { Video } from 'types';

export type VideoProps = {
  video: Video;
  hideBtns?: boolean;
  hideArtist?: boolean;
  hideCoverArtist?: boolean;
  onVideoClick?: (video: Video) => void;
};
