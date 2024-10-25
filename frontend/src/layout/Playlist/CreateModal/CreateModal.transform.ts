/* eslint-disable import/no-anonymous-default-export */
import { UpsertPlaylistDTO } from 'repositories';

import { FormSchema } from './CreateModal.schema';

export default {
  toPayload(data: FormSchema) {
    return {
      name: data.name,
      description: data.description,
    } as UpsertPlaylistDTO;
  },
};
