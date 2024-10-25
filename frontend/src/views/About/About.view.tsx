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
        Sobre o site
      </Heading>
      <Text fontSize='lg'>
        Bem-vindo ao Supercovers, a plataforma dedicada a celebrar a música e os artistas talentosos que a interpretam.
        Aqui, você encontrará uma coleção diversificada e emocionante de covers feitos por artistas de todo o mundo.
      </Text>
      <Text fontSize='lg'>
        Nós acreditamos que a música é uma forma poderosa de expressão e conexão, e queremos dar aos artistas uma
        plataforma para compartilhar suas interpretações únicas com o mundo. Além disso, queremos fornecer aos fãs de
        música a oportunidade de descobrir novos talentos e compartilhar suas descobertas com amigos e familiares.
      </Text>
      <Text fontSize='lg'>
        Aqui no Supercovers, nós nos esforçamos para garantir que o conteúdo apresentado em nosso site seja de alta
        qualidade e esteja de acordo com nossos padrões de conteúdo rigorosos. Se você é um artista interessado em
        compartilhar seu trabalho conosco, por favor, siga nossas diretrizes de conteúdo e cadastre seus vídeos hoje
      </Text>
      <Text fontSize='lg'>
        Gostaríamos de ressaltar que estamos na versão inicial (MVP), o que significa que estaremos constantemente
        trabalhando para tornar a sua experiência ainda melhor. Sabemos que sempre há espaço para aprimoramentos, e cada
        visita que você faz nos inspira a fazer atualizações incríveis.
      </Text>
      <Text fontSize='lg'>
        Nós agradecemos sua visita ao Supercovers e esperamos que você encontre muitas músicas incríveis para desfrutar
        aqui. Se você tiver alguma dúvida ou sugestão, por favor, não hesite em entrar em{' '}
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
        . Nós estamos sempre buscando maneiras de melhorar a sua experiência aqui no Supercovers e estamos animados para
        continuar celebrando a música e os artistas talentosos que a fazem brilhar. Juntos, vamos mergulhar em um mundo
        de interpretações únicas e emocionantes.
      </Text>
    </Box>
  </Padding>
);

export default AboutView;
