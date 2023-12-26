import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  save(user: Prisma.UserCreateInput): Promise<User>;
  getAll(): Promise<User[]>;
  getById(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getByCpf(cpf: string): Promise<User | null>;
  signin(email: string, password: string): Promise<User>;
}
