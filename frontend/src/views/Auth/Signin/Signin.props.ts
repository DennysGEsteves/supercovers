import { Session } from 'next-auth';
import { Dispatch, SetStateAction } from 'react';

export const errorMsgs = {
  OAuthSignin: 'Erro ao se autenticar. Tente novamente',
  CredentialsSignin: 'Credenciais inválidas!',
};

export type SignInProps = {
  data: {
    loginError: keyof typeof errorMsgs;
    csrfToken: string;
    status: 'authenticated' | 'loading' | 'unauthenticated';
    validCredentials: {
      email: boolean;
      password: boolean;
    };
    error: 'OAuthAccountNotLinked' | 'OAuthSignin' | 'CredentialsSignin';
    errorMsgs: {
      OAuthAccountNotLinked: string;
      OAuthSignin: string;
      CredentialsSignin: string;
    };
    credentials: {
      email: string;
      password: string;
    };
    session: Session;
  };
  methods: {
    setCredentials: Dispatch<
      SetStateAction<{
        email: string;
        password: string;
      }>
    >;
    setValidCredentials: Dispatch<
      SetStateAction<{
        email: boolean;
        password: boolean;
      }>
    >;
    loginWithCredentials: (e: any) => void;
    loginWithSocialBtn: (providerId: string) => void;
  };
};
