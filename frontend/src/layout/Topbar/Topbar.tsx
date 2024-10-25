import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';

import LoginBtn from './LoginBtn/LoginBtn';
import Logo from './Logo/Logo';
import NavItems from './NavItems/NavItems';

const Topbar: NextPage = () => (
  <Box position='fixed' width='100%' zIndex={99999}>
    <Flex
      bg='rgba(0,0,0,0.9)'
      color='white'
      h='80px'
      py={{ base: 5 }}
      px={{ base: 5 }}
      align='center'
      boxShadow='none'
      flexGrow={1}
      borderBottom='1px solid #222'
    >
      <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'space-between' }} alignItems='end'>
        <Logo />
        <NavItems />
        <LoginBtn />
      </Flex>
    </Flex>
  </Box>
);

export default Topbar;
