import { Artist, Video } from 'types';

export type HomeProps = {
  data: {
    categories: {
      featuredVideos: Video[];
      topVideos: Video[];
      topArtists: Artist[];
      topPop: Video[];
      topParamore: Video[];
    };
    showHome: boolean;
  };
};
