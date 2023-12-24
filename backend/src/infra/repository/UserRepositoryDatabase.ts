import { Prisma, PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../../application/repository/UserRepository";

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }

  async signin(email: string, password: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
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

  async getByCpf(cpf: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });
  }
}
