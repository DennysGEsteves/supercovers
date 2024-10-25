/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { useRepository, useUser } from 'hooks';

const logic = () => {
  const { me, setMe } = useUser();
  const { data: session } = useSession();
  const router = useRouter();
  const { usersRepository } = useRepository();

  function openSignInWindow() {
    window.open(
      '/auth/signin',
      'targetWindow',
      `toolbar=no,
  		location=no,
  		status=no,
  		menubar=no,
  		scrollbars=yes,
  		resizable=yes,
  		width=500,
  		height=550,
  		top=130,
  		left=450`
    );
    return false;
  }

  function doSignout() {
    setMe(null);

    if (router.asPath === '/profile') {
      signOut({ callbackUrl: '/' });
    } else {
      signOut({ redirect: false });
    }
  }

  useEffect(() => {
    if (session && !me) {
      usersRepository
        .getMe()
        .then(({ data }) => {
          setMe(data);
        })
        .catch((_) => {
          doSignout();
        });
    }
  }, [session]);

  return {
    data: {
      session,
      me,
    },
    methods: {
      openSignInWindow,
      doSignout,
    },
  };
};

export default logic;
