import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import logic from 'views/Artist/Artist.logic';
import ArtistView from 'views/Artist/Artist.view';

const Artist: NextPage = (props: any) => <ArtistView {...props} />;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const props = await logic(context);

  if (!props.data.artist.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props,
  };
};
export default Artist;
