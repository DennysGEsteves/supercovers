import yup from 'utils/yup';

export type FormSchema = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

export const validationSchema: yup.SchemaOf<FormSchema> = yup
  .object({
    name: yup.string().trim().required(),
    email: yup.string().trim().required(),
    message: yup.string().trim().required(),
    subject: yup.string().trim().required(),
  })
  .required();
