/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
// import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: {
      jwt?: string;
    };
    user: {
      email: string;
      jwt?: string;
    };
  }

  interface User {
    /** OpenID ID Token */
    token?: string;
  }
}
