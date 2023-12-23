import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  save(user: Prisma.UserCreateInput): Promise<User>;
  getById(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}
