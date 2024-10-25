/* eslint-disable import/no-extraneous-dependencies */
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useSteps } from 'chakra-ui-steps';

import { configureUseForm, capitalize } from 'utils';
import { useNotify, useRepository, useUser } from 'hooks';
import { Platform } from 'types';

import { CUIAutoCompleteType, UpsertModalProps } from './UpsertModal.props';
import { validationSchema, FormSchema } from './UpsertModal.schema';
import Transformer from './UpsertModal.transform';

const logic = (props: UpsertModalProps) => {
  const { isModalOpen, closeModal, setVideos, updateCache, video } = props;
  const [coverSongs, setCoverSongs] = useState<string[]>([]);
  const [coverArtists, setCoverArtists] = useState<string[]>([]);
  const [selectedCoverSongs, setSelectedCoverSongs] = useState<CUIAutoCompleteType[]>([]);
  const [artistName, setArtistName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { me } = useUser();

  const { videosRepository: artistVideosRepository } = useRepository();
  const notify = useNotify();

  const {
    nextStep,
    prevStep,
    activeStep,
    reset: resetStepper,
  } = useSteps({
    initialStep: 0,
  });

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = methods;

  const enableStep2 = !!(getValues('artistName') && getValues('songTitle') && getValues('platformId'));

  const submit: SubmitHandler<FormSchema> = (values) => {
    values.artistName = capitalize(values.artistName);
    values.songTitle = capitalize(values.songTitle);

    const isUpdate = !!props.video?.id;

    const payload = Transformer.toUpsertPayload(values);
    if (isUpdate) payload.id = props.video.id;

    artistVideosRepository
      .upsertMeVideos(payload)
      .then(({ data: dataRes }) => {
        notify.success(`Vídeo ${isUpdate ? 'atualizado' : 'cadastrado'} com sucesso`);
        setVideos((prev) => {
          if (isUpdate) {
            prev = prev.map((vid) => {
              if (vid.id === props.video.id) {
                vid = {
                  artist: {
                    slug: me.artist.slug,
                  },
                  id: props.video.id,
                  cover: {
                    coverArtist: {
                      name: values.artistName,
                    },
                    coverSong: {
                      name: values.songTitle,
                    },
                  },
                  platform: values.platform as Platform,
                  platformId: values.platformId,
                };
              }
              return vid;
            });
          } else {
            prev.unshift({
              artist: {
                slug: me.artist.slug,
              },
              id: dataRes.id,
              cover: {
                coverArtist: {
                  name: values.artistName,
                },
                coverSong: {
                  name: values.songTitle,
                },
              },
              platform: dataRes.platform as Platform,
              platformId: dataRes.platformId,
            });
          }
          updateCache(prev);
          return prev;
        });
        closeModal();
      })
      .catch((e) => {
        notify.error(e.response?.data?.message || 'Ocorreu um erro ao tentar atualizar dados');
      });
  };

  const searchCoverArtistSongs = () => {
    setValue('songTitle', '');
    clearErrors();
    setArtistName(getValues('artistName'));
  };

  function deleteVideo() {
    setIsDeleting(true);

    artistVideosRepository
      .deleteMeVideo(video.id)
      .then(() => {
        setVideos((prev) => prev.filter((item) => item.id !== video.id));
      })
      .catch((e) => {
        notify.error(e.response?.data?.error || 'Ocorreu um erro ao tentar deletar o video');
      })
      .finally(() => {
        closeModal();
        setIsDeleting(false);
      });
  }

  const handleSelectedItemsChange = (selectedItems?: CUIAutoCompleteType[]) => {
    if (selectedItems) {
      setSelectedCoverSongs(selectedItems);
    }
  };

  useEffect(() => {
    reset();
    setValue('platform', 'youtube');
    setValue('instrumentalOrVocal', 'vocal');
    setCoverSongs([]);
    setCoverArtists([]);
    resetStepper();
    if (video) {
      setCoverArtists([video.cover.coverArtist.name]);
      setCoverSongs([video.cover.coverSong.name]);
      configureUseForm(setValue, {
        platform: video.platform,
        platformId: video.platformId,
        artistName: video.cover.coverArtist.name,
        songTitle: video.cover.coverSong.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video, isModalOpen]);

  return {
    data: {
      isModalOpen,
      isDeleting,
      errors,
      control,
      videoId: video?.id,
      coverSongs,
      coverArtists,
      selectedCoverSongs,
      activeStep,
      enableStep2,
      artistName,
    },
    methods: {
      register,
      handleSubmit,
      deleteVideo,
      closeModal,
      submit,
      searchCoverArtistSongs,
      handleSelectedItemsChange,
      nextStep,
      prevStep,
    },
  };
};

export default logic;
