import { NextPage } from 'next';
import { Box, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/legacy/image';

const Logo: NextPage = () => (
  <Flex align='end' gap={5} alignItems='end' w='169px'>
    <Box cursor='pointer' lineHeight='0'>
      <NextLink href='/'>
        <Box>
          <Image src='/img/logo-horizontal.png' alt='Supercovers' width={169} height={40} />
        </Box>
      </NextLink>
    </Box>
  </Flex>
);

export default Logo;
