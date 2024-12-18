import { eq } from "drizzle-orm";

import { db } from "../../db";
import { users } from "../../db/schema/user";

export class UserService {
  private readonly db = db;

  // private passwordToSalt(password: string) {
  //   const saltRounds = 10;
  //   const hash = bcrypt.hashSync(password, saltRounds);
  //   return hash;
  // }

  async getByEmail(email: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  }

  // async login({ username, password }: { username: string; password: string }) {
  //   const user = await this.getByEmail(username);

  //   if (!user) {
  //     return null;
  //   }

  //   if (!user.password) {
  //     return null;
  //   }

  //   const isAuthenticated = await this.passwordMatch(password, user.password);

  //   if (!isAuthenticated) {
  //     return null;
  //   }

  //   return user;
  // }

  // async passwordMatch(password: string, hashedPassword: string) {
  //   return bcrypt.compareSync(password, hashedPassword);
  // }

  async getUsers() {
    const result = await this.db.query.users.findMany();

    if (!result) {
      throw new Error("Failed to get users");
    }

    return result.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      image: u.image,
    }));
  }
}
