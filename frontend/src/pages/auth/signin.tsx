import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getCsrfToken } from 'next-auth/react';

import SigninView from 'views/Auth/Signin/Signin.view';

const AuthSignin: NextPage<any> = (props) => <SigninView {...props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const props = await logic(context);
  const loginError = context.query && context.query.error ? context.query.error : false;
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      isAuth: true,
      loginError,
      csrfToken,
    },
  };
};

export default AuthSignin;
