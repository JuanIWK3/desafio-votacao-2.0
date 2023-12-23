import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  save(account: Prisma.UserCreateInput): Promise<User>;
  getById(accountId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}
