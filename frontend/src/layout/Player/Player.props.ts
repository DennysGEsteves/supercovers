import { MutableRefObject } from 'react';

import { Video } from 'types';

export const VIDEO_STATUS_TYPES = Object.freeze({
  UNSTARTED: 'UNSTARTED',
  ENDED: 'ENDED',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  BUFFERING: 'BUFFERING',
  CUED: 'CUED',
});

export type YT_STATE_MAP_TYPE = keyof typeof VIDEO_STATUS_TYPES;

export type PlayerProps = {
  visible: boolean;
  playlist?: Video[];
  playlistVideoIndex?: number;
  playlistOpen?: boolean;
  videoPlaying?: Video;
  status?: keyof typeof VIDEO_STATUS_TYPES;
  isPlaying: boolean;
  secondsPlaying: number;
  time: {
    current: string;
    total: string;
    percent: number;
  };
  volume: number;
  isMuted: boolean;
  isMinimized: boolean;
  ref: MutableRefObject<any>;
};

export const ACTION_TYPES = Object.freeze({
  SET_PLAYER_REF: 'SET_PLAYER_REF',
  OPEN_PLAYER: 'OPEN_PLAYER',
  CLOSE_PLAYER: 'CLOSE_PLAYER',
  PLAYLIST_OPEN: 'PLAYLIST_OPEN',
  PLAYLIST_VIDEO_INDEX: 'PLAYLIST_VIDEO_INDEX',
  ADD_PLAYLIST: 'ADD_PLAYLIST',
  CLEAN_PLAYLIST: 'CLEAN_PLAYLIST',
  PLAY: 'PLAY',
  RESUME: 'RESUME',
  END: 'END',
  PAUSE: 'PAUSE',
  NEXT_TRACK: 'NEXT_TRACK',
  PREV_TRACK: 'PREV_TRACK',
  SECONDS_PLAYING: 'SECONS_PLAYING',
  TIME_TOTAL: 'TIME_TOTAL',
  TIME_CURRENT: 'TIME_CURRENT',
  TIME_PERCENT: 'TIME_PERCENT',
  VOLUME: 'VOLUME',
  MUTED: 'MUTED',
  STATE: 'STATE',
  TOGGLE_VIDEO_SIZE: 'TOGGLE_VIDEO_SIZE',
});

export type PlayerActions =
  | { type: typeof ACTION_TYPES.SET_PLAYER_REF; payload: MutableRefObject<any> }
  | { type: typeof ACTION_TYPES.OPEN_PLAYER; payload?: null }
  | { type: typeof ACTION_TYPES.CLOSE_PLAYER; payload?: null }
  | { type: typeof ACTION_TYPES.PLAY; payload: Video }
  | { type: typeof ACTION_TYPES.RESUME; payload?: null }
  | { type: typeof ACTION_TYPES.PAUSE; payload?: null }
  | { type: typeof ACTION_TYPES.END; payload: null }
  | { type: typeof ACTION_TYPES.NEXT_TRACK; payload?: null }
  | { type: typeof ACTION_TYPES.PREV_TRACK; payload?: null }
  | { type: typeof ACTION_TYPES.PLAYLIST_OPEN; payload: boolean }
  | { type: typeof ACTION_TYPES.PLAYLIST_VIDEO_INDEX; payload: number }
  | { type: typeof ACTION_TYPES.ADD_PLAYLIST; payload: Video }
  | { type: typeof ACTION_TYPES.CLEAN_PLAYLIST; payload?: null }
  | { type: typeof ACTION_TYPES.SECONDS_PLAYING; payload: number }
  | { type: typeof ACTION_TYPES.TIME_TOTAL; payload: string }
  | { type: typeof ACTION_TYPES.TIME_CURRENT; payload: string }
  | { type: typeof ACTION_TYPES.TIME_PERCENT; payload: number }
  | { type: typeof ACTION_TYPES.VOLUME; payload: number }
  | { type: typeof ACTION_TYPES.MUTED; payload: boolean }
  | { type: typeof ACTION_TYPES.STATE; payload: YT_STATE_MAP_TYPE }
  | { type: typeof ACTION_TYPES.TOGGLE_VIDEO_SIZE; payload: null };
