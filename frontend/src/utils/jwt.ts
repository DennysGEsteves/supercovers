import { getSession } from 'next-auth/react';

export const getJwtTokenFromSession = async () => {
  const session = await getSession();
  return session.user.jwt;
};
