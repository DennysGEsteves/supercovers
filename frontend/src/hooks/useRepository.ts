import {
  ArtistRepository,
  UsersRepository,
  VideosRepository,
  AuthRepository,
  PlaylistRepository,
  HomeCategoriesRepository,
  ContactUsRepository,
  SearchRepository,
} from 'repositories';

function useRepository() {
  return {
    artistRepository: ArtistRepository(),
    videosRepository: VideosRepository(),
    usersRepository: UsersRepository(),
    authRepository: AuthRepository(),
    homeCategoriesRepository: HomeCategoriesRepository(),
    playlistRepository: PlaylistRepository(),
    contactUsRepository: ContactUsRepository(),
    searchRepository: SearchRepository(),
  };
}

export default useRepository;
