import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
// import Facebook, { FacebookProfile } from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';

import { AuthRepository } from 'repositories/Auth';
import envs from 'config/environment';

const authRepository = AuthRepository();

// type User = {
//   id: string;
//   name: string | null;
//   email: string | null;
//   emailVerified: Date | null;
//   image: string | null;
//   password: string | null;
// };

export const options: NextAuthOptions = {
  secret: envs.jwtSecret,
  providers: [
    Google({
      clientId: envs.authGoogleId,
      clientSecret: envs.authGoogleSecret,
      name: 'Google',
      async profile(profile) {
        try {
          const data = await authRepository.authenticateWithSocial({
            email: profile.email,
            name: profile.name,
          });

          return {
            id: profile.sub,
            email: profile?.email,
            image: data?.image,
            name: profile?.name,
            token: data?.token,
          };
        } catch (error) {
          return {
            id: profile.sub,
            name: undefined,
            email: undefined,
          };
        }
      },
    }),
    // Facebook({
    //   clientId: envs.authFacebookId,
    //   clientSecret: envs.authFacebookSecret,
    //   name: 'Facebook',
    //   async profile(profile: FacebookProfile & User) {
    //     try {
    //       const data = await authRepository.authenticateWithSocial({
    //         email: profile.email,
    //         name: profile.name,
    //       });

    //       return {
    //         id: profile.id,
    //         email: profile?.email,
    //         image: data?.image,
    //         name: profile?.name,
    //         token: data?.token,
    //       };
    //     } catch (error) {
    //       return {
    //         id: profile.id,
    //         name: undefined,
    //         email: undefined,
    //       };
    //     }
    //   },
    // }),
    Credentials({
      name: 'Credentials',
      credentials: null,
      async authorize({ email, password }) {
        const data = await authRepository.authenticate({ username: email, password });

        return {
          id: undefined,
          email: data?.email,
          image: data?.image,
          name: data?.name,
          token: data?.token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      return !!user.email;
    },
    async jwt({ token, user }) {
      if (user?.token) {
        token.jwt = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email,
        jwt: token.jwt as string,
      };
      return session;
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth;
