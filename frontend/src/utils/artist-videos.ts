import { Artist, Me, Video } from 'types';

export const mapVideosByCoverArtistName = (videos: Video[]): Record<string, Video[]> => {
  const list: Record<string, Video[]> = {};

  if (videos && videos.length) {
    videos.forEach((video: Video) => {
      const { cover } = video;
      if (!list[cover.coverArtist.name]) list[cover.coverArtist.name] = [];
      list[cover.coverArtist.name].push(video);
    });
  }

  return Object.keys(list)
    .sort()
    .reduce((acc: any, key) => {
      acc[key] = list[key];
      return acc;
    }, {});
};

export const sortVideosByViews = (videos: Video[]) => videos.sort((a, b) => b.views - a.views);

export const genVideos = (artist: Artist | Me['artist'], videos: Video[]) =>
  videos.map((video) => ({
    id: video.id,
    cover: video.cover,
    platformId: video.platformId,
    platform: video.platform,
    artist: {
      id: artist.id,
      slug: artist.slug,
    },
  }));
