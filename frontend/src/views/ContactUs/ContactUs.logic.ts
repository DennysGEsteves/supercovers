import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNotify, useRepository } from 'hooks';

import { validationSchema, FormSchema } from './ContactUs.schema';

const logic = () => {
  const { contactUsRepository } = useRepository();
  const notify = useNotify();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const submit = (values: FormSchema) => {
    contactUsRepository.sendEmail(values).then(() => {
      notify.success('Mensagem enviada com sucesso!');
      reset();
    });
  };

  return {
    data: {
      errors,
      control,
    },
    methods: {
      handleSubmit,
      submit,
    },
  };
};

export default logic;
