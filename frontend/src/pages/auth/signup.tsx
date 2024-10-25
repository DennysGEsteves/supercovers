import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import SignupView from 'views/Auth/Signup/Signup.view';

const AuthSignup: NextPage = () => <SignupView />;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    isAuth: true,
  },
});

export default AuthSignup;
