import envs from 'config/environment';
import { Fetch } from 'services';
import { getJwtTokenFromSession } from 'utils';

import { mapVideosRead } from './Videos.mapper';
import { UpsertMeVideoDTO } from './Videos.props';

export const VideosRepository = () => {
  const url = `${envs.apiBaseUrl}/videos`;

  function getByArtistId(artistId: string) {
    return Fetch.get({
      url: `${url}/get-by-artistid/${artistId}`,
    }).then(({ data }) => mapVideosRead(data));
  }

  async function getMeVideos() {
    return Fetch.get({
      url: `${url}/me`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function upsertMeVideos(data: UpsertMeVideoDTO) {
    return Fetch.post({
      url: `${url}/me`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function deleteMeVideo(videoId: string) {
    return Fetch.delete({
      url: `${url}/me/${videoId}`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function registerView(videoId: string) {
    return Fetch.post({
      url: `${url}/view/${videoId}`,
      data: {},
    });
  }

  return {
    getByArtistId,
    getMeVideos,
    upsertMeVideos,
    deleteMeVideo,
    registerView,
  };
};

export default VideosRepository;
