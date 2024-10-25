import { useRepository } from 'hooks';

const logic = async () => {
  const { homeCategoriesRepository } = useRepository();

  const [featuredVideos, topVideos, topArtists, topPop, topParamore] = await Promise.all([
    homeCategoriesRepository.getFeaturedVideos(),
    homeCategoriesRepository.getTopVideos(),
    homeCategoriesRepository.getTopArtists(),
    homeCategoriesRepository.getTopByStyle('pop'),
    homeCategoriesRepository.getTopByCoverArtist('Paramore'),
  ]);

  return {
    data: {
      categories: {
        featuredVideos,
        topVideos,
        topArtists,
        topPop,
        topParamore,
      },
    },
  };
};

export default logic;
