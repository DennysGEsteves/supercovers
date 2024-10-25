import { Flex, Stack } from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { routes } from './NavItems.routes';

const NavItems: NextPage = () => (
  <Flex display={{ base: 'none', md: 'flex' }} ml={12}>
    <Stack direction='row' spacing={10} fontSize='0.95rem' fontWeight={100}>
      {routes.map(
        (route) =>
          !route.disable && (
            <NextLink key={route.label} href={route.href}>
              {route.label}
            </NextLink>
          )
      )}
    </Stack>
  </Flex>
);

export default NavItems;
