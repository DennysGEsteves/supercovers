import React from 'react';
import { Button, Center, Flex, CircularProgress } from '@chakra-ui/react';
import { NextPage } from 'next';

import { VideosListWithCat } from 'components/VideosListWithCat';
import { Video } from 'types';

import { UpsertModal } from './UpsertModal';
import logic from './VideosTab.logic';

const ProfileVideosTab: NextPage = () => {
  const { data, methods } = logic();
  const videosByLetter = methods.genListByLetter();

  if (data.loading) return <CircularProgress isIndeterminate color='purple.500' />;

  return (
    <>
      <Center>
        <Button
          colorScheme='purple'
          onClick={() => {
            methods.onOpen();
            methods.setUpsertVideo(null);
          }}
        >
          + Adicionar
        </Button>
      </Center>

      {!!data.videos.length &&
        Object.keys(videosByLetter).map((letter: string) => (
          <VideosListWithCat
            key={letter}
            title={letter}
            videos={videosByLetter[letter]}
            onVideoClick={(video: Video) => {
              methods.editVideo(video);
            }}
            hideBtns
            hideArtist
            hideCoverArtist
          />
        ))}
      {!data.videos.length && (
        <Flex direction='column' justify='center' align='center' mt={10}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='64'
            height='64'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-radio'
          >
            <circle cx='12' cy='12' r='2' />
            <path d='M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14' />
          </svg>
          <p>Você ainda não tem vídeos na sua galeria</p>
          <br />
        </Flex>
      )}

      <UpsertModal
        isModalOpen={methods.isOpen}
        closeModal={methods.onClose}
        video={data.upsertVideo}
        setVideos={methods.setVideos}
        updateCache={(info: Video[]) => {
          data.cache.current = info;
        }}
      />
    </>
  );
};
export default ProfileVideosTab;
