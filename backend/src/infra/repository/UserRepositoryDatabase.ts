import { Prisma, PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../../application/repository/UserRepository";

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }

  async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
