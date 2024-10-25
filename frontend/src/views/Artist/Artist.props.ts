import { Artist, Video } from 'types';

export type ArtistProps = {
  data: {
    artist: Artist;
    videos: PageVideosCategories;
  };
};

export type ArtistTopProps = {
  artist: Artist;
};

export type PageVideosCategories = {
  top10: Video[];
  allVideos: Video[];
};

export type ArtistVideosProps = {
  videos: PageVideosCategories;
};
