import yup from 'utils/yup';

export type FormSchema = {
  playlistId: string;
};

export const validationSchema: yup.SchemaOf<FormSchema> = yup
  .object({
    playlistId: yup.string().trim().required(),
  })
  .required();
