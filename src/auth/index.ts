import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthService } from "@/services/auth.service";
import { authConfig } from "./auth-config";

export const BASE_PATH = "/api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			name: "Credentials",
			type: "credentials",
			async authorize(credentials) {
				const authService = new AuthService();

				const email = credentials.email as string;
				const password = credentials.password as string;

				if (!email || !password) {
					return null;
				}

				const user = await authService.getUserFromDb(email);

				if (user) {
					if (!user.password) {
						return null;
					}

					const isAuthenticated = await authService.passwordMatch(
						password,
						user.password,
					);

					if (isAuthenticated) {
						return user;
					}
				}

				return null;
			},
		}),
	],
});
