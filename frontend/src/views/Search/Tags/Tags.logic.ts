import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRepository } from 'hooks';
import { Video } from 'types';

import { validationSchema, FormSchema } from './Tags.schema';
import Transformer from './Tags.transform';

const logic = () => {
  const [result, setResult] = useState<Video[] | undefined>(undefined);

  const { searchRepository } = useRepository();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const submit: SubmitHandler<FormSchema> = (values) => {
    setResult([]);

    const payload = Transformer.toSearchByTagsPayload(values);

    searchRepository.searchByTags(payload).then(({ data }) => {
      setResult(data);
    });
  };

  return {
    data: {
      result,
      control,
      errors,
    },
    methods: {
      register,
      handleSubmit,
      submit,
    },
  };
};

export default logic;
