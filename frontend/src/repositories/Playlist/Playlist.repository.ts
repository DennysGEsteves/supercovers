/* eslint-disable import/no-cycle */
import envs from 'config/environment';
import { Fetch } from 'services';
import { Playlist } from 'types';
import { getJwtTokenFromSession } from 'utils';

import { mapVideosRead } from './Playlist.mapper';

export const PlaylistRepository = () => {
  const url = `${envs.apiBaseUrl}/playlist`;

  async function addFavorite(videoId: string) {
    return Fetch.post({
      url: `${url}/favorites/${videoId}`,
      data: {},
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function createPlaylist(data: Playlist) {
    return Fetch.post({
      url: `${url}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function updatePlaylist(data: Playlist, playlistId: string) {
    return Fetch.put({
      url: `${url}/${playlistId}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function removeFavorite(videoId: string) {
    return Fetch.delete({
      url: `${url}/favorites/${videoId}`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function getAllUserFavorites() {
    return Fetch.get({
      url: `${url}/favorites`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    }).then(({ data }) => mapVideosRead(data));
  }

  async function getAllUserPlaylists() {
    return Fetch.get({
      url: `${url}`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  async function getPlaylistAndVideos(playlistId: string) {
    return Fetch.get({
      url: `${url}/${playlistId}`,
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    }).then(({ data }) => {
      const { videos, ...playlist } = data;
      return {
        ...playlist,
        videos: mapVideosRead(videos),
      } as Playlist;
    });
  }

  async function addPlaylistVideo(playlistId: string, videoId: string) {
    return Fetch.post({
      url: `${url}/${playlistId}/${videoId}`,
      data: {},
      config: {
        headers: {
          Authorization: `Bearer ${await getJwtTokenFromSession()}`,
        },
      },
    });
  }

  return {
    addFavorite,
    removeFavorite,
    getAllUserFavorites,
    createPlaylist,
    getAllUserPlaylists,
    addPlaylistVideo,
    getPlaylistAndVideos,
    updatePlaylist,
  };
};

export default PlaylistRepository;
