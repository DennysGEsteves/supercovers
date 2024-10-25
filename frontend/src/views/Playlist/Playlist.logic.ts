/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRepository, useUser } from 'hooks';
import { Playlist } from 'types';
import { UpsertPlaylistDTO } from 'repositories';

import { UpdatePlaylistModalProps } from './UpdateModal/UpdateModal.props';
import { PlaylistViewProps } from './Playlist.props';

const logic = (props: PlaylistViewProps) => {
  const { isFavorite } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playlist, setPlaylist] = useState<Playlist>(undefined);
  const { playlistRepository } = useRepository();
  const { me, setMe } = useUser();
  const router = useRouter();

  const getFavorites = () => {
    playlistRepository.getAllUserFavorites().then((data) => {
      setPlaylist({
        description: 'As músicas que você marcar com "Gostei" aparecerão aqui',
        name: `Música marcada como "Gostei"`,
        videos: data,
      });
    });
  };

  const getPlaylist = () => {
    const { playlistId } = router.query;
    playlistRepository.getPlaylistAndVideos(playlistId as string).then((data) => {
      setPlaylist(data);
    });
  };

  const onUpdatePlaylist = (data: UpsertPlaylistDTO) => {
    setPlaylist({
      ...playlist,
      name: data.name,
      description: data.description,
    });

    me.playlists = me.playlists.map((item) => {
      if (item.id === playlist.id) {
        item.name = data.name;
      }
      return item;
    });

    setMe({ ...me });
  };

  useEffect(() => {
    if (isFavorite) {
      getFavorites();
    } else {
      getPlaylist();
    }
  }, []);

  return {
    data: {
      playlist,
      isFavorite,
    },
    modal: {
      isModalOpen: isOpen,
      closeModal: onClose,
      playlist,
      onUpdatePlaylist,
    } as UpdatePlaylistModalProps,
    methods: {
      openModal: onOpen,
    },
  };
};

export default logic;
