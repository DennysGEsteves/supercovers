import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { useRepository } from 'hooks';
import { sortVideosByViews } from 'utils';

import { PageVideosCategories } from './Artist.props';

const logic = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const { artistRepository, videosRepository: artistVideosRepository } = useRepository();

  const slug = context.params.slug as string;
  const artist = await artistRepository.getBySlug(slug);
  let videos: PageVideosCategories = null;

  if (artist) {
    const allVideos = await artistVideosRepository.getByArtistId(artist.id);

    videos = {
      top10: sortVideosByViews([...allVideos]).slice(0, 8),
      allVideos,
    };
  }

  return {
    data: {
      artist,
      videos,
    },
  };
};

export default logic;
