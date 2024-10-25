import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { NextPage } from 'next';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

type PlayBtnProps = {
  onClick: () => void;
  playing: boolean;
  iconSettings?: {
    h: number | string;
    w: number | string;
    color: string;
    bg: string;
  };
};

const PlayBtn: NextPage<PlayBtnProps> = ({ onClick, playing, iconSettings }) => (
  <Button
    onClick={onClick}
    cursor='pointer'
    width='36px'
    height='36px'
    borderRadius='100%'
    display='flex'
    alignItems='center'
    justifyContent='center'
    backgroundColor={iconSettings?.bg || '#FFF'}
    color='#333'
    transition='box-shadow .4s cubic-bezier(.25,.8,.25,1),transform .4s cubic-bezier(.25,.8,.25,1)'
    boxShadow='0 2px 5px 0 rgb(0 0 0 / 26%)'
    outline='0 !important'
    _hover={{
      backgroundColor: iconSettings?.bg || '#FFF',
      outline: '0 !important',
    }}
    _active={{
      backgroundColor: iconSettings?.bg || '#FFF',
    }}
    _focus={{
      outline: '0 !important',
    }}
  >
    {iconSettings ? (
      <Icon
        cursor='pointer'
        h={iconSettings.h}
        w={iconSettings.w}
        color={iconSettings.color}
        as={playing ? BsFillPauseFill : BsFillPlayFill}
        position='relative'
        left={!playing ? '2px' : '0'}
      />
    ) : (
      <Icon
        cursor='pointer'
        h='23px'
        w='23px'
        color='black'
        as={playing ? BsFillPauseFill : BsFillPlayFill}
        position='relative'
        left={!playing ? '2px' : '0'}
      />
    )}
  </Button>
);

export default PlayBtn;
