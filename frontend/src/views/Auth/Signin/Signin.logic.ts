import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { errorMsgs } from './Signin.props';

const logic = (props: any) => {
  const { loginError, csrfToken } = props;
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [validCredentials, setValidCredentials] = useState({ email: true, password: true });

  let error: keyof typeof errorMsgs = null;

  if (loginError) {
    if (Array.isArray(loginError)) {
      error = loginError[loginError.length - 1] as keyof typeof errorMsgs;
    } else {
      error = loginError as keyof typeof errorMsgs;
    }
  }

  const loginWithCredentials = (e: any) => {
    e.preventDefault();

    if (credentials.email && credentials.password) {
      signIn('credentials', { ...credentials, redirect: true });
    } else {
      setValidCredentials({
        email: !!credentials.email,
        password: !!credentials.password,
      });
    }
  };

  const loginWithSocialBtn = (providerId: string) => {
    signIn(providerId);
  };

  return {
    data: {
      validCredentials,
      csrfToken,
      loginError,
      error,
      errorMsgs,
      credentials,
    },
    methods: {
      setCredentials,
      setValidCredentials,
      loginWithCredentials,
      loginWithSocialBtn,
    },
  };
};

export default logic;
