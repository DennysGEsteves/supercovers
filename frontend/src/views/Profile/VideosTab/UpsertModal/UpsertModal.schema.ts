import yup from 'utils/yup';

export type FormSchema = {
  platform: string;
  platformId: string;
  artistName: string;
  songTitle: string;
  songStyle: string;
  instrumentalOrVocal: string;
  typeInstruments: string;
  formation: string;
};

export const validationSchema: yup.SchemaOf<FormSchema> = yup
  .object({
    platform: yup.string().trim().required(),
    platformId: yup.string().trim().required(),
    artistName: yup.string().trim().required(),
    songTitle: yup.string().trim().required(),
    songStyle: yup.string().required(),
    instrumentalOrVocal: yup.string().required(),
    typeInstruments: yup.string().required(),
    formation: yup.string().required(),
  })
  .required();
