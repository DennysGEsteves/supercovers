import { MutableRefObject } from 'react';

import { Me } from 'types';

export type UserAvatarProps = {
  data: {
    imgBin: any;
    cropBase64: any;
    user: Me;
    picRef: MutableRefObject<HTMLInputElement>;
    isOpen: boolean;
  };
  methods: {
    setPic: (e: any) => void;
    onCompleteCrop: (blob: Blob) => void;
    onClose: () => void;
  };
};
