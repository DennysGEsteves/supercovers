import { useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { useNotify, useRepository, useUser } from 'hooks';

const logic = () => {
  const [imgBin, setImgBin] = useState(null);
  const [cropBase64, setCropBase64] = useState(null);
  const { me } = useUser();
  const picRef = useRef<HTMLInputElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usersRepository } = useRepository();

  const notify = useNotify();

  function setPic(e: any) {
    const [file] = e.target.files;

    if (file) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        setCropBase64(evt.target.result);
        onOpen();
      };
      reader.readAsDataURL(file);
    }
  }

  function submit(base64: string | ArrayBuffer) {
    usersRepository
      .updateMeAvatar(base64)
      .then(() => {
        notify.success('Avatar atualizado com sucesso!');
      })
      .catch((e: any) => {
        notify.error(e.response?.data?.error || 'Ocorreu um erro ao tentar atualizar avatar');
      });
  }

  function onCompleteCrop(blob: Blob) {
    if (blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgBin(event.target.result);
        submit(event.target.result);
      };
      reader.readAsDataURL(blob);
    }

    onClose();
  }

  return {
    data: {
      imgBin,
      cropBase64,
      me,
      picRef,
      isOpen,
    },
    methods: {
      setPic,
      onCompleteCrop,
      onClose,
    },
  };
};

export default logic;
