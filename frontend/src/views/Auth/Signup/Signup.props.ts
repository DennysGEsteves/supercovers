import yup from 'utils/yup';

export type UserCreateDTO = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const UserUpdateSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export const UserCreateSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'A senha deve conter ao menos 8 dígitos, uma letra maiúscula, um número e um caractere especial'
      )
      .required(),
    confirmPassword: yup.string().test({
      message: 'As senhas não são iguais',
      params: {
        reference: yup.ref('password'),
      },
      test(value) {
        return value === this.resolve(yup.ref('password'));
      },
    }),
  })
  .required();
