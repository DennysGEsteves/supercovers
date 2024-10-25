import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';

const Padding: NextPage<any> = ({ children, ...rest }) => (
  <Flex className='padding' pl='300px' {...rest} pt='7rem' position='relative' w='90%'>
    <Box w='100%'>{children}</Box>
  </Flex>
);

export default Padding;
