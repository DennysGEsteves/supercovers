import { createContext, Dispatch, useReducer, ReactElement, ReactNode } from 'react';

import { PlayerProps, PlayerActions, ACTION_TYPES, VIDEO_STATUS_TYPES } from 'layout/Player/Player.props';
import { Video } from 'types';

export const initialState: PlayerProps = {
  visible: false,
  playlist: [],
  playlistOpen: false,
  videoPlaying: null,
  isMinimized: false,
  playlistVideoIndex: 0,
  status: VIDEO_STATUS_TYPES.UNSTARTED,
  secondsPlaying: 0,
  time: {
    current: '00:00',
    total: '00:00',
    percent: 0,
  },
  volume: 100,
  isMuted: false,
} as PlayerProps;

export function PlayerReducer(state: PlayerProps, action: PlayerActions) {
  switch (action.type) {
    case ACTION_TYPES.OPEN_PLAYER:
      return { ...state, visible: true } as PlayerProps;

    case ACTION_TYPES.TOGGLE_VIDEO_SIZE:
      return { ...state, isMinimized: !state.isMinimized } as PlayerProps;

    case ACTION_TYPES.SET_PLAYER_REF:
      return { ...state, ref: action.payload } as PlayerProps;

    case ACTION_TYPES.CLOSE_PLAYER:
      return { ...state, visible: false } as PlayerProps;

    case ACTION_TYPES.PLAYLIST_OPEN:
      return { ...state, playlistOpen: action.payload } as PlayerProps;

    case ACTION_TYPES.PLAYLIST_VIDEO_INDEX:
      return { ...state, playlistVideoIndex: action.payload } as PlayerProps;

    case ACTION_TYPES.ADD_PLAYLIST:
      return { ...state, playlist: [...state.playlist, action.payload] } as PlayerProps;

    case ACTION_TYPES.CLEAN_PLAYLIST:
      return { ...state, playlist: [] } as PlayerProps;

    case ACTION_TYPES.SECONDS_PLAYING:
      return { ...state, secondsPlaying: action.payload } as PlayerProps;

    case ACTION_TYPES.TIME_CURRENT:
      return { ...state, time: { ...state.time, current: action.payload } } as PlayerProps;

    case ACTION_TYPES.TIME_TOTAL:
      return { ...state, time: { ...state.time, total: action.payload } } as PlayerProps;

    case ACTION_TYPES.TIME_PERCENT:
      return { ...state, time: { ...state.time, percent: action.payload } } as PlayerProps;

    case ACTION_TYPES.VOLUME:
      return { ...state, volume: action.payload } as PlayerProps;

    case ACTION_TYPES.MUTED:
      return { ...state, isMuted: action.payload } as PlayerProps;

    case ACTION_TYPES.PLAY: {
      const videoPlaying = action.payload as Video;

      return {
        ...state,
        videoPlaying,
        isPlaying: true,
      } as PlayerProps;
    }

    case ACTION_TYPES.PAUSE:
      return {
        ...state,
        status: VIDEO_STATUS_TYPES.PAUSED,
        isPlaying: false,
      } as PlayerProps;

    case ACTION_TYPES.RESUME:
      return {
        ...state,
        status: VIDEO_STATUS_TYPES.PLAYING,
        isPlaying: true,
      } as PlayerProps;

    case ACTION_TYPES.NEXT_TRACK: {
      const { playlist } = state;
      let newIndex = state.playlistVideoIndex + 1;
      newIndex = playlist[newIndex] ? newIndex : playlist.length - 1;
      const track = playlist[newIndex];

      return {
        ...state,
        videoPlaying: track,
        playlistVideoIndex: newIndex,
        isPlaying: true,
      } as PlayerProps;
    }

    case ACTION_TYPES.PREV_TRACK: {
      const { playlist } = state;
      let newIndex = state.playlistVideoIndex - 1;
      newIndex = playlist[newIndex] ? newIndex : 0;
      const track = playlist[newIndex];

      return {
        ...state,
        videoPlaying: track,
        playlistVideoIndex: newIndex,
        isPlaying: true,
      } as PlayerProps;
    }

    default:
      throw new Error();
  }
}

export const PlayerContext = createContext<{
  state: typeof initialState;
  dispatch: Dispatch<PlayerActions>;
}>({ state: initialState, dispatch: () => undefined });

export function PlayerProvider({ children }: { children: ReactElement | ReactNode }) {
  const [state, dispatch] = useReducer(PlayerReducer, initialState);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>
  );
}
