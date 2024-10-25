import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
// import { useDisclosure } from '@chakra-ui/react';

import { configureUseForm } from 'utils';
import { useNotify, useRepository } from 'hooks';

import { UpdatePlaylistModalProps } from './UpdateModal.props';
import { validationSchema, FormSchema } from './UpdateModal.schema';
import Transformer from './UpdateModal.transform';

const logic = (props: UpdatePlaylistModalProps) => {
  const { isModalOpen, closeModal, playlist, onUpdatePlaylist } = props;

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

  useEffect(() => {
    if (isModalOpen) {
      reset();
      clearErrors();
      configureUseForm(setValue, { ...playlist });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const submit = (values: FormSchema) => {
    const payload = Transformer.toPayload(values);

    playlistRepository
      .updatePlaylist(payload, playlist.id)
      .then(() => {
        notify.success('Playlist criada com sucesso!');
      })
      .catch(() => {
        notify.error('Erro ao tentar criar playlist!');
      })
      .finally(() => {
        onUpdatePlaylist(payload);
        closeModal();
      });
  };

  return {
    data: {
      isModalOpen,
      errors,
      control,
    },
    methods: {
      handleSubmit,
      closeModal,
      submit,
    },
  };
};

export default logic;
