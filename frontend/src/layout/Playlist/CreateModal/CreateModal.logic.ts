import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
// import { useDisclosure } from '@chakra-ui/react';

import { configureUseForm } from 'utils';
import { useNotify, useRepository, useUser } from 'hooks';

import { CreatePlaylistModalProps } from './CreateModal.props';
import { validationSchema, FormSchema } from './CreateModal.schema';
import Transformer from './CreateModal.transform';

const logic = (props: CreatePlaylistModalProps) => {
  const { isModalOpen, closeModal } = props;
  const { me, setMe } = useUser();

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
      configureUseForm(setValue, {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const submit = (values: FormSchema) => {
    const payload = Transformer.toPayload(values);

    playlistRepository
      .createPlaylist(payload)
      .then(({ data }) => {
        setMe({
          ...me,
          playlists: [...me.playlists, data],
        });
        notify.success('Playlist criada com sucesso!');
        closeModal();
      })
      .catch((e) => {
        console.log(e);
        notify.error('Erro ao tentar criar playlist!');
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
