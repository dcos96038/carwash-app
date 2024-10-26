import NextAuth from 'next-auth';
import { authConfig } from './auth-config';
import { db } from '../../db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from '../../db/schema/user';
import { UserService } from '@/services/user.service';

export const BASE_PATH = '/api/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  basePath: '/api/auth',
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/',
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    async session({ session }) {
      const userService = new UserService();
      const dbUser = await userService.getByEmail(session.user.email);

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.name = dbUser.name || '';
        session.user.email = dbUser.email || '';
        session.user.image = dbUser.image || '';
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  // providers: [
  //   // Credentials({
  //   //   name: 'Credentials',
  //   //   type: 'credentials',
  //   //   async authorize(credentials) {
  //   //     const userService = new UserService();

  //   //     const email = credentials.email as string;
  //   //     const password = credentials.password as string;

  //   //     if (!email || !password) {
  //   //       return null;
  //   //     }

  //   //     const user = await userService.getByEmail(email);

  //   //     if (user) {
  //   //       if (!user.password) {
  //   //         return null;
  //   //       }

  //   //       const isAuthenticated = await userService.passwordMatch(
  //   //         password,
  //   //         user.password
  //   //       );

  //   //       if (isAuthenticated) {
  //   //         return user;
  //   //       }
  //   //     }

  //   //     return null;
  //   //   },
  //   // }),
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   }),
  // ],
});
