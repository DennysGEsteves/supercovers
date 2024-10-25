import React from 'react';
import { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';

import { useUser } from 'hooks';

import UserAvatarView from './Avatar/Avatar.view';
import UserDataView from './Data/Data.view';

const ProfileUserTab: NextPage = () => {
  const { me } = useUser();

  if (!me) return null;

  return (
    <Flex>
      <UserAvatarView />
      <UserDataView />
    </Flex>
  );
};

export default ProfileUserTab;
