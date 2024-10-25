import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRepository } from 'hooks';

import { UserCreateSchema, UserCreateDTO } from './Signup.props';

const useLogic = () => {
  const [created, setCreated] = useState<boolean>(undefined);
  const [showCredentialError, setShowCredentialError] = useState<string>(null);

  const { usersRepository } = useRepository();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(UserCreateSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const submit: SubmitHandler<UserCreateDTO> = (values) => {
    delete values.confirmPassword;

    usersRepository
      .create(values)
      .then(() => {
        setCreated(true);

        setTimeout(() => {
          signIn();
        }, 3000);
      })
      .catch((e: any) => {
        if (e.response.data.message === 'EXISTING_USER_ON_CREATE') {
          setShowCredentialError('Este email já existe em nossa base de dados');
        } else {
          setShowCredentialError('Erro ao tentar criar usuário');
        }
      });
  };

  return {
    data: {
      created,
      showCredentialError,
      errors,
      isSubmitting,
    },
    methods: {
      handleSubmit,
      submit,
      register,
    },
  };
};

export default useLogic;
