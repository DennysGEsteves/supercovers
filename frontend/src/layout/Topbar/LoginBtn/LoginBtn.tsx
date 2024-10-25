import { Avatar, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack } from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';

import envs from 'config/environment';

import logic from './LoginBtn.logic';

const LoginBtn: NextPage = () => {
  const { data, methods } = logic();

  return (
    <Stack flex={{ base: 1, md: 1 }} justify='flex-end' direction='row' spacing={6}>
      {data.session ? (
        <Flex alignItems='center'>
          <Menu>
            <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
              <Avatar size='sm' src={`${envs.apiBaseUrl}/users/avatar/${data.me?.id}`} />
            </MenuButton>
            <MenuList color='black'>
              <NextLink passHref href='/profile'>
                <MenuItem>
                  <a>Meu perfil</a>
                </MenuItem>
              </NextLink>
              {data.me?.artist?.slug && (
                <NextLink passHref href={`/sa/${data.me.artist.slug}`}>
                  <MenuItem>
                    <a>Minha página</a>
                  </MenuItem>
                </NextLink>
              )}
              <MenuDivider />
              <MenuItem onClick={() => methods.doSignout()}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <Button size='xs' color='white' bg='gray.700' onClick={() => methods.openSignInWindow()}>
          Login
        </Button>
      )}
    </Stack>
  );
};

export default LoginBtn;
