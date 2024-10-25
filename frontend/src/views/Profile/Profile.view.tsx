import { Tab, TabList, TabPanel, TabPanels, Tabs, Box, Heading, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';

import { useUser } from 'hooks';
import { Padding } from 'layout/Padding';

import UserView from './UserTab/UserTab.view';
import ProfileArtistTabView from './ArtistTab/ArtistTab.view';
import ProfileVideosTab from './VideosTab/VideosTab.view';

const ProfileView: NextPage = () => {
  const { me } = useUser();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Box
        bg='linear-gradient(180deg, rgba(65,65,71,1) 0%, rgba(22,22,24,1) 85%, rgba(22,22,24,1) 100%)'
        position='absolute'
        top={0}
        left={0}
        w='100%'
        h='400px'
      />
      <Padding>
        <Heading color='white' as='h1' size='2xl' pt='100px'>
          {me?.artist?.name || me?.name}
        </Heading>
      </Padding>
      <Tabs index={tabIndex} onChange={(index: number) => setTabIndex(index)} position='relative' mt={10}>
        <TabList borderBottom='1px solid' borderColor='gray.700'>
          <Padding>
            <Flex>
              <Tab
                _selected={{ color: 'purple.600', borderColor: 'purple.600' }}
                _focus={{ border: 'none', borderBottom: '2px solid' }}
                _active={{ bg: 'transparent' }}
                fontSize='14px'
                px={0}
                pb={3}
                mr={7}
              >
                Informações do perfil
              </Tab>
              <Tab
                _selected={{ color: 'purple.600', borderColor: 'purple.600' }}
                _focus={{ border: 'none', borderBottom: '2px solid' }}
                _active={{ bg: 'transparent' }}
                fontSize='14px'
                px={0}
                pb={3}
                mr={7}
              >
                Meu super artista
              </Tab>
              {me?.artist?.slug && (
                <Tab
                  _selected={{ color: 'purple.600', borderColor: 'purple.600' }}
                  _focus={{ border: 'none', borderBottom: '2px solid' }}
                  _active={{ bg: 'transparent' }}
                  fontSize='14px'
                  px={0}
                  pb={3}
                  mr={7}
                >
                  Meus covers
                </Tab>
              )}
            </Flex>
          </Padding>
        </TabList>
        <Padding>
          <TabPanels>
            <TabPanel>
              <UserView />
            </TabPanel>
            <TabPanel>
              <ProfileArtistTabView />
            </TabPanel>
            {me?.artist?.slug && (
              <TabPanel>
                <ProfileVideosTab />
              </TabPanel>
            )}
          </TabPanels>
        </Padding>
      </Tabs>
    </>
  );
};

export default ProfileView;
