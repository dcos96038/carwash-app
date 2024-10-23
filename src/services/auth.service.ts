import { eq } from "drizzle-orm";
import { db } from "../../db";
import bcrypt from "bcryptjs";
import { users } from "../../db/schema/user";

export class AuthService {
	private readonly db = db;

	private passwordToSalt(password: string) {
		const saltRounds = 10;
		const hash = bcrypt.hashSync(password, saltRounds);
		return hash;
	}

	async getUserFromDb(email: string) {
		const user = await this.db.query.users.findFirst({
			where: eq(users.email, email),
		});
		return user;
	}

	async addUserToDb(email: string, password: string) {
		const saltedPassword = this.passwordToSalt(password);

		const user = await this.db
			.insert(users)
			.values({
				email: email,
				password: saltedPassword,
			})
			.returning();
		return user.pop();
	}

	async login({ username, password }: { username: string; password: string }) {
		const user = await this.getUserFromDb(username);

		if (!user) {
			return null;
		}

		if (!user.password) {
			return null;
		}

		const isAuthenticated = await this.passwordMatch(password, user.password);

		if (!isAuthenticated) {
			return null;
		}

		return user;
	}

	async passwordMatch(password: string, hashedPassword: string) {
		return bcrypt.compareSync(password, hashedPassword);
	}
}
