/* eslint-disable react/no-unescaped-entities */
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import NextLink from 'next/link';

import { Padding } from 'layout';

const TermsView: NextPage = () => (
  <Padding>
    <Box
      sx={{
        margin: '0 auto',
        fontSize: 20,
        color: 'white',
        '> p': {
          marginBottom: 10,
        },
      }}
    >
      <Heading as='h3' mb={5}>
        Termos de Uso
      </Heading>

      <Text fontSize='lg'>
        Bem-vindo aos Termos de Uso do Supercovers. Ao utilizar nosso site, você concorda com os seguintes termos e
        condições. Leia atentamente antes de acessar ou usar qualquer parte do Supercovers.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        1. Aceitação dos Termos
      </Heading>

      <Text fontSize='lg'>
        Ao acessar ou utilizar o Supercovers, você concorda em cumprir estes Termos de Serviço. Se você não concordar
        com algum aspecto deste documento, por favor, não utilize nosso site.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        2. Uso do Supercovers
      </Heading>

      <Text fontSize='lg'>
        Você concorda em usar o Supercovers apenas para fins legais e de maneira que não viole estes Termos de Serviço
        ou qualquer lei aplicável. Não é permitido o uso do Supercovers de maneira que possa prejudicar, desabilitar,
        sobrecarregar ou prejudicar a funcionalidade do site.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        3. Conteúdo do Usuário
      </Heading>

      <Text fontSize='lg'>
        Ao enviar conteúdo para o Supercovers, você concede a nós uma licença mundial, não exclusiva, transferível e
        sublicenciável para usar, reproduzir, distribuir, preparar obras derivadas, exibir e executar o conteúdo em
        relação ao Supercovers.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        4. Direitos de Propriedade Intelectual
      </Heading>

      <Text fontSize='lg'>
        O conteúdo disponível no Supercovers, incluindo mas não se limitando a textos, gráficos, logotipos, vídeos,
        áudios e outros materiais, está protegido por direitos autorais, marcas registradas e outros direitos de
        propriedade intelectual.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        5. Responsabilidades do Usuário
      </Heading>

      <Text fontSize='lg'>
        Você é responsável por todas as atividades associadas à sua conta no Supercovers. Ao criar uma conta, você
        concorda em fornecer informações precisas e atualizadas. Não compartilhe suas credenciais de conta com
        terceiros.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        6. Modificações e Interrupções do Serviço
      </Heading>

      <Text fontSize='lg'>
        Reservamos o direito de modificar ou descontinuar qualquer parte do Supercovers a qualquer momento, temporária
        ou permanentemente, sem aviso prévio. Não seremos responsáveis perante você ou terceiros por qualquer
        modificação, suspensão ou interrupção do serviço.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        7. Limitação de Responsabilidade
      </Heading>

      <Text fontSize='lg'>
        O Supercovers é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas. Não nos
        responsabilizamos por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes resultantes do
        uso ou incapacidade de usar o Supercovers.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        8. Disposições Gerais
      </Heading>

      <Text fontSize='lg'>
        Estes Termos de Serviço constituem o acordo completo entre você e o Supercovers em relação ao uso do site.
        Qualquer renúncia ou falha em exercer qualquer direito estabelecido nestes Termos de Serviço não constituirá uma
        renúncia desse direito específico.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        9. Contato
      </Heading>

      <Text fontSize='lg'>
        Se tiver dúvidas sobre estes Termos de Serviço, entre em{' '}
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
        </Box>{' '}
        através dos meios fornecidos na página de contato do Supercovers.
      </Text>

      <Text fontSize='lg'>
        Obrigado por utilizar o Supercovers. Esperamos que desfrute da plataforma dedicada à celebração da música e dos
        talentosos artistas que a interpretam.
      </Text>
    </Box>
  </Padding>
);

export default TermsView;
