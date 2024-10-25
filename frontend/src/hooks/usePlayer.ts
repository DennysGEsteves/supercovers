import { MutableRefObject, useContext } from 'react';
import screenfull from 'screenfull';

import { PlayerContext } from 'context/PlayerContext';
import { ACTION_TYPES } from 'layout/Player/Player.props';
import { Video } from 'types';

import useRepository from './useRepository';

const usePlayer = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const { videosRepository: artistVideosRepository } = useRepository();

  function setPlaylistOpen(status: boolean) {
    dispatch({
      type: ACTION_TYPES.PLAYLIST_OPEN,
      payload: status,
    });
  }

  function addVideoToPlaylist(video: Video) {
    dispatch({
      type: ACTION_TYPES.ADD_PLAYLIST,
      payload: video,
    });

    if (!state.visible) {
      dispatch({
        type: ACTION_TYPES.OPEN_PLAYER,
      });
    }

    if (!state.playlistOpen) {
      setPlaylistOpen(true);
    }
  }

  function setPlaylistVideoIndex(index: number) {
    dispatch({
      type: ACTION_TYPES.PLAYLIST_VIDEO_INDEX,
      payload: index,
    });
  }

  function cleanPlaylist() {
    dispatch({
      type: ACTION_TYPES.CLEAN_PLAYLIST,
    });
  }

  function resetSecondsPlaying() {
    dispatch({
      type: ACTION_TYPES.SECONDS_PLAYING,
      payload: 0,
    });
  }

  function onChangeVideoDuration(time: string) {
    dispatch({
      type: ACTION_TYPES.TIME_TOTAL,
      payload: time,
    });
  }

  function onChangeVolume(volume: number) {
    dispatch({
      type: ACTION_TYPES.VOLUME,
      payload: volume,
    });
  }

  function onChangeMuted() {
    const isMuted = !state.isMuted;

    dispatch({
      type: ACTION_TYPES.MUTED,
      payload: isMuted,
    });

    // dispatch({
    //   type: ACTION_TYPES.VOLUME,
    //   payload: isMuted ? 0 : state.volume,
    // });
  }

  function onVideoProgress(time: string, percent: number) {
    dispatch({
      type: ACTION_TYPES.SECONDS_PLAYING,
      payload: state.secondsPlaying + 1,
    });

    dispatch({
      type: ACTION_TYPES.TIME_CURRENT,
      payload: time,
    });

    dispatch({
      type: ACTION_TYPES.TIME_PERCENT,
      payload: percent,
    });

    if (state.secondsPlaying === 10) {
      artistVideosRepository.registerView(state.videoPlaying.id);
    }
  }

  function play(video: Video) {
    if (video.id !== state.videoPlaying?.id) {
      // if (!state.playlist.find((playlistItem) => playlistItem.id === video.id)) {
      //   addVideoToPlaylist(video);
      //   setPlaylistVideoIndex(state.playlist.length - 1);
      // }

      dispatch({
        type: ACTION_TYPES.OPEN_PLAYER,
      });

      dispatch({
        type: ACTION_TYPES.PLAY,
        payload: video,
      });

      resetSecondsPlaying();
    }
  }

  function pause() {
    dispatch({
      type: ACTION_TYPES.PAUSE,
    });
  }

  function resume() {
    dispatch({
      type: ACTION_TYPES.RESUME,
    });
  }

  function nextTrack() {
    dispatch({
      type: ACTION_TYPES.NEXT_TRACK,
    });
  }

  function onEnded() {
    if (state.playlist.length && state.playlistVideoIndex + 1 < state.playlist.length) {
      nextTrack();
    } else {
      pause();
    }
  }

  function prevTrack() {
    dispatch({
      type: ACTION_TYPES.PREV_TRACK,
    });
  }

  function setPlayerRef(ref: MutableRefObject<any>) {
    dispatch({
      type: ACTION_TYPES.SET_PLAYER_REF,
      payload: ref,
    });
  }

  const fullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(state.ref.current.wrapper);
    }
  };

  const toggleVideoSize = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_VIDEO_SIZE,
    });
  };

  return {
    controls: {
      play,
      pause,
      resume,
      fullScreen,
      toggleVideoSize,
      setPlaylistOpen,
      nextTrack,
      prevTrack,
    },
    status: {
      onResume: resume,
      onPause: pause,
      onEnded,
    },
    playlist: {
      addVideoToPlaylist,
      cleanPlaylist,
      setPlaylistVideoIndex,
    },
    player: state,
    setPlayerRef,
    resetSecondsPlaying,
    onVideoProgress,
    onChangeVideoDuration,
    onChangeVolume,
    onChangeMuted,
  };
};

export default usePlayer;
