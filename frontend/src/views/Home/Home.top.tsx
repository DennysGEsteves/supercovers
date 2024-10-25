import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Image from 'next/legacy/image';

import { Padding } from 'layout/Padding';

const App: NextPage = () => (
  <Box
    h='600px'
    position='relative'
    overflow='hidden'
    sx={{
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: '-webkit-linear-gradient(top, rgba(22,22,24,0) 0%, rgba(22,22,24,0.8) 0% , rgba(22,22,24,1) 90%)',
        height: 600,
        zIndex: 1,
      },
      '& .desc': {
        zIndex: 2,
      },
    }}
  >
    <Image
      objectFit='cover'
      layout='fill'
      src='https://images.unsplash.com/photo-1535587566541-97121a128dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
      alt='Slide 1'
    />
    <Padding className='desc' direction='column'>
      <Heading as='h1' fontSize='2rem' mb='30px' color='white' textAlign='center' padding='250px 20% 0'>
        Aqui é o melhor lugar para encontrar covers emocionantes de artistas talentosos
      </Heading>
    </Padding>
  </Box>
);

export default App;
