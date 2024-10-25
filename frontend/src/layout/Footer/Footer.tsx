/* eslint-disable import/no-cycle */
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import NextLink from 'next/link';
import Image from 'next/legacy/image';

import { Padding } from 'layout';

const Footer: NextPage = () => (
  <Box bg='#111' p='40px 0 80px' mt='60px'>
    <Padding>
      <Box px={20}>
        <Flex justifyContent='space-between'>
          <Box cursor='pointer' lineHeight='0'>
            <NextLink href='/'>
              <Box>
                <Image src='/img/logo-horizontal.png' alt='Supercovers' width={169} height={40} />
              </Box>
            </NextLink>
          </Box>
          <Box>
            <Flex direction='column' gap={5}>
              <Heading as='h5' size='md' color='purple.600'>
                Páginas
              </Heading>
              <NextLink href='/artistas-cadastrados'>
                <Text color='white'>Super Artistas cadastrados</Text>
              </NextLink>
              <NextLink href='/busca-avancada'>
                <Text color='white'>Busca Avançada</Text>
              </NextLink>
            </Flex>
          </Box>
          <Box>
            <Flex direction='column' gap={5}>
              <Heading as='h5' size='md' color='purple.600'>
                Site
              </Heading>
              <NextLink href='/sobre'>
                <Text color='white'>Sobre</Text>
              </NextLink>
              <NextLink href='/diretrizes-de-conteudo'>
                <Text color='white'>Diretrizes de conteúdo</Text>
              </NextLink>
              <NextLink href='/contato'>
                <Text color='white'>Contato</Text>
              </NextLink>
            </Flex>
          </Box>
          <Box>
            <Flex direction='column' gap={5}>
              <Heading as='h5' size='md' color='purple.600'>
                Legal
              </Heading>
              <NextLink href='/termos-servico'>
                <Text color='white'>Termos de Uso</Text>
              </NextLink>
              <NextLink href='/politicas-privacidade'>
                <Text color='white'>Políticas de Privacidade</Text>
              </NextLink>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box mt={20}>
        <Text color='#888888' fontSize={12} textAlign='center'>
          © Copyright 2023 Supercovers
        </Text>
      </Box>
    </Padding>
  </Box>
);

export default Footer;
