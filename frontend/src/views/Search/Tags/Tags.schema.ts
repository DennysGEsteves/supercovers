import yup from 'utils/yup';

export type FormSchema = {
  songStyle?: string;
  instrumentalOrVocal?: string;
  typeInstruments?: string;
  formation?: string;
};

export const validationSchema: yup.SchemaOf<FormSchema> = yup.object({
  songStyle: yup.string(),
  instrumentalOrVocal: yup.string(),
  typeInstruments: yup.string(),
  formation: yup.string(),
});
