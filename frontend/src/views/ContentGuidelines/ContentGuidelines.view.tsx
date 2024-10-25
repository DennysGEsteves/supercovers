/* eslint-disable react/no-unescaped-entities */
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import NextLink from 'next/link';

import { Padding } from 'layout';

const AboutView: NextPage = () => (
  <Padding>
    <Box
      sx={{
        fontSize: 20,
        color: 'white',
        '> p': {
          marginBottom: 10,
        },
      }}
    >
      <Heading as='h3' mb={5}>
        Diretrizes de conteúdo
      </Heading>

      <Text fontSize='lg'>
        Bem-vindo ao Supercovers, a plataforma dedicada a celebrar a música e os artistas talentosos que a interpretam.
        Para garantir uma experiência de alta qualidade para nossos usuários, pedimos que os artistas sigam algumas
        diretrizes ao cadastrar seus vídeos de covers. Aqui estão as nossas diretrizes de conteúdo:
      </Text>

      <Heading as='h4' size='md' mb={5}>
        1. Diversidade de Formações
      </Heading>

      <Text fontSize='lg'>
        Aceitamos covers de qualquer formação musical, seja banda, dupla ou artista individual. Encorajamos a
        diversidade de estilos e abordagens, proporcionando uma ampla gama de experiências musicais aos nossos usuários
      </Text>

      <Heading as='h4' size='md' mb={5}>
        2. Artista Bem Conhecido
      </Heading>

      <Text fontSize='lg'>
        Preferimos covers de músicas originalmente interpretadas por artistas amplamente reconhecidos. Isso ajuda a
        atrair um público mais amplo e promove a descoberta de novos talentos através de interpretações familiares.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        3. Qualidade Artística
      </Heading>

      <Text fontSize='lg'>
        Valorizamos a qualidade artística e técnica. Certifique-se de que o áudio e o vídeo estejam nítidos, permitindo
        que os espectadores apreciem plenamente sua interpretação única. Uma boa produção contribui para uma experiência
        mais envolvente.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        4. Plataforma de Upload:
      </Heading>

      <Text fontSize='lg'>
        No momento, aceitamos vídeos hospedados exclusivamente no YouTube. Certifique-se de que seu vídeo esteja
        disponível publicamente e seja acessível a partir do link do YouTube. Estamos trabalhando para oferecer suporte
        a outras plataformas de hospedagem de vídeos no futuro. Aguarde ansiosamente por atualizações, pois expandiremos
        as opções de upload para incluir diversas plataformas.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        5. Orientações Adicionais
      </Heading>

      <Text fontSize='lg'>
        Evite conteúdo ofensivo, discriminatório ou que viole as normas éticas. Nosso objetivo é criar uma comunidade
        positiva e inclusiva para todos os amantes da música.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        5. Como Cadastrar seu Vídeo
      </Heading>

      <Text fontSize='lg'>
        1) Faça o login no Supercovers.
        <br />
        2) Entre em Meu Perfil.
        <br />
        3) Na aba "Artista", preencha as informações e salve. Uma nova aba "Vídeos" será habilitada
        <br />
        4) Clique no botão "+Adicionar" e preencha os campos solicitados
      </Text>

      <Text fontSize='lg'>
        Agradecemos seu comprometimento em contribuir para a comunidade do Supercovers. Estamos ansiosos para celebrar
        sua interpretação única e emocionante da música! Se tiver dúvidas ou precisar de assistência, não hesite em
        entrar em{' '}
        <Box display='inline-block'>
          <NextLink href='/contato'>
            <Text
              _hover={{
                color: 'purple.500',
                textShadow: 'none',
              }}
              color='purple.600'
              fontWeight={500}
            >
              contato conosco.
            </Text>
          </NextLink>
        </Box>
      </Text>
    </Box>
  </Padding>
);

export default AboutView;
