/* eslint-disable import/no-anonymous-default-export */
// import { UpsertPlaylistDTO } from 'repositories';

import { FormSchema } from './ContactUs.schema';

export default {
  toPayload(data: FormSchema) {
    return {
      name: data.name,
      email: data.email,
      message: data.message,
      subject: data.subject,
    };
  },
};
