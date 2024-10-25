import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { useNotify, useRepository, useUser } from 'hooks';
import { configureUseForm } from 'utils';
import { UpdateArtistDTO } from 'repositories/Artist/Artist.props';
import envs from 'config/environment';

import { ArtistUpdateSchema } from './ArtistTab.schema';

const logic = () => {
  const [curSlug, setCurSlug] = useState(null);
  const { me, setMe } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { artistRepository } = useRepository();
  const picRef = useRef<HTMLInputElement>();
  const notify = useNotify();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ArtistUpdateSchema),
  });

  const hasArtist = !!me?.artist?.slug;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = methods;

  function onDrop(files: File[]) {
    const [file] = files;

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValue('topImg', event.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    onDropAccepted: (files) => onDrop(files),
  });

  useEffect(() => {
    if (me?.artist.slug) {
      configureUseForm(setValue, me.artist);
      setCurSlug(me.artist.slug);
      setValue(
        'topImg',
        `${envs.apiBaseUrlProtocol}://${envs.vercelUrl}/artists/top-img/${me.artist.slug}?nc=${new Date().valueOf()}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.artist]);

  const submit: SubmitHandler<UpdateArtistDTO> = (values) => {
    setIsSubmitting(true);

    artistRepository
      .upsertMeArtist(values)
      .then(({ data: dataRes }: any) => {
        notify.success('Dados atualizados com sucesso!');
        setCurSlug(dataRes.slug);
        setMe({
          ...me,
          artist: {
            id: me.artist.id,
            ...values,
          },
        });
      })
      .catch((e: any) => {
        notify.error(e.response?.data?.error || 'Ocorreu um erro ao tentar atualizar dados');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onTopImageLoadError = () => {
    setValue('topImg', null);
  };

  const topImg = useWatch({
    control,
    name: 'topImg',
  });

  return {
    data: {
      curSlug,
      isSubmitting,
      picRef,
      errors,
      topImg,
      hasArtist,
    },
    methods: {
      register,
      handleSubmit,
      getRootProps,
      getInputProps,
      submit,
      onDrop,
      onTopImageLoadError,
    },
  };
};

export default logic;
