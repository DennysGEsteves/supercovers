/* eslint-disable no-useless-escape */
import { yup } from 'utils';

export const UserUpdateSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();
