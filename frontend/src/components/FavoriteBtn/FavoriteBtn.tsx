/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { NextPage } from 'next';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { useRepository, useUser } from 'hooks';
import usePlayer from 'hooks/usePlayer';

type FavoriteBtnProps = {
  videoId: string;
  size?: string;
};

const FavoriteBtn: NextPage<FavoriteBtnProps> = ({ videoId, size }) => {
  const { me, setMe } = useUser();
  const { player } = usePlayer();
  const [filled, setFilled] = useState(false);
  const { playlistRepository } = useRepository();

  const toggleFavoriteVideo = () => {
    if (filled) {
      me.favorites = me.favorites.filter((favVideoId) => favVideoId !== videoId);
      setFilled(false);
      playlistRepository.removeFavorite(videoId);
    } else {
      me.favorites = [...me.favorites, videoId];
      setFilled(true);
      playlistRepository.addFavorite(videoId);
    }

    setMe({ ...me });
  };

  useEffect(() => {
    if (me) {
      setFilled(me.favorites.includes(videoId));
    }
  }, [me?.favorites, player.videoPlaying]);

  if (!me?.id) return <Box />;

  return (
    <Box cursor='pointer' onClick={toggleFavoriteVideo} h={size || '20px'} w={size || '20px'}>
      <Icon as={filled ? BsHeartFill : BsHeart} color='white' />
    </Box>
  );
};

export default FavoriteBtn;
