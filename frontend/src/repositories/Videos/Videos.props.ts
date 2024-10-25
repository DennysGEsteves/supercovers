import { Platform } from 'types';

export type UpsertMeVideoDTO = {
  id?: string;
  platformId: string;
  platform: Platform;
  artistName: string;
  songTitle: string;
  extras: {
    songStyle: string;
    instrumentalOrVocal: string;
    typeInstruments: string;
    formation: string;
  };
};
