import HomeView from 'views/Home/Home.view';
import logic from 'views/Home/Home.logic';

const Home = (props: any) => <HomeView {...props} />;

export const getStaticProps = async () => {
  const props = await logic();

  return {
    props: { isAuth: false, ...props },
    revalidate: 60 * 5, // 5 min
  };
};
export default Home;
