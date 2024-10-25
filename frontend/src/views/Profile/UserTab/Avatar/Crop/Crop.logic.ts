import { useCallback, useEffect, useRef, useState } from 'react';

import { CropProps } from './Crop.props';

const logic = ({ onCompleteCrop, upImg }: CropProps) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState<any>({
    unit: 'px', // default, can be 'px' or '%'
    x: 130,
    y: 50,
    width: 160,
    height: 160,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  function generateDownload(canvas: any, crop2: any) {
    if (!crop2 || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob: Blob) => {
        onCompleteCrop(blob);
      },
      'image/png',
      1
    );
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ccrop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = ccrop.width * pixelRatio * scaleX;
    canvas.height = ccrop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      ccrop.x * scaleX,
      ccrop.y * scaleY,
      ccrop.width * scaleX,
      ccrop.height * scaleY,
      0,
      0,
      ccrop.width * scaleX,
      ccrop.height * scaleY
    );
  }, [completedCrop]);

  return {
    data: {
      upImg,
      crop,
      previewCanvasRef,
      completedCrop,
    },
    methods: {
      onCompleteCrop,
      setCrop,
      setCompletedCrop,
      generateDownload,
      onLoad,
    },
  };
};

export default logic;
