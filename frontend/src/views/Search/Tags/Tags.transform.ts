/* eslint-disable import/no-anonymous-default-export */
import { SearchByTagsParams } from 'repositories';

import { FormSchema } from './Tags.schema';

export default {
  toSearchByTagsPayload(data: FormSchema) {
    return {
      formation: data.formation,
      instrumentalOrVocal: data.instrumentalOrVocal,
      songStyle: data.songStyle,
      typeInstruments: data.typeInstruments,
    } as SearchByTagsParams;
  },
};
