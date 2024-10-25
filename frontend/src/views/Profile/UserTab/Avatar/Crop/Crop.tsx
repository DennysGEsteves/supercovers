import { Box, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import logic from './Crop.logic';
import { CropProps } from './Crop.props';

const Crop: NextPage<CropProps> = (props) => {
  const { data, methods } = logic(props);

  return (
    <Box className='App'>
      <ReactCrop
        src={data.upImg}
        onImageLoaded={methods.onLoad}
        crop={data.crop}
        keepSelection
        circularCrop
        onChange={(c) => methods.setCrop(c)}
        onComplete={(c) => methods.setCompletedCrop(c)}
        imageStyle={{
          maxHeight: '50vh',
        }}
      />
      <Box display='inline-block' my={8}>
        <canvas
          ref={data.previewCanvasRef}
          style={{
            borderRadius: '50%',
            width: 160,
            height: 160,
            border: '2px solid #111',
          }}
        />
      </Box>
      <br />
      <Box style={{ textAlign: 'center' }}>
        <Button
          variant='contained'
          disabled={!data.completedCrop?.width || !data.completedCrop?.height}
          onClick={() => methods.generateDownload(data.previewCanvasRef.current, data.completedCrop)}
          style={{ marginRight: 20 }}
        >
          SALVAR
        </Button>
        <Button
          variant='text'
          color='error'
          disabled={!data.completedCrop?.width || !data.completedCrop?.height}
          onClick={() => methods.onCompleteCrop(null)}
        >
          CANCELAR
        </Button>
      </Box>
    </Box>
  );
};

export default Crop;
