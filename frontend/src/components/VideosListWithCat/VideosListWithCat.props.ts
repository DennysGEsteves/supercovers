import { Video } from 'types';

export type VideosProps = {
  title?: string;
  videos: Video[];
  hideBtns?: boolean;
  hideArtist?: boolean;
  hideCoverArtist?: boolean;
  onVideoClick?: (video: Video) => void;
};
