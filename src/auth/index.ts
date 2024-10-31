import NextAuth from 'next-auth';
import { authConfig } from './auth-config';
import { db } from '../../db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { users, accounts } from '../../db/schema/user';
import { UserService } from '@/services/user.service';

export const BASE_PATH = '/api/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
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
});
