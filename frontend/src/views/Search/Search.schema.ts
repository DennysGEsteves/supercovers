import yup from 'utils/yup';

export type FormSchema = {
  name: string;
  description: string;
};

export const validationSchema: yup.SchemaOf<FormSchema> = yup
  .object({
    name: yup.string().trim().required(),
    description: yup.string().trim().required(),
  })
  .required();
