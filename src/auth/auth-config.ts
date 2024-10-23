import { AuthService } from "@/services/auth.service";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import {
	users,
	accounts,
	sessions,
	verificationTokens,
} from "../../db/schema/user";
import { db } from "../../db";

export const authConfig = {
	basePath: "/api/auth",
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	session: {
		strategy: "jwt",
	},
	pages: {
		error: "/",
		signIn: "/",
		signOut: "/",
	},
	callbacks: {
		async session({ session }) {
			const authService = new AuthService();
			const dbUser = await authService.getUserFromDb(session.user.email);

			if (dbUser) {
				session.user.id = dbUser.id;
				session.user.name = dbUser.name || "";
				session.user.email = dbUser.email || "";
				session.user.image = dbUser.image || "";
			}

			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
	providers: [],
} satisfies NextAuthConfig;
