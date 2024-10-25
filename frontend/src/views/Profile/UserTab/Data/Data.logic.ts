import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { configureUseForm } from 'utils';
import { useNotify, useRepository, useUser } from 'hooks';
import { UserUpdateProps } from 'repositories/Users/Users.props';

import { UserUpdateSchema } from './Data.props';

const logic = () => {
  const { me, setMe } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { usersRepository } = useRepository();
  const notify = useNotify();
  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(UserUpdateSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const submit: SubmitHandler<UserUpdateProps> = (values) => {
    setIsSubmitting(true);

    usersRepository
      .updateMe(values)
      .then(() => {
        notify.success('Dados atualizados com sucesso!');
        setMe({
          ...me,
          ...values,
        });
      })
      .catch((e) => {
        notify.error(e.response?.data?.error || 'Ocorreu um erro ao tentar atualizar dados');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    configureUseForm(setValue, {
      email: me.email,
      name: me.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return {
    data: {
      me,
      isSubmitting,
      errors,
    },
    methods: {
      register,
      handleSubmit,
      submit,
      setValue,
    },
  };
};

export default logic;
