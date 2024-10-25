/* eslint-disable no-nested-ternary */
import React from 'react';
import Image from 'next/legacy/image';
import { NextPage } from 'next';
import {
  Box,
  Button,
  // Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';

import logic from './ArtistTab.logic';

const ProfileArtistTabView: NextPage = () => {
  const { data, methods } = logic();

  return (
    <>
      <Flex
        height='2rem'
        align='center'
        sx={{
          '& span': {
            margin: '0 1rem',
            whiteSpace: 'nowrap',
          },
          '&:before, &:after': {
            content: "''",
            borderBottom: '2px solid rgba(156,160,170,0.2)',
            width: '42%',
            height: '1rem',
          },
        }}
      >
        <Text fontSize='14px' whiteSpace='nowrap' px={5} mt='11px'>
          Imagem no topo da página do artista
        </Text>
      </Flex>
      <Box
        mt={10}
        w='100%'
        h='300px'
        position='relative'
        border='2px solid'
        borderColor='gray.900'
        cursor='pointer'
        _hover={{
          borderColor: data.topImg ? 'purple.500' : 'gray.900',
        }}
      >
        <input
          accept='image/*'
          type='file'
          onChange={(e) => {
            const fileslist: any = e.target.files;
            methods.onDrop(fileslist);
          }}
          style={{ display: 'none' }}
          ref={data.picRef}
        />

        {data.topImg ? (
          <Image
            alt=''
            objectFit='cover'
            layout='fill'
            onError={methods.onTopImageLoadError}
            src={data.topImg}
            onClick={() => {
              if (data.picRef && data.picRef.current) data.picRef.current.click();
            }}
          />
        ) : (
          <Flex
            w='100%'
            h='100%'
            border='2px dashed'
            borderColor='gray.700'
            align='center'
            justify='center'
            cursor='pointer'
            _hover={{
              borderColor: 'purple.500',
            }}
            {...methods.getRootProps()}
          >
            <input {...methods.getInputProps()} />
            <Box w='80%' textAlign='center'>
              Arraste aqui ou clique para selecionar a imagem
            </Box>
          </Flex>
        )}
      </Box>
      <Box fontSize='12px' display='inline-block' w='100%' textAlign='center' mt={3}>
        Obs.: Sugerimos uma imagem de largura mínima de 1140px e altura de 300px
      </Box>
      <Flex as='form' w='100%' mt={10} flexDir='column' align='center' onSubmit={methods.handleSubmit(methods.submit)}>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.about}>
          <FormLabel mb={1} fontSize={14}>
            Sobre
          </FormLabel>
          <Textarea
            border='1px solid'
            borderColor='gray.700'
            focusBorderColor='purple.600'
            bg='gray.900'
            size='sm'
            variant='outline'
            color='white'
            {...methods.register('about')}
          />
          <FormErrorMessage>{data.errors?.about?.message}</FormErrorMessage>
        </FormControl>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.slug}>
          <FormLabel mb={1} fontSize={14}>
            Slug
          </FormLabel>
          <Input
            border='1px solid'
            borderColor='gray.700'
            focusBorderColor='purple.600'
            bg='gray.900'
            size='sm'
            variant='outline'
            color='white'
            {...methods.register('slug')}
          />
          <FormErrorMessage>{data.errors?.slug?.message}</FormErrorMessage>
        </FormControl>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.introVideo}>
          <FormLabel mb={1} fontSize={14}>
            ID do Youtube referente ao vídeo de apresentação do artista
          </FormLabel>
          <Input
            multiple
            border='1px solid'
            borderColor='gray.700'
            focusBorderColor='purple.600'
            bg='gray.900'
            size='sm'
            variant='outline'
            color='white'
            {...methods.register('introVideo')}
          />
          <FormErrorMessage>{data.errors?.introVideo?.message}</FormErrorMessage>
        </FormControl>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.facebook}>
          <FormLabel mb={1} fontSize={14}>
            Facebook
          </FormLabel>
          <Flex align='center' gap={-1}>
            <Box
              fontSize='13px'
              bg='gray.800'
              color='gray.500'
              py='5px'
              px='8px'
              borderRadius='5px 0 0 5px'
              border='1px solid'
              borderColor='gray.700'
              borderRight='none'
            >
              https://www.facebook.com/
            </Box>
            <Input
              multiple
              border='1px solid'
              borderColor='gray.700'
              focusBorderColor='purple.600'
              bg='gray.900'
              size='sm'
              variant='outline'
              color='white'
              {...methods.register('facebook')}
            />
          </Flex>
          <FormErrorMessage>{data.errors?.facebook?.message}</FormErrorMessage>
        </FormControl>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.instagram}>
          <FormLabel mb={1} fontSize={14}>
            Instagram
          </FormLabel>
          <Flex align='center' gap={-1}>
            <Box
              fontSize='13px'
              bg='gray.800'
              color='gray.500'
              py='5px'
              px='8px'
              borderRadius='5px 0 0 5px'
              border='1px solid'
              borderColor='gray.700'
              borderRight='none'
            >
              @
            </Box>
            <Input
              multiple
              border='1px solid'
              borderColor='gray.700'
              focusBorderColor='purple.600'
              bg='gray.900'
              size='sm'
              variant='outline'
              color='white'
              {...methods.register('instagram')}
            />
          </Flex>
          <FormErrorMessage>{data.errors?.instagram?.message}</FormErrorMessage>
        </FormControl>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.twitter}>
          <FormLabel mb={1} fontSize={14}>
            Twitter
          </FormLabel>
          <Flex align='center' gap={-1}>
            <Box
              fontSize='13px'
              bg='gray.800'
              color='gray.500'
              py='5px'
              px='8px'
              borderRadius='5px 0 0 5px'
              border='1px solid'
              borderColor='gray.700'
              borderRight='none'
            >
              @
            </Box>
            <Input
              multiple
              border='1px solid'
              borderColor='gray.700'
              focusBorderColor='purple.600'
              bg='gray.900'
              size='sm'
              variant='outline'
              color='white'
              {...methods.register('twitter')}
            />
          </Flex>
          <FormErrorMessage>{data.errors?.twitter?.message}</FormErrorMessage>
        </FormControl>
        <FormControl maxWidth='600px' mb='20px' isInvalid={!!data.errors?.website}>
          <FormLabel mb={1} fontSize={14}>
            Website
          </FormLabel>
          <Input
            multiple
            border='1px solid'
            borderColor='gray.700'
            focusBorderColor='purple.600'
            bg='gray.900'
            size='sm'
            variant='outline'
            color='white'
            {...methods.register('website')}
          />
          <FormErrorMessage>{data.errors?.website?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type='submit'
          mt='20px'
          // w='100px'
          size='sm'
          borderColor='gray.700'
          fontWeight='normal'
          _hover={{
            bg: 'purple.400',
          }}
          bg='purple.600'
          color='white'
          isLoading={data.isSubmitting}
        >
          {data.isSubmitting ? 'ENVIANDO...' : data.hasArtist ? 'SALVAR' : 'VINCULAR ARTISTA À ESTA CONTA'}
        </Button>
      </Flex>
    </>
  );
};
export default ProfileArtistTabView;
