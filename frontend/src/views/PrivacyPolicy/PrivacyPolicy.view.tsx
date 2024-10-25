import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import NextLink from 'next/link';

import { Padding } from 'layout';

const PrivacyPolicyView: NextPage = () => (
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
        Políticas de Privacidade
      </Heading>

      <Text fontSize='lg'>
        Bem-vindo à Política de Privacidade do Supercovers. Valorizamos a confiança que você deposita em nós ao usar
        nosso site, e estamos comprometidos em proteger suas informações pessoais. Esta política descreve como
        coletamos, usamos, divulgamos e protegemos as informações que você nos fornece ao acessar e utilizar o
        Supercovers. Ao continuar a utilizar nosso site, você concorda com os termos desta política.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        1. Informações Coletadas
      </Heading>

      <Text fontSize='lg'>
        Coletamos informações pessoais que você nos fornece voluntariamente, como nome, endereço de e-mail e informações
        relacionadas à sua conta. Além disso, podemos coletar dados automaticamente, incluindo endereço IP, tipo de
        navegador, tempo de visita e páginas visualizadas.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        2. Uso de Informações
      </Heading>

      <Text fontSize='lg'>
        Utilizamos suas informações pessoais para fornecer uma experiência personalizada no Supercovers, incluindo o
        acesso a recursos exclusivos. Além disso, podemos usar dados agregados para análises e melhorias no site. Não
        compartilhamos suas informações com terceiros sem o seu consentimento, exceto quando necessário por lei.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        3. Cookies e Tecnologias Semelhantes
      </Heading>

      <Text fontSize='lg'>
        O Supercovers utiliza cookies e tecnologias semelhantes para melhorar a experiência do usuário. Esses dados são
        utilizados para personalizar o conteúdo e anúncios, além de analisar o desempenho do site. Você pode gerenciar
        suas preferências de cookies nas configurações do seu navegador.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        4. Segurança
      </Heading>

      <Text fontSize='lg'>
        Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado,
        alteração, divulgação ou destruição. No entanto, lembre-se de que nenhum sistema é completamente seguro, e
        garantimos esforços contínuos para aprimorar a segurança do Supercovers.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        5. Links para Sites de Terceiros
      </Heading>

      <Text fontSize='lg'>
        Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade
        desses sites. Recomendamos que você revise as políticas de privacidade desses terceiros antes de fornecer
        qualquer informação.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        6. Alterações nesta Política de Privacidade
      </Heading>

      <Text fontSize='lg'>
        Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você reveja esta página
        regularmente para estar ciente de quaisquer alterações. A continuação do uso do Supercovers após as alterações
        indica sua aceitação dessas mudanças.
      </Text>

      <Heading as='h4' size='md' mb={5}>
        7. Contato
      </Heading>

      <Text fontSize='lg'>
        Se tiver dúvidas sobre esta Política de Privacidade ou suas informações pessoais, entre em{' '}
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
        através dos meios fornecidos na página de contato do Supercovers.
      </Text>

      <Text fontSize='lg'>
        Agradecemos por confiar no Supercovers. Juntos, continuaremos a promover a música e a celebrar a comunidade de
        artistas talentosos em nossa plataforma
      </Text>
    </Box>
  </Padding>
);

export default PrivacyPolicyView;
