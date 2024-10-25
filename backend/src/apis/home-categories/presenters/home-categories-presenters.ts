import { Artist } from 'entities/artist';
import { Video } from 'entities/video';

export class HomeCategoriesPresenters {
  public static toGetTopArtistsPresenter(artist: Artist) {
    const { slug, userId, user, views } = artist;
    const { name } = user;
    return { slug, userId, user: { name }, views };
  }

  public static toFeaturedVideosPresenter(videos: Video[]): Video[] {
    return videos.map((video) => {
      return new Video({
        cover: {
          coverArtist: video.cover.coverArtist,
          coverSong: video.cover.coverSong,
        },
        platform: video.platform,
        platformId: video.platformId,
        artistId: video.artistId,
        id: video.id,
        views: video.views,
        createdAt: video.createdAt,
        artist: {
          slug: video.artist.slug,
          user: video.artist.user,
        },
      });
    });
  }

  public static toTopVideosPresenter(videos: Video[]) {
    return videos.map((video) => {
      return new Video({
        cover: {
          coverArtist: video.cover.coverArtist,
          coverSong: video.cover.coverSong,
        },
        platform: video.platform,
        platformId: video.platformId,
        artistId: video.artistId,
        id: video.id,
        views: video.views,
        createdAt: video.createdAt,
        artist: {
          slug: video.artist.slug,
          user: video.artist.user,
        },
      });
    });
  }
}
