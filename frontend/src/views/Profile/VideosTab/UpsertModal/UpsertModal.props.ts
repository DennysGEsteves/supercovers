/* eslint-disable no-useless-escape */
import React from 'react';

import { Video } from 'types';

export type ValidCoverData = {
  isValidArtist: boolean;
  isValidSong: boolean;
  isValidPlatformVideo: boolean;
};

export type UpsertModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  video: Video;
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  updateCache: (info: Video[]) => void;
};

export interface CUIAutoCompleteType {
  label: string;
  value: string;
}
