import { useEffect, useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { genVideos, mapVideosByCoverArtistName } from 'utils';
import { useRepository, useUser } from 'hooks';
import { Video } from 'types';

const logic = () => {
  const [upsertVideo, setUpsertVideo] = useState<Video>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { videosRepository: artistVideosRepository } = useRepository();
  const { me } = useUser();

  const cache = useRef<Video[]>(null);

  useEffect(() => {
    if (cache.current) {
      setVideos(cache.current);
      setLoading(false);
    } else {
      artistVideosRepository.getMeVideos().then(({ data }) => {
        const resVideos = genVideos(me?.artist, data);
        cache.current = resVideos;
        setVideos(resVideos);
        setLoading(false);
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editVideo(video: Video) {
    setUpsertVideo({
      cover: video.cover,
      platformId: video.platformId,
      platform: video.platform,
      id: video.id,
    });
    onOpen();
  }

  function genListByLetter() {
    return mapVideosByCoverArtistName(videos);
  }

  return {
    data: {
      upsertVideo,
      videos,
      loading,
      isOpen,
      cache,
    },
    methods: {
      isOpen,
      onClose,
      onOpen,
      setUpsertVideo,
      genListByLetter,
      setVideos,
      editVideo,
    },
  };
};

export default logic;
