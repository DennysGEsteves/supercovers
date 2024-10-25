/* eslint-disable import/no-anonymous-default-export */
import { UpsertMeVideoDTO } from 'repositories';

import { FormSchema } from './UpsertModal.schema';

export default {
  toUpsertPayload(data: FormSchema) {
    return {
      artistName: data.artistName,
      songTitle: data.songTitle,
      platform: data.platform,
      platformId: data.platformId,
      extras: {
        songStyle: data.songStyle,
        formation: data.formation,
        instrumentalOrVocal: data.instrumentalOrVocal,
        typeInstruments: data.typeInstruments,
      },
    } as UpsertMeVideoDTO;
  },
};
