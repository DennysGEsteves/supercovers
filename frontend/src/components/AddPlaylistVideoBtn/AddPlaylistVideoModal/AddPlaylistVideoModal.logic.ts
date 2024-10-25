import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

import { configureUseForm } from 'utils';
import { useNotify, useRepository, useUser } from 'hooks';

import { AddPlaylistVideoModalProps } from './AddPlaylistVideoModal.props';
import { validationSchema, FormSchema } from './AddPlaylistVideoModal.schema';

const logic = (props: AddPlaylistVideoModalProps) => {
  const { isModalOpen, closeModal, video } = props;
  const { me } = useUser();

  const { playlistRepository } = useRepository();
  const notify = useNotify();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = methods;

  const submit = (values: FormSchema) => {
    if (!values.playlistId) return;

    playlistRepository
      .addPlaylistVideo(values.playlistId, video.id)
      .then(() => {
        notify.success('Video adicionado à playlist com sucesso!');
        closeModal();
      })
      .catch((e) => {
        if (e.response?.data?.message === 'DUPLICATED_RECORD') {
          notify.warning('Esse video já está na playlist escolhida');
        } else {
          notify.error('Erro ao tentar adicionar video à playlist');
        }
      });
  };

  useEffect(() => {
    if (isModalOpen) {
      reset();
      clearErrors();
      configureUseForm(setValue, {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, video]);

  return {
    data: {
      isModalOpen,
      errors,
      control,
      playlists: me?.playlists || [],
    },
    methods: {
      handleSubmit,
      closeModal,
      submit,
    },
  };
};

export default logic;
